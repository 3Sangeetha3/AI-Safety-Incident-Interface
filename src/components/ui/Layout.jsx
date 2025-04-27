import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
            {/* Decorative elements - circles */}
            <div className="absolute top-100 right-32 w-64 h-64 bg-teal-500 blur-[2px] rounded-full opacity-5 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute top-140 right-20 w-30 h-30 bg-cyan-500 blur-[2px] rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-18 w-96 h-96 bg-cyan-500 blur-[2px] rounded-full opacity-5 translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-50 left-12 w-40 h-40 bg-teal-500 blur-[2px] rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-50 left-32 w-20 h-20 bg-cyan-500 blur-[2px] rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"></div>

            <Header />

            <main className="flex-grow container mx-auto px-4 py-10">
                {children}
            </main>

            <Footer />
        </div>
    );
};