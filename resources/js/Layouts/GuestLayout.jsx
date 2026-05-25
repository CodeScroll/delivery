import GuestHeader from '@/Components/Header/GuestHeader';
import CartSidebar from '@/Components/Sidebars/CartSidebar';
import { BasketProvider } from '@/Providers/BasketProvider';
import { useState } from 'react';
import CookieConsent from '../Components/Cookies/CookieConsent';

export default function GuestLayout({ children }) {
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <>
            <BasketProvider>
                <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

                <div className="flex flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
                    <GuestHeader
                        onCartClick={() => {
                            setCartOpen(true);
                        }}
                    />
                    <div className="w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:rounded-lg">{children}</div>
                </div>
                <CookieConsent />
            </BasketProvider>
        </>
    );
}
