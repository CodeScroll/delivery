import DeliveryForm from '@/Components/DeliveryForm';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome() {
    return (
        <>
            <DeliveryForm />
        </>
    );
}

Welcome.layout = (page) => <GuestLayout>{page}</GuestLayout>;
