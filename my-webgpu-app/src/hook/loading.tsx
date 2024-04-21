// useLoading.ts
import { useContext } from 'react';
import { LoadingContext } from '@/provider/loadingProvider';

export const useLoading = () => useContext(LoadingContext);