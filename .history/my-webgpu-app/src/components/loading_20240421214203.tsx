import { useLoading } from "@/hook/loading";


export default function Loading() {
  const { isLoading, loadingState } = useLoading();
    

  return <div>{isLoading && loadingState }</div>;
}