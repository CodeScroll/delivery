import CheckoutBasket from '@/Components/Basket/CheckoutBasket';
import AccessModal from '@/Components/Modals/AccessModal';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Checkout({}) {
    const [openAccessModal, setOpenAccessModal] = useState(false);
    const [pageUrl, setPageUrl] = useState(null);
    const { auth } = usePage().props;

    const handleOnOrder = () => {
        // your order logic here
        console.log('Order placed!');

        if (auth && !auth.user) {
            setOpenAccessModal(true);
        }
    };

    useEffect(() => {
        const { pathname, search, hash } = window.location;
        const urlWithoutDomain = pathname + search + hash;
        setPageUrl(urlWithoutDomain);
    }, []);

    useEffect(() => {
        if (auth && auth.user) {
            setOpenAccessModal(false);
        }
    }, [auth]);
    return (
        <>
            <AccessModal open={openAccessModal} onClose={() => setOpenAccessModal(false)} pageUrl={pageUrl}></AccessModal>
            <CheckoutBasket />
            <div className="flex items-center justify-center p-6">
                <PrimaryButton
                    onClick={handleOnOrder}
                    className="!bg-green-600 px-8 py-4 text-sm hover:!bg-green-500 focus:!bg-green-500 focus:!ring-green-500 active:!bg-green-700"
                >
                    {ti8c('order')}
                </PrimaryButton>
            </div>
        </>
    );
}

Checkout.layout = (page) => <GuestLayout>{page}</GuestLayout>;
