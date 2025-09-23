import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Fade,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { useFormik } from 'formik';
import { SegmentDetails } from '../../types';
import { TrendingUp, ShowChart, Agriculture, CurrencyExchange, AccountBalance } from '@mui/icons-material';

interface SegmentFormProps {
  initialData: SegmentDetails;
  onSubmit: (data: SegmentDetails) => void;
  onNext: () => void;
}

const segments = [
  {
    key: 'equity' as keyof SegmentDetails,
    title: 'Equity',
    description: 'Trade in stocks and shares',
    icon: <TrendingUp />,
    color: '#4CAF50',
  },
  {
    key: 'derivatives' as keyof SegmentDetails,
    title: 'Derivatives (F&O)',
    description: 'Futures and Options trading',
    icon: <ShowChart />,
    color: '#FF9800',
  },
  {
    key: 'commodity' as keyof SegmentDetails,
    title: 'Commodity',
    description: 'Trade in commodities',
    icon: <Agriculture />,
    color: '#795548',
  },
  {
    key: 'currency' as keyof SegmentDetails,
    title: 'Currency',
    description: 'Foreign exchange trading',
    icon: <CurrencyExchange />,
    color: '#9C27B0',
  },
  {
    key: 'mutualFunds' as keyof SegmentDetails,
    title: 'Mutual Funds',
    description: 'Invest in mutual funds',
    icon: <AccountBalance />,
    color: '#2196F3',
  },
];

const SegmentForm: React.FC<SegmentFormProps> = ({
  initialData,
  onSubmit,
  onNext,
}) => {
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: (values) => {
      onSubmit(values);
      onNext();
    },
  });

  const handleSegmentToggle = (segmentKey: keyof SegmentDetails) => {
    formik.setFieldValue(segmentKey, !formik.values[segmentKey]);
  };

  const selectedCount = Object.values(formik.values).filter(Boolean).length;

  return (
    <Fade in timeout={500}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Segment Details
          </Typography>
          <Chip 
            label={`${selectedCount} Selected`} 
            color="primary" 
            variant={selectedCount > 0 ? "filled" : "outlined"}
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Select the trading segments you want to activate
        </Typography>

        <Grid container spacing={3}>
          {segments.map((segment) => (
            <Grid item xs={12} md={6} key={segment.key}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: formik.values[segment.key] 
                    ? `2px solid ${segment.color}` 
                    : '2px solid transparent',
                  backgroundColor: formik.values[segment.key] 
                    ? `${segment.color}10` 
                    : 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => handleSegmentToggle(segment.key)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          backgroundColor: `${segment.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: segment.color,
                        }}
                      >
                        {segment.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {segment.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {segment.description}
                        </Typography>
                      </Box>
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formik.values[segment.key]}
                          onChange={() => handleSegmentToggle(segment.key)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: segment.color,
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: segment.color,
                            },
                          }}
                        />
                      }
                      label=""
                      sx={{ m: 0 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {formik.values.derivatives && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: 'warning.light',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'warning.main',
            }}
          >
            <Typography variant="body2" color="warning.dark">
              <strong>Risk Disclosure:</strong> Trading in derivatives involves substantial risk and may not be suitable for all investors. Please ensure you understand the risks involved.
            </Typography>
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default SegmentForm;