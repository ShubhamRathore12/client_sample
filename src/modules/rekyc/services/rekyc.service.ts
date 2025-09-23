import axios, { AxiosInstance } from 'axios';
import { RekycFormData } from '../types';

const BASE_URL = process.env.BASE_URL || 'https://uat-signup.stoxkart.com/rekyc/api';

class RekycService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });

    // Request interceptor
    this.client.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const clientId = params.get('client_id');
        if (clientId) {
          config.headers['Client-Id'] = clientId;
        }
      }
      return config;
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.clear();
            window.location.href = '/';
          }
        }
        return Promise.reject(error.response?.data || error.message);
      }
    );
  }

  async submitRekycApplication(data: RekycFormData) {
    const formData = new FormData();
    
    // Add form data
    formData.append('personalDetails', JSON.stringify(data.personalDetails));
    formData.append('permanentAddress', JSON.stringify(data.permanentAddress));
    formData.append('segmentDetails', JSON.stringify(data.segmentDetails));
    formData.append('otherDetails', JSON.stringify(data.otherDetails));
    
    // Add files
    if (data.signatureDetails.signatureImage) {
      formData.append('signature', data.signatureDetails.signatureImage);
    }
    if (data.signatureDetails.photographImage) {
      formData.append('photograph', data.signatureDetails.photographImage);
    }

    return this.client.post('/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getRekycStatus() {
    return this.client.get('/status');
  }

  async getRekycHistory() {
    return this.client.get('/history');
  }

  async validatePAN(panNumber: string) {
    return this.client.post('/validate-pan', { panNumber });
  }

  async validateAadhar(aadharNumber: string) {
    return this.client.post('/validate-aadhar', { aadharNumber });
  }

  async getBankDetails(ifscCode: string) {
    return this.client.get(`/bank-details/${ifscCode}`);
  }
}

export const rekycService = new RekycService();