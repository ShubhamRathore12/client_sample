import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Fade,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PermanentAddress } from '../../types';

interface AddressFormProps {
  initialData: PermanentAddress;
  onSubmit: (data: PermanentAddress) => void;
  onNext: () => void;
}

const validationSchema = Yup.object({
  addressLine1: Yup.string().required('Address line 1 is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  pincode: Yup.string()
    .matches(/^\d{6}$/, 'Pincode must be 6 digits')
    .required('Pincode is required'),
});

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
];

const AddressForm: React.FC<AddressFormProps> = ({
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
    
    if (field === 'pincode') {
      value = value.replace(/\D/g, '');
    }
    
    formik.setFieldValue(field, value);
  };

  return (
    <Fade in timeout={500}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Permanent Address
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="addressLine1"
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
              helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address Line 2 (Optional)"
              name="addressLine2"
              value={formik.values.addressLine2}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address Line 3 (Optional)"
              name="addressLine3"
              value={formik.values.addressLine3}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="State"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            >
              {indianStates.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={formik.values.pincode}
              onChange={handleInputChange('pincode')}
              onBlur={formik.handleBlur}
              error={formik.touched.pincode && Boolean(formik.errors.pincode)}
              helperText={formik.touched.pincode && formik.errors.pincode}
              inputProps={{ maxLength: 6 }}
              placeholder="123456"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="sameAsCorrespondence"
                  checked={formik.values.sameAsCorrespondence}
                  onChange={formik.handleChange}
                />
              }
              label="Same as correspondence address"
            />
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default AddressForm;