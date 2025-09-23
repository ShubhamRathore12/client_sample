import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Fade,
  Card,
  CardContent,
  Button,
  IconButton,
} from '@mui/material';
import { CloudUpload, Delete, CheckCircle } from '@mui/icons-material';
import { useFormik } from 'formik';
import { SignatureDetails } from '../../types';

interface SignatureFormProps {
  initialData: SignatureDetails;
  onSubmit: (data: SignatureDetails) => void;
  onNext: () => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({
  initialData,
  onSubmit,
  onNext,
}) => {
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [photographPreview, setPhotographPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: initialData,
    onSubmit: (values) => {
      onSubmit(values);
      onNext();
    },
  });

  const handleFileUpload = (type: 'signature' | 'photograph') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fieldName = type === 'signature' ? 'signatureImage' : 'photographImage';
      formik.setFieldValue(fieldName, file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'signature') {
          setSignaturePreview(result);
        } else {
          setPhotographPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileRemove = (type: 'signature' | 'photograph') => {
    const fieldName = type === 'signature' ? 'signatureImage' : 'photographImage';
    formik.setFieldValue(fieldName, undefined);
    
    if (type === 'signature') {
      setSignaturePreview(null);
    } else {
      setPhotographPreview(null);
    }
  };

  const UploadCard = ({ 
    type, 
    title, 
    description, 
    preview, 
    file 
  }: { 
    type: 'signature' | 'photograph';
    title: string;
    description: string;
    preview: string | null;
    file?: File;
  }) => (
    <Card
      sx={{
        border: '2px dashed',
        borderColor: file ? 'success.main' : 'grey.300',
        backgroundColor: file ? 'success.light' : 'grey.50',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'primary.light',
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        {preview ? (
          <Box>
            <Box
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                borderRadius: 1,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'grey.300',
              }}
            >
              <img
                src={preview}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button
                component="label"
                variant="outlined"
                size="small"
                startIcon={<CloudUpload />}
              >
                Change
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileUpload(type)}
                />
              </Button>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleFileRemove(type)}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box>
            <CloudUpload sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {description}
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUpload />}
            >
              Upload {title}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileUpload(type)}
              />
            </Button>
          </Box>
        )}
        
        {file && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
            <Typography variant="body2" color="success.main">
              {file.name}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Fade in timeout={500}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Signature & Photograph
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Please upload your signature and recent photograph for KYC verification
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <UploadCard
              type="signature"
              title="Signature"
              description="Upload a clear image of your signature on white paper"
              preview={signaturePreview}
              file={formik.values.signatureImage}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <UploadCard
              type="photograph"
              title="Photograph"
              description="Upload a recent passport-size photograph"
              preview={photographPreview}
              file={formik.values.photographImage}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            p: 2,
            backgroundColor: 'info.light',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'info.main',
          }}
        >
          <Typography variant="body2" color="info.dark">
            <strong>Guidelines:</strong>
            <br />
            • Images should be clear and readable
            • File size should not exceed 5MB
            • Supported formats: JPG, JPEG, PNG
            • Signature should be on white background
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default SignatureForm;