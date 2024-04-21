import Header from '@/components/header/header';
import { LoadingProvider } from '@/provider/loadingProvider';

import { Outlet } from "react-router-dom"
import Loading from '@/components/loading';

export default function Layout() {
    return (
        <>
            <LoadingProvider>
            <Header />
            <main>     
                <Loading/>           
                <Outlet />
            </main>
            </LoadingProvider>
        </>
    )
}