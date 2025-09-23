import { useState, useCallback } from 'react';
import { RekycFormData, RekycStep } from '../types';

const initialFormData: RekycFormData = {
  personalDetails: {
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'male',
    maritalStatus: 'single',
    fatherName: '',
    motherName: '',
    spouseName: '',
    panNumber: '',
    aadharNumber: '',
    email: '',
    mobile: '',
    occupation: '',
    annualIncome: '',
  },
  permanentAddress: {
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    sameAsCorrespondence: false,
  },
  segmentDetails: {
    equity: false,
    derivatives: false,
    commodity: false,
    currency: false,
    mutualFunds: false,
  },
  signatureDetails: {
    signatureImage: undefined,
    photographImage: undefined,
  },
  otherDetails: {
    nomineeDetails: [],
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      accountType: 'savings',
    },
    tradingExperience: '',
    riskProfile: 'medium',
  },
};

export const useRekycForm = () => {
  const [currentStep, setCurrentStep] = useState<RekycStep>('personal');
  const [formData, setFormData] = useState<RekycFormData>(initialFormData);
  const [completedSteps, setCompletedSteps] = useState<Set<RekycStep>>(new Set());

  const updateFormData = useCallback((step: keyof RekycFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data }
    }));
  }, []);

  const markStepComplete = useCallback((step: RekycStep) => {
    setCompletedSteps(prev => new Set([...prev, step]));
  }, []);

  const goToStep = useCallback((step: RekycStep) => {
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    const steps: RekycStep[] = ['personal', 'address', 'segment', 'signature', 'other', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      markStepComplete(currentStep);
      setCurrentStep(steps[currentIndex + 1]);
    }
  }, [currentStep, markStepComplete]);

  const prevStep = useCallback(() => {
    const steps: RekycStep[] = ['personal', 'address', 'segment', 'signature', 'other', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  }, [currentStep]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep('personal');
    setCompletedSteps(new Set());
  }, []);

  return {
    currentStep,
    formData,
    completedSteps,
    updateFormData,
    markStepComplete,
    goToStep,
    nextStep,
    prevStep,
    resetForm,
  };
};