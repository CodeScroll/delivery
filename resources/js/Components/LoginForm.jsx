import { constTrans } from '@/api';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Login({ status, canResetPassword }) {
    const redirections = ['checkout'];
    const transes = {
        el: {
            password: 'Κωδικός',
            rememberme: 'Αποθήκευση σύνδεσης',
            login: 'Είσοδος',
            forgotyourpass: 'Ξέχασα τον κωδικό',
        },
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        redirectto: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => {
                reset('password');
            },
        });
    };

    useEffect(() => {
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(Boolean);
        const redirectTo = pathParts.find((part) => redirections.includes(part));
        if (redirectTo) {
            setData('redirectto', redirectTo);
        }
    }, []);

    return (
        <>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-left" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value={constTrans(transes, 'password')} className="text-left" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox name="remember" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">{constTrans(transes, 'rememberme')}</span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {constTrans(transes, 'login')}
                    </PrimaryButton>
                </div>
            </form>
            <div>
                <Link
                    href={route('password.request')}
                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                >
                    {constTrans(transes, 'forgotpass')}
                </Link>
            </div>
        </>
    );
}
