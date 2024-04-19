import React from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

interface LayerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function Layer({...props} : LayerProps) {
    return (
        <div>
            <Header />
                {props.children}
            <Footer />
        </div>
    );
}