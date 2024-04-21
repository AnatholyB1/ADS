// LoadingProvider.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Create a context for the loading state
export const LoadingContext = createContext({
  isLoading: false,
  loadingState: 0,
  setLoadingState: (state: number) => {},
  showLoading: () => {},
  hideLoading: () => {},
});

// Create a provider component
export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState(0);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);
  

  return (
    <LoadingContext.Provider value={{ isLoading, loadingState, setLoadingState, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};