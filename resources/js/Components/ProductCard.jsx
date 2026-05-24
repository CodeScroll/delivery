import { useState } from 'react';
import AddToBasketButton from './Basket/AddToBasketButton';

export default function ProductCard({ product, showSlug = false, onSelect = null, addToBasketBtn = false }) {
    const [hovered, setHovered] = useState(false);

    const { category, name, slug, price, estimated_price } = product;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onSelect ? () => onSelect(product) : null}
            className={`group relative w-72 cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 ease-out ${hovered ? '-translate-y-1 shadow-xl' : ''} `}
        >
            <div className="px-5 pb-0 pt-5">
                <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-600">
                    {category?.name ?? 'Uncategorized'}
                </span>
            </div>

            <div className="px-5 pb-5 pt-3">
                <h2 className="mt-1 text-[17px] font-bold leading-snug tracking-tight text-zinc-900">{name}</h2>
                {showSlug && (
                    <div>
                        <p className="mt-1 truncate font-mono text-[11px] tracking-wide text-zinc-400">/{slug}</p>
                    </div>
                )}

                <div className="my-4 h-px bg-zinc-100" />

                <div className="flex items-end gap-2">
                    {price != null ? (
                        <>
                            <span className="text-2xl font-extrabold leading-none text-zinc-900">${Number(price).toFixed(2)}</span>
                            <span className="mb-0.5 text-xs font-medium text-zinc-400">exact price</span>
                        </>
                    ) : estimated_price != null ? (
                        <>
                            <span className="text-2xl font-extrabold leading-none text-zinc-500">~${Number(estimated_price).toFixed(2)}</span>
                            <span className="mb-0.5 text-xs font-medium text-zinc-400">estimated</span>
                        </>
                    ) : (
                        <span className="text-sm italic text-zinc-400">Price unavailable</span>
                    )}
                </div>
            </div>
            {addToBasketBtn && (
                <div className="px-5 pb-5">
                    <AddToBasketButton product={product} />
                </div>
            )}
            <div className={`absolute bottom-0 left-0 h-[3px] bg-amber-400 transition-all duration-300 ease-out ${hovered ? 'w-full' : 'w-0'} `} />
        </div>
    );
}
