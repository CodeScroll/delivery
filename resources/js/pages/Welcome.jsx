import DeliveryForm from '@/Components/DeliveryForm';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';

export default function Welcome({ defaultCity }) {
    const [active, setActive] = useState('delivery');

    return (
        <>
            <div className="flex flex-col gap-2 md:flex-row">
                {['delivery', 'shipment'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={`flex flex-1 items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                            active === tab
                                ? 'border-blue-400 bg-blue-50 text-blue-700'
                                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        {tab === 'delivery' ? <HomeIcon /> : <PackageIcon />}
                        {tab === 'delivery' ? ti8c('delivery') : ti8c('shipment')}
                    </button>
                ))}
            </div>
            {active === 'delivery' && <DeliveryForm defaultCity={defaultCity} />}
            {active === 'shipment' && <div>Shipment content</div>}
        </>
    );
}

const HomeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const PackageIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

Welcome.layout = (page) => <GuestLayout>{page}</GuestLayout>;
