import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Box } from '@mui/material';

const Lottie = lazy(() => import('lottie-react'));

interface LottiePlayerProps {
  src: string;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({
  src,
  width = '100%',
  height = '100%',
  loop = true,
  autoplay = true,
}) => {
  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        // Remove leading slash if present
        const cleanPath = src.startsWith('/') ? src.substring(1) : src;
        const response = await fetch(`/${cleanPath}`);
        if (!response.ok) {
          throw new Error(`Failed to load Lottie animation: ${src}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        console.error('Error loading Lottie animation:', err);
        setError(err as Error);
      }
    };

    loadAnimation();
  }, [src]);

  if (error) {
    return (
      <Box
        sx={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0,0,0,0.05)',
          borderRadius: 1,
        }}
      >
        <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'grey.300' }} />
      </Box>
    );
  }

  if (!animationData) {
    return (
      <Box
        sx={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'grey.200' }} />
      </Box>
    );
  }

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            width,
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'grey.300' }} />
        </Box>
      }
    >
      <Box sx={{ width, height }}>
        <Lottie
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Suspense>
  );
};

export default LottiePlayer;
