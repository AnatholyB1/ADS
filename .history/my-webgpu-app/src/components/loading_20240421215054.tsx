import { useLoading } from "@/hook/loading";


export default function Loading() {
  const { isLoading, loadingState } = useLoading();
    

  return <div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white text-2xl">{isLoading && loadingState }</div>;
}