// LoadingProvider.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Create a context for the loading state
export const LoadingContext = createContext({
  isLoading: false,
  loadingState: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNumberState: (state: number) => {},
  showLoading: () => {},
  hideLoading: () => {},
});

// Create a provider component
export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState(0);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);
  const setNumberState = (state: number) => setLoadingState(state);
  

  return (
    <LoadingContext.Provider value={{ isLoading, loadingState, setNumberState, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};