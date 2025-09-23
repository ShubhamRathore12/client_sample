import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { RekycStep } from '../../types';

interface StepIndicatorProps {
  currentStep: RekycStep;
  completedSteps: Set<RekycStep>;
  onStepClick: (step: RekycStep) => void;
}

const steps = [
  { key: 'personal' as RekycStep, label: 'Personal Details', shortLabel: 'Personal' },
  { key: 'address' as RekycStep, label: 'Permanent Address', shortLabel: 'Address' },
  { key: 'segment' as RekycStep, label: 'Segment Details', shortLabel: 'Segment' },
  { key: 'signature' as RekycStep, label: 'Signature', shortLabel: 'Signature' },
  { key: 'other' as RekycStep, label: 'Other Details', shortLabel: 'Other' },
  { key: 'review' as RekycStep, label: 'Review', shortLabel: 'Review' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        px: { xs: 1, md: 2 },
        overflowX: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      {steps.map((step, index) => {
        const isActive = currentStep === step.key;
        const isCompleted = completedSteps.has(step.key);
        const isClickable = isCompleted || isActive;

        return (
          <React.Fragment key={step.key}>
            <Box
              onClick={() => isClickable && onStepClick(step.key)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: isClickable ? 'pointer' : 'default',
                opacity: isClickable ? 1 : 0.5,
                transition: 'all 0.3s ease',
                minWidth: { xs: 80, md: 120 },
                '&:hover': isClickable ? {
                  transform: 'translateY(-2px)',
                } : {},
              }}
            >
              <Box
                sx={{
                  width: { xs: 32, md: 40 },
                  height: { xs: 32, md: 40 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                  transition: 'all 0.3s ease',
                  ...(isCompleted
                    ? {
                        backgroundColor: theme.palette.success.main,
                        color: 'white',
                      }
                    : isActive
                    ? {
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        boxShadow: `0 0 0 4px ${theme.palette.primary.main}20`,
                      }
                    : {
                        backgroundColor: theme.palette.grey[200],
                        color: theme.palette.text.secondary,
                      }),
                }}
              >
                {isCompleted ? (
                  <CheckCircle sx={{ fontSize: { xs: 20, md: 24 } }} />
                ) : (
                  <Typography variant="body2" fontWeight={600}>
                    {index + 1}
                  </Typography>
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  textAlign: 'center',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                  fontSize: { xs: '0.7rem', md: '0.75rem' },
                  lineHeight: 1.2,
                }}
              >
                {step.shortLabel}
              </Typography>
            </Box>
            {index < steps.length - 1 && (
              <Box
                sx={{
                  flex: 1,
                  height: 2,
                  mx: { xs: 0.5, md: 1 },
                  backgroundColor: isCompleted
                    ? theme.palette.success.main
                    : theme.palette.grey[200],
                  transition: 'background-color 0.3s ease',
                  maxWidth: { xs: 20, md: 40 },
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default StepIndicator;