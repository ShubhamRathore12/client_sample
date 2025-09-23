import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Fade,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { CheckCircle, Person, Home, TrendingUp, Create, Info } from '@mui/icons-material';
import { RekycFormData } from '../../types';

interface ReviewFormProps {
  formData: RekycFormData;
  onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData }) => {
  const { personalDetails, permanentAddress, segmentDetails, signatureDetails, otherDetails } = formData;

  const selectedSegments = Object.entries(segmentDetails)
    .filter(([_, selected]) => selected)
    .map(([key, _]) => key);

  const InfoCard = ({ 
    icon, 
    title, 
    children 
  }: { 
    icon: React.ReactNode; 
    title: string; 
    children: React.ReactNode; 
  }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'primary.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              color: 'primary.main',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Fade in timeout={500}>
      <Box>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Review Your Information
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Please review all the information before submitting your Re-KYC application
        </Typography>

        {/* Personal Details */}
        <InfoCard icon={<Person />} title="Personal Details">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Full Name</Typography>
              <Typography variant="body1">
                {`${personalDetails.firstName} ${personalDetails.middleName || ''} ${personalDetails.lastName}`.trim()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
              <Typography variant="body1">{personalDetails.dateOfBirth}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">PAN Number</Typography>
              <Typography variant="body1">{personalDetails.panNumber}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Mobile</Typography>
              <Typography variant="body1">{personalDetails.mobile}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Email</Typography>
              <Typography variant="body1">{personalDetails.email}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Annual Income</Typography>
              <Typography variant="body1">{personalDetails.annualIncome}</Typography>
            </Grid>
          </Grid>
        </InfoCard>

        {/* Address Details */}
        <InfoCard icon={<Home />} title="Permanent Address">
          <Typography variant="body1">
            {permanentAddress.addressLine1}
            {permanentAddress.addressLine2 && `, ${permanentAddress.addressLine2}`}
            {permanentAddress.addressLine3 && `, ${permanentAddress.addressLine3}`}
            <br />
            {permanentAddress.city}, {permanentAddress.state} - {permanentAddress.pincode}
            <br />
            {permanentAddress.country}
          </Typography>
        </InfoCard>

        {/* Segment Details */}
        <InfoCard icon={<TrendingUp />} title="Trading Segments">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedSegments.length > 0 ? (
              selectedSegments.map((segment) => (
                <Chip
                  key={segment}
                  label={segment.charAt(0).toUpperCase() + segment.slice(1)}
                  color="primary"
                  variant="filled"
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No segments selected
              </Typography>
            )}
          </Box>
        </InfoCard>

        {/* Signature & Photo */}
        <InfoCard icon={<Create />} title="Documents">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle 
                  sx={{ 
                    color: signatureDetails.signatureImage ? 'success.main' : 'grey.400',
                    mr: 1 
                  }} 
                />
                <Typography variant="body1">
                  Signature {signatureDetails.signatureImage ? 'Uploaded' : 'Not Uploaded'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle 
                  sx={{ 
                    color: signatureDetails.photographImage ? 'success.main' : 'grey.400',
                    mr: 1 
                  }} 
                />
                <Typography variant="body1">
                  Photograph {signatureDetails.photographImage ? 'Uploaded' : 'Not Uploaded'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </InfoCard>

        {/* Other Details */}
        <InfoCard icon={<Info />} title="Additional Information">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Bank Account</Typography>
              <Typography variant="body1">
                {otherDetails.bankDetails.accountNumber} ({otherDetails.bankDetails.bankName})
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Trading Experience</Typography>
              <Typography variant="body1">{otherDetails.tradingExperience}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Risk Profile</Typography>
              <Typography variant="body1">{otherDetails.riskProfile}</Typography>
            </Grid>
            {otherDetails.nomineeDetails.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Nominees ({otherDetails.nomineeDetails.length})
                </Typography>
                <List dense>
                  {otherDetails.nomineeDetails.map((nominee, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText
                        primary={`${nominee.name} (${nominee.relation})`}
                        secondary={`${nominee.sharePercentage}% share`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
          </Grid>
        </InfoCard>
      </Box>
    </Fade>
  );
};

export default ReviewForm;