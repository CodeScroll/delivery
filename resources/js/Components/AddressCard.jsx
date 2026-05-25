
export default function AddressCard({ addr, index, onDelete }) {
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