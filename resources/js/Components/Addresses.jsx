import { constTrans, fetchSource } from '@/api';
import { useEffect, useState } from 'react';

const initialForm = {
    city: '',
    address: '',
    address_street: '',
    floor: '',
    comments: '',
};

function AddressCard({ addr, index, onDelete }) {
    return (
        <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                        <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                            {addr.address}
                            {addr.address_street ? `, ${addr.address_street}` : ''}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                            {[addr.floor && `Floor ${addr.floor}`, addr.city].filter(Boolean).join(' · ')}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => onDelete(index)}
                    className="flex-shrink-0 rounded-lg p-1.5 text-slate-300 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-400 group-hover:opacity-100"
                    title="Remove address"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {addr.comments && <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-400">{addr.comments}</p>}
        </div>
    );
}

function Field({ label, id, value, onChange, placeholder, type = 'text', textarea = false, required = false }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {label}
                {required && <span className="ml-0.5 text-indigo-400">*</span>}
            </label>
            {textarea ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 transition-all duration-150 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 transition-all duration-150 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            )}
        </div>
    );
}

export default function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const validate = () => {
        const errs = {};
        if (!form.city.trim()) errs.city = true;
        if (!form.address.trim()) errs.address = true;
        return errs;
    };

    const handleSubmit = async () => {
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        try {
            const response = await axios.post('/addresses/store', form);

            console.log('response:', response);
            console.log('Success:', response.data);
            if (response.data.id) {
                setAddresses((prev) => [...prev, form]);
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }

        setForm(initialForm);
        setErrors({});
        setOpen(false);
    };

    const handleDelete = (index) => {
        setAddresses((prev) => prev.filter((_, i) => i !== index));
    };

    const transes = {
        el: {
            newaddress: 'Νέα διεύθυνση',
            saveaddress: 'Αποθήκευση διεύθυνσης',
            noaddressesyet: 'Δεν έχει αποθηκευτεί ακόμη διεύθυνση',
        },
    };

    useEffect(() => {
        fetchSource('/addresses/get')
            .then((data) => {
                if (data && Array.isArray(data)) {
                    setAddresses(data);
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div
            className="flex min-h-screen items-start justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-6 pt-12"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800">{ti8c('addresses')}</h1>
                    <p className="mt-1 text-sm text-slate-400">
                        {addresses.length === 0
                            ? constTrans(transes, 'noaddressesyet')
                            : `${addresses.length} ${addresses.length > 1 ? ti8c('addresses') : ti8c('address')}`}
                    </p>
                </div>

                {/* Address List */}
                {addresses.length > 0 && (
                    <div className="mb-5 flex flex-col gap-3">
                        {addresses.map((addr, i) => (
                            <AddressCard key={i} addr={addr} index={i} onDelete={handleDelete} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {addresses.length === 0 && !open && (
                    <div className="mb-4 flex flex-col items-center justify-center py-10 text-slate-300">
                        <svg className="mb-3 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                        </svg>
                        <p className="text-sm font-medium">Add your first address</p>
                    </div>
                )}

                {/* Create Address Form */}
                {open ? (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {/* Form header */}
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                            <h2 className="text-sm font-semibold text-slate-700">{constTrans(transes, 'newaddress')}</h2>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setForm(initialForm);
                                    setErrors({});
                                }}
                                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Form body */}
                        <div className="flex flex-col gap-4 px-5 py-4">
                            {/* City */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    {ti8c('city')}
                                    <span className="ml-0.5 text-indigo-400">*</span>
                                </label>
                                <input
                                    id="city"
                                    value={form.city}
                                    onChange={set('city')}
                                    placeholder="e.g. Athens"
                                    className={`w-full rounded-xl border bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 transition-all duration-150 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.city ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200'}`}
                                />
                                {errors.city && <p className="text-xs text-red-400">City is required</p>}
                            </div>

                            {/* Address */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="address" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    {ti8c('address')}
                                    <span className="ml-0.5 text-indigo-400">*</span>
                                </label>
                                <input
                                    id="address"
                                    value={form.address}
                                    onChange={set('address')}
                                    placeholder="e.g. Ermou 12"
                                    className={`w-full rounded-xl border bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 transition-all duration-150 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.address ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200'}`}
                                />
                                {errors.address && <p className="text-xs text-red-400">Address is required</p>}
                            </div>

                            {/* Street + Floor side by side */}
                            <div className="grid grid-cols-2 gap-3">
                                <Field
                                    label={ti8c('addressstreet')}
                                    id="address_street"
                                    value={form.address_street}
                                    onChange={set('address_street')}
                                    placeholder="e.g. Syntagma Sq."
                                />
                                <Field label={ti8c('floor')} id="floor" value={form.floor} onChange={set('floor')} placeholder="e.g. 3rd" />
                            </div>

                            <Field
                                label={ti8c('comments')}
                                id="comments"
                                value={form.comments}
                                onChange={set('comments')}
                                placeholder="Delivery notes, gate code, landmark…"
                                textarea
                            />
                        </div>

                        {/* Form footer */}
                        <div className="flex gap-2 px-5 pb-5">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setForm(initialForm);
                                    setErrors({});
                                }}
                                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50"
                            >
                                {ti8c('close')}
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 rounded-xl bg-indigo-500 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all duration-150 hover:bg-indigo-600 active:scale-[0.98]"
                            >
                                {constTrans(transes, 'saveaddress')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setOpen(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-indigo-200 py-3 text-sm font-semibold text-indigo-400 transition-all duration-150 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        {constTrans(transes, 'newaddress')}
                    </button>
                )}
            </div>
        </div>
    );
}
