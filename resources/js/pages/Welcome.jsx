import DeliveryForm from '@/Components/DeliveryForm';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({targetCity}) {
    return (
        <>
            <DeliveryForm targetCity={targetCity} />
        </>
    );
}

Welcome.layout = (page) => <GuestLayout>{page}</GuestLayout>;
