import DeliveryForm from '@/Components/DeliveryForm';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({defaultCity}) {
    return (
        <>
            <DeliveryForm defaultCity={defaultCity} />
        </>
    );
}

Welcome.layout = (page) => <GuestLayout>{page}</GuestLayout>;
