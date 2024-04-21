import { useLoading } from "@/hook/loading";


export default function Loading() {
  const { isLoading, showLoading, hideLoading } = useLoading();

  // ...

  return <div>{isLoading ? 'Loading...' : 'Not loading'}</div>;
}