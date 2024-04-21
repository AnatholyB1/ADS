import { useLoading } from "@/hook/loading";


export default function Loading() {
  const { isLoading, showLoading, hideLoading, loadingState, setNumberState } = useLoading();

  // ...

  return <div>{isLoading ? 'Loading...' : 'Not loading'}</div>;
}