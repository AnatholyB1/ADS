import Header from '@/components/header/header';
import { LoadingProvider } from '@/provider/loadingProvider';

import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
            <LoadingProvider>
            <Header />
            <main>                
                <Outlet />
            </main>
            </LoadingProvider>
        </>
    )
}