import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Fade,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { OtherDetails } from '../../types';

interface OtherDetailsFormProps {
  initialData: OtherDetails;
  onSubmit: (data: OtherDetails) => void;
  onNext: () => void;
}

const validationSchema = Yup.object({
  bankDetails: Yup.object({
    accountNumber: Yup.string().required('Account number is required'),
    ifscCode: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code')
      .required('IFSC code is required'),
    bankName: Yup.string().required('Bank name is required'),
    accountType: Yup.string().required('Account type is required'),
  }),
  tradingExperience: Yup.string().required('Trading experience is required'),
  riskProfile: Yup.string().required('Risk profile is required'),
});

const OtherDetailsForm: React.FC<OtherDetailsFormProps> = ({
  initialData,
  onSubmit,
  onNext,
}) => {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      onNext();
    },
  });

  const addNominee = () => {
    const newNominee = { name: '', relation: '', sharePercentage: 0 };
    formik.setFieldValue('nomineeDetails', [...formik.values.nomineeDetails, newNominee]);
  };

  const removeNominee = (index: number) => {
    const nominees = formik.values.nomineeDetails.filter((_, i) => i !== index);
    formik.setFieldValue('nomineeDetails', nominees);
  };

  const updateNominee = (index: number, field: string, value: any) => {
    const nominees = [...formik.values.nomineeDetails];
    nominees[index] = { ...nominees[index], [field]: value };
    formik.setFieldValue('nomineeDetails', nominees);
  };

  const totalSharePercentage = formik.values.nomineeDetails.reduce(
    (sum, nominee) => sum + (nominee.sharePercentage || 0),
    0
  );

  return (
    <Fade in timeout={500}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Other Details
        </Typography>

        {/* Bank Details */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Bank Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="bankDetails.accountNumber"
                  value={formik.values.bankDetails.accountNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bankDetails?.accountNumber && Boolean(formik.errors.bankDetails?.accountNumber)}
                  helperText={formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="IFSC Code"
                  name="bankDetails.ifscCode"
                  value={formik.values.bankDetails.ifscCode}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    formik.setFieldValue('bankDetails.ifscCode', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bankDetails?.ifscCode && Boolean(formik.errors.bankDetails?.ifscCode)}
                  helperText={formik.touched.bankDetails?.ifscCode && formik.errors.bankDetails?.ifscCode}
                  inputProps={{ maxLength: 11 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bankDetails.bankName"
                  value={formik.values.bankDetails.bankName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bankDetails?.bankName && Boolean(formik.errors.bankDetails?.bankName)}
                  helperText={formik.touched.bankDetails?.bankName && formik.errors.bankDetails?.bankName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Account Type"
                  name="bankDetails.accountType"
                  value={formik.values.bankDetails.accountType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bankDetails?.accountType && Boolean(formik.errors.bankDetails?.accountType)}
                  helperText={formik.touched.bankDetails?.accountType && formik.errors.bankDetails?.accountType}
                >
                  <MenuItem value="savings">Savings</MenuItem>
                  <MenuItem value="current">Current</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Nominee Details */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Nominee Details
              </Typography>
              <Button
                startIcon={<Add />}
                onClick={addNominee}
                disabled={formik.values.nomineeDetails.length >= 3}
              >
                Add Nominee
              </Button>
            </Box>

            {formik.values.nomineeDetails.map((nominee, index) => (
              <Box key={index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">Nominee {index + 1}</Typography>
                  <IconButton
                    color="error"
                    onClick={() => removeNominee(index)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </Box>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={nominee.name}
                      onChange={(e) => updateNominee(index, 'name', e.target.value)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      select
                      label="Relation"
                      value={nominee.relation}
                      onChange={(e) => updateNominee(index, 'relation', e.target.value)}
                      size="small"
                    >
                      <MenuItem value="father">Father</MenuItem>
                      <MenuItem value="mother">Mother</MenuItem>
                      <MenuItem value="spouse">Spouse</MenuItem>
                      <MenuItem value="son">Son</MenuItem>
                      <MenuItem value="daughter">Daughter</MenuItem>
                      <MenuItem value="brother">Brother</MenuItem>
                      <MenuItem value="sister">Sister</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Share %"
                      type="number"
                      value={nominee.sharePercentage}
                      onChange={(e) => updateNominee(index, 'sharePercentage', Number(e.target.value))}
                      inputProps={{ min: 1, max: 100 }}
                      size="small"
                    />
                  </Grid>
                </Grid>
                {index < formik.values.nomineeDetails.length - 1 && <Divider sx={{ mb: 3 }} />}
              </Box>
            ))}

            {formik.values.nomineeDetails.length > 0 && (
              <Box
                sx={{
                  p: 2,
                  backgroundColor: totalSharePercentage === 100 ? 'success.light' : 'warning.light',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: totalSharePercentage === 100 ? 'success.main' : 'warning.main',
                }}
              >
                <Typography variant="body2" color={totalSharePercentage === 100 ? 'success.dark' : 'warning.dark'}>
                  Total Share Percentage: {totalSharePercentage}%
                  {totalSharePercentage !== 100 && ' (Must equal 100%)'}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Trading Experience & Risk Profile */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Trading Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Trading Experience"
                  name="tradingExperience"
                  value={formik.values.tradingExperience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.tradingExperience && Boolean(formik.errors.tradingExperience)}
                  helperText={formik.touched.tradingExperience && formik.errors.tradingExperience}
                >
                  <MenuItem value="beginner">Beginner (0-1 years)</MenuItem>
                  <MenuItem value="intermediate">Intermediate (1-3 years)</MenuItem>
                  <MenuItem value="experienced">Experienced (3-5 years)</MenuItem>
                  <MenuItem value="expert">Expert (5+ years)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Risk Profile"
                  name="riskProfile"
                  value={formik.values.riskProfile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.riskProfile && Boolean(formik.errors.riskProfile)}
                  helperText={formik.touched.riskProfile && formik.errors.riskProfile}
                >
                  <MenuItem value="low">Conservative (Low Risk)</MenuItem>
                  <MenuItem value="medium">Moderate (Medium Risk)</MenuItem>
                  <MenuItem value="high">Aggressive (High Risk)</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default OtherDetailsForm;