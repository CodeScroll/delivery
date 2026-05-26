import { constTrans, fetchSource } from '@/api';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Show({ order }) {

    console.log('order',order)
    return (
        <>

        </>
    );
}

Show.layout = (page) => <GuestLayout>{page}</GuestLayout>;
