import { constTrans, fetchSource } from '@/api';
import AddressCard from '@/Components/AddressCard';
import CheckoutBasket from '@/Components/Basket/CheckoutBasket';
import DatePickerCard from '@/Components/DatePickerCard';
import AccessModal from '@/Components/Modals/AccessModal';
import PrimaryButton from '@/Components/PrimaryButton';
import TimeSelect from '@/Components/TimeSelect';
import GuestLayout from '@/Layouts/GuestLayout';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

export default function Checkout({}) {
    const [openAccessModal, setOpenAccessModal] = useState(false);
    const [address, setAddress] = useState(null);
    const [pageUrl, setPageUrl] = useState(null);
    const [selectAddressModal, setSelectAddressModal] = useState(false);
    const [dateSelected, setDateSelected] = useState(null);
    const [timeSelected, setTimeSelected] = useState('');
    const { auth } = usePage().props;

    const transes = {
        el: {
            lastusedcreated: 'Τελευταία χρησιμοποιημένη',
            selecttime: 'Επιλογή ώρας',
            selected: 'Επιλεγμένη',
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
            const params = {
                address: address.id,
                type: 'delivery',
                ...(dateSelected && { order_date: dateSelected }),
                ...(timeSelected && { order_time: timeSelected }),
            };

            const response = await axios.post('/order/store', params);

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
                <div className="m-auto my-4 w-full md:w-1/2">
                    <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        {ti8c('address')} ({constTrans(transes, 'lastusedcreated')})
                        <FaExchangeAlt className="cursor-pointer text-sm" onClick={selectingAddress} />
                    </h2>

                    <div className="space-y-3">
                        <AddressCard key={address.id} addr={address} index={0} onDelete={() => {}} />
                    </div>
                </div>
            )}

            <div className="flex flex-col items-center justify-center gap-6 bg-gray-50 p-6 md:flex-row">
                <div className="mx-auto w-full max-w-md">
                    <DatePickerCard setDateSelected={setDateSelected} />
                </div>

                <div className="mx-auto w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-md">
                    <label className="block text-sm font-medium text-gray-700">{constTrans(transes, 'selecttime')}</label>
                    <TimeSelect value={timeSelected} onChange={setTimeSelected} />
                </div>
            </div>

            <div className="flex items-center justify-center p-6">
                <PrimaryButton
                    onClick={handleOnOrder}
                    className="rounded-xl bg-green-600 px-10 py-4 text-sm font-semibold text-white shadow-md shadow-green-600/30 transition-all duration-200 ease-in-out hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/40 focus:outline-none focus:ring-4 focus:ring-green-400/40 active:scale-[0.98] active:bg-green-700"
                >
                    {ti8c('order')}
                </PrimaryButton>
            </div>
        </>
    );
}

Checkout.layout = (page) => <GuestLayout>{page}</GuestLayout>;
