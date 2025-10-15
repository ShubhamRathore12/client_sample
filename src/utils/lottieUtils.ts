// This function helps import Lottie animations with proper TypeScript types
type LottieAnimation = any; // You can import the proper type from 'lottie-react' if needed

const lottieCache: Record<string, LottieAnimation> = {};

export const getLottieAnimation = async (path: string): Promise<LottieAnimation> => {
  if (lottieCache[path]) {
    return lottieCache[path];
  }

  try {
    // For Vite, we need to use dynamic imports with the public path
    const basePath = import.meta.env.BASE_URL || '';
    const fullPath = `${basePath}${path.startsWith('/') ? path.slice(1) : path}`;
    
    const response = await fetch(fullPath);
    if (!response.ok) {
      throw new Error(`Failed to load Lottie animation: ${path}`);
    }
    
    const animationData = await response.json();
    lottieCache[path] = animationData;
    return animationData;
  } catch (error) {
    console.error('Error loading Lottie animation:', error);
    return null;
  }
};
