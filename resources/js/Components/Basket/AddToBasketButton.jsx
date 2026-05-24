import { constTrans } from '@/api';
import { useState } from 'react';
import { useBasket } from '../../Providers/BasketProvider';
/**
 * @param {Object} props
 * @param {Object} props.product  – { id, name, price, image?, emoji? }
 * @param {string} [props.className]
 * @param {string} [props.label]
 */
export default function AddToBasketButton({ product, className = '', label = 'Add to Basket' }) {
    const { addToBasket } = useBasket();
    const [burst, setBurst] = useState(false);

    function handleClick() {
        addToBasket({
            ...product,
            quantity: 1,
        });
        setBurst(true);
        setTimeout(() => setBurst(false), 600);
    }

    const transes = {
        el: {
            addtobasket: 'Προσθήκη στο καλάθι',
            added: 'Προστέθηκε',
        },
    };

    return (
        <button
            onClick={handleClick}
            className={`group relative overflow-hidden rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-all duration-200 hover:bg-amber-400 active:scale-95 ${burst ? 'scale-95' : ''} ${className}`}
        >
            <span className={`inline-flex items-center gap-2 transition-opacity duration-200 ${burst ? 'opacity-0' : 'opacity-100'}`}>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h11M7 13L5.4 5M17 17a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
                    />
                </svg>
                {constTrans(transes, 'addtobasket')}
            </span>

            {burst && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-stone-900">
                    ✓ {constTrans(transes, 'added')}!
                </span>
            )}
        </button>
    );
}
