import { constTrans } from '@/api';
import { useBasket } from '@/Providers/BasketProvider';
import { formatCurrency } from '../../utils/basketHelpers';

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.99;
const TAX_RATE = 0.08;

export default function BasketSummary({ isCheckoutpage = false }) {
    const { total, estimatedTotal, items, clearBasket, closeBasket } = useBasket();

    if (items.length === 0) return null;

    const shipping = total >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const tax = total * TAX_RATE;
    const grandTotal = total + shipping + tax;

    const transes = {
        el: {
            clearbasket: 'Καθαρισμός καλαθιού',
        },
    };

    return (
        <div className="space-y-3 pt-4">
            <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-400">
                    <span>{ti8c('total')}</span>
                    <span className="font-mono">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                    <span>{ti8c('estimatedtotal')}</span>
                    <span className="font-mono">~ {formatCurrency(estimatedTotal)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                    <span>{ti8c('shipping')}</span>
                    <span className="font-mono">{shipping === 0 ? <span className="text-emerald-400">Free</span> : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-stone-700 pt-2 text-base font-bold">
                    <span>{ti8c('total')}</span>
                    <span className="font-mono text-amber-400 text-xl">{formatCurrency(grandTotal)}</span>
                </div>
            </div>

            {!isCheckoutpage && (
                <>
                    <button
                        onClick={closeBasket}
                        className="w-full rounded-xl bg-amber-500 py-3 text-sm font-bold uppercase tracking-wide text-stone-900 transition-colors hover:bg-amber-400"
                    >
                        {ti8c('checkout')} →
                    </button>
                </>
            )}

            <button onClick={clearBasket} className="w-full py-2 text-xs text-stone-500 transition-colors hover:text-red-400">
                {constTrans(transes, 'clearbasket')}
            </button>
        </div>
    );
}
