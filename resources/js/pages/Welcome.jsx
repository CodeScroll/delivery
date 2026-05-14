import DeliveryForm from '@/Components/DeliveryForm';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ cities }) {
    return (
        <>
            <DeliveryForm cities={cities} />
        </>
    );
}

Welcome.layout = (page) => <GuestLayout>{page}</GuestLayout>;
