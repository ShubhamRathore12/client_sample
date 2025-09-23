import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Fade,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PersonalDetails } from '../../types';

interface PersonalDetailsFormProps {
  initialData: PersonalDetails;
  onSubmit: (data: PersonalDetails) => void;
  onNext: () => void;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
  maritalStatus: Yup.string().required('Marital status is required'),
  fatherName: Yup.string().required('Father name is required'),
  motherName: Yup.string().required('Mother name is required'),
  panNumber: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format')
    .required('PAN number is required'),
  aadharNumber: Yup.string()
    .matches(/^\d{12}$/, 'Aadhar must be 12 digits')
    .required('Aadhar number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile must be 10 digits')
    .required('Mobile number is required'),
  occupation: Yup.string().required('Occupation is required'),
  annualIncome: Yup.string().required('Annual income is required'),
});

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
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

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Apply specific formatting based on field
    if (field === 'panNumber') {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    } else if (field === 'aadharNumber' || field === 'mobile') {
      value = value.replace(/\D/g, '');
    } else if (field.includes('Name')) {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }
    
    formik.setFieldValue(field, value);
  };

  return (
    <Fade in timeout={500}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Personal Details
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={handleInputChange('firstName')}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Middle Name (Optional)"
              name="middleName"
              value={formik.values.middleName}
              onChange={handleInputChange('middleName')}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={handleInputChange('lastName')}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
              helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: new Date().toISOString().split('T')[0],
                min: '1900-01-01',
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Marital Status"
              name="maritalStatus"
              value={formik.values.maritalStatus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}
              helperText={formik.touched.maritalStatus && formik.errors.maritalStatus}
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="divorced">Divorced</MenuItem>
              <MenuItem value="widowed">Widowed</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Father's Name"
              name="fatherName"
              value={formik.values.fatherName}
              onChange={handleInputChange('fatherName')}
              onBlur={formik.handleBlur}
              error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
              helperText={formik.touched.fatherName && formik.errors.fatherName}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mother's Name"
              name="motherName"
              value={formik.values.motherName}
              onChange={handleInputChange('motherName')}
              onBlur={formik.handleBlur}
              error={formik.touched.motherName && Boolean(formik.errors.motherName)}
              helperText={formik.touched.motherName && formik.errors.motherName}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          {formik.values.maritalStatus === 'married' && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Spouse Name"
                name="spouseName"
                value={formik.values.spouseName}
                onChange={handleInputChange('spouseName')}
                inputProps={{ maxLength: 100 }}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="PAN Number"
              name="panNumber"
              value={formik.values.panNumber}
              onChange={handleInputChange('panNumber')}
              onBlur={formik.handleBlur}
              error={formik.touched.panNumber && Boolean(formik.errors.panNumber)}
              helperText={formik.touched.panNumber && formik.errors.panNumber}
              inputProps={{ maxLength: 10 }}
              placeholder="ABCDE1234F"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Aadhar Number"
              name="aadharNumber"
              value={formik.values.aadharNumber}
              onChange={handleInputChange('aadharNumber')}
              onBlur={formik.handleBlur}
              error={formik.touched.aadharNumber && Boolean(formik.errors.aadharNumber)}
              helperText={formik.touched.aadharNumber && formik.errors.aadharNumber}
              inputProps={{ maxLength: 12 }}
              placeholder="123456789012"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={formik.values.mobile}
              onChange={handleInputChange('mobile')}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              inputProps={{ maxLength: 10 }}
              placeholder="9876543210"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Occupation"
              name="occupation"
              value={formik.values.occupation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.occupation && Boolean(formik.errors.occupation)}
              helperText={formik.touched.occupation && formik.errors.occupation}
            >
              <MenuItem value="service">Service</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="housewife">Housewife</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="retired">Retired</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Annual Income"
              name="annualIncome"
              value={formik.values.annualIncome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.annualIncome && Boolean(formik.errors.annualIncome)}
              helperText={formik.touched.annualIncome && formik.errors.annualIncome}
            >
              <MenuItem value="below-1-lakh">Below ₹1 Lakh</MenuItem>
              <MenuItem value="1-5-lakh">₹1 - ₹5 Lakh</MenuItem>
              <MenuItem value="5-10-lakh">₹5 - ₹10 Lakh</MenuItem>
              <MenuItem value="10-25-lakh">₹10 - ₹25 Lakh</MenuItem>
              <MenuItem value="25-50-lakh">₹25 - ₹50 Lakh</MenuItem>
              <MenuItem value="above-50-lakh">Above ₹50 Lakh</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default PersonalDetailsForm;