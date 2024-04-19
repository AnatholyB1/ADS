import Header from '@/components/header/header';


import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
            <Header />
            <main>                
                <Outlet />
            </main>
        </>
    )
}