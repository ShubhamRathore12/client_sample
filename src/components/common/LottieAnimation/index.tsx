import React from 'react';
import Lottie from 'lottie-react';

export const LottieAnimation = ({ animationData, width = 40, height = 40 }) => {
  return (
    <div style={{ width, height }}>
      <Lottie 
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
