import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Slide,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import PublicLayout from '../../../components/layouts/PublicLayout';
import { useRekycForm } from '../hooks/useRekycForm';
import StepIndicator from '../components/StepIndicator';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import AddressForm from '../components/AddressForm';
import SegmentForm from '../components/SegmentForm';
import SignatureForm from '../components/SignatureForm';
import OtherDetailsForm from '../components/OtherDetailsForm';
import ReviewForm from '../components/ReviewForm';
import { showSingleToast } from '../../../utils/toast-util';

const RekycDashboard: React.FC = () => {
  const {
    currentStep,
    formData,
    completedSteps,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    resetForm,
  } = useRekycForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStepSubmit = (stepKey: keyof typeof formData, data: any) => {
    updateFormData(stepKey, data);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSingleToast('Re-KYC application submitted successfully!');
      resetForm();
    } catch (error) {
      showSingleToast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalDetailsForm
            initialData={formData.personalDetails}
            onSubmit={(data) => handleStepSubmit('personalDetails', data)}
            onNext={nextStep}
          />
        );
      case 'address':
        return (
          <AddressForm
            initialData={formData.permanentAddress}
            onSubmit={(data) => handleStepSubmit('permanentAddress', data)}
            onNext={nextStep}
          />
        );
      case 'segment':
        return (
          <SegmentForm
            initialData={formData.segmentDetails}
            onSubmit={(data) => handleStepSubmit('segmentDetails', data)}
            onNext={nextStep}
          />
        );
      case 'signature':
        return (
          <SignatureForm
            initialData={formData.signatureDetails}
            onSubmit={(data) => handleStepSubmit('signatureDetails', data)}
            onNext={nextStep}
          />
        );
      case 'other':
        return (
          <OtherDetailsForm
            initialData={formData.otherDetails}
            onSubmit={(data) => handleStepSubmit('otherDetails', data)}
            onNext={nextStep}
          />
        );
      case 'review':
        return (
          <ReviewForm
            formData={formData}
            onSubmit={handleFinalSubmit}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'personal':
        return formData.personalDetails.firstName && formData.personalDetails.lastName;
      case 'address':
        return formData.permanentAddress.addressLine1 && formData.permanentAddress.city;
      case 'segment':
        return Object.values(formData.segmentDetails).some(Boolean);
      case 'signature':
        return formData.signatureDetails.signatureImage && formData.signatureDetails.photographImage;
      case 'other':
        return formData.otherDetails.bankDetails.accountNumber && formData.otherDetails.tradingExperience;
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const isFirstStep = currentStep === 'personal';
  const isLastStep = currentStep === 'review';

  return (
    <PublicLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Fade in timeout={800}>
          <Box>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  background: 'linear-gradient(45deg, #4A90E2 30%, #7BB3F0 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Re-KYC Application
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Update your KYC information to continue trading
              </Typography>
            </Box>

            {/* Step Indicator */}
            <StepIndicator
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={goToStep}
            />

            {/* Form Content */}
            <Paper
              elevation={2}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                minHeight: 400,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Slide
                direction="left"
                in
                timeout={300}
                key={currentStep}
              >
                <Box>
                  {renderCurrentStep()}
                </Box>
              </Slide>
            </Paper>

            {/* Navigation Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 4,
              }}
            >
              <Button
                startIcon={<ArrowBack />}
                onClick={prevStep}
                disabled={isFirstStep}
                variant="outlined"
                sx={{ minWidth: 120 }}
              >
                Previous
              </Button>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {Array.from({ length: 6 }, (_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: index <= Object.keys(completedSteps).length 
                        ? 'primary.main' 
                        : 'grey.300',
                      transition: 'background-color 0.3s ease',
                    }}
                  />
                ))}
              </Box>

              {isLastStep ? (
                <Button
                  onClick={handleFinalSubmit}
                  disabled={!canProceed() || isSubmitting}
                  variant="contained"
                  sx={{ minWidth: 120 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              ) : (
                <Button
                  endIcon={<ArrowForward />}
                  onClick={nextStep}
                  disabled={!canProceed()}
                  variant="contained"
                  sx={{ minWidth: 120 }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Fade>
      </Container>
    </PublicLayout>
  );
};

export default RekycDashboard;