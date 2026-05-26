import { constTrans, fetchSource } from '@/api';
import AddressCard from '@/Components/AddressCard';
import CheckoutBasket from '@/Components/Basket/CheckoutBasket';
import AccessModal from '@/Components/Modals/AccessModal';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

export default function Checkout({}) {
    const [openAccessModal, setOpenAccessModal] = useState(false);
    const [address, setAddress] = useState({});
    const [pageUrl, setPageUrl] = useState(null);
    const [selectAddressModal, setSelectAddressModal] = useState(false);
    const { auth } = usePage().props;

    const transes = {
        el: {
            lastusedcreated: 'Τελευταία χρησιμοποιημένη',
        },
    };

    const selectingAddress = () => {
        setSelectAddressModal(true);
    };

    const handleOnOrder = async () => {
        if (auth && !auth.user) {
            setOpenAccessModal(true);
            return false;
        }

        try {
            const response = await axios.post('/order/store', {
                address: address.id,
                type: 'delivery',
            });

            if (response.status === 200 && response.data.status) {
                router.visit(response.data.redirecturl);
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
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

            fetchSource('/address/last')
                .then((data) => {
                    if (data) {
                        setAddress(data);
                    }
                })
                .catch(console.error);
        }
    }, [auth]);
    return (
        <>
            <AccessModal open={openAccessModal} onClose={() => setOpenAccessModal(false)} pageUrl={pageUrl}></AccessModal>
            <CheckoutBasket />
            {address && (
                <div className="m-auto w-full md:w-1/2">
                    <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        {ti8c('address')} ({constTrans(transes, 'lastusedcreated')})
                        <FaExchangeAlt className="cursor-pointer text-sm" onClick={selectingAddress} />
                    </h2>

                    <div className="space-y-3">
                        <AddressCard key={address.id} addr={address} index={0} onDelete={() => {}} />
                    </div>
                </div>
            )}
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
