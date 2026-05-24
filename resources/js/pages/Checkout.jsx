import GuestLayout from '@/Layouts/GuestLayout';
import CheckoutBasket from '@/Components/Basket/CheckoutBasket';

export default function Checkout({}) {
    return (
        <>
            <CheckoutBasket />
        </>
    );
}

Checkout.layout = (page) => <GuestLayout>{page}</GuestLayout>;
