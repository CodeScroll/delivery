import { formatCurrency } from '../../utils/basketHelpers';

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.99;
const TAX_RATE = 0.08;

export default function BasketSummary() {
    const { total, items, clearBasket, closeBasket } = useBasket();

    if (items.length === 0) return null;

    const shipping = total >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const tax = total * TAX_RATE;
    const grandTotal = total + shipping + tax;
    const toFreeShipping = SHIPPING_THRESHOLD - total;

    return (
        <div className="space-y-3 pt-4">
            {/* Free shipping progress */}
            {shipping > 0 && (
                <div className="rounded-xl bg-stone-800 p-3">
                    <p className="mb-2 text-xs text-stone-400">
                        Add <span className="font-semibold text-amber-400">{formatCurrency(toFreeShipping)}</span> more for free shipping
                    </p>
                    <div className="h-1.5 overflow-hidden rounded-full bg-stone-700">
                        <div
                            className="h-full rounded-full bg-amber-400 transition-all duration-500"
                            style={{ width: `${Math.min((total / SHIPPING_THRESHOLD) * 100, 100)}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Line items */}
            <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-400">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                    <span>Shipping</span>
                    <span className="font-mono">{shipping === 0 ? <span className="text-emerald-400">Free</span> : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                    <span>Tax (8%)</span>
                    <span className="font-mono">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-stone-700 pt-2 text-base font-bold text-stone-100">
                    <span>Total</span>
                    <span className="font-mono text-amber-400">{formatCurrency(grandTotal)}</span>
                </div>
            </div>

            {/* Actions */}
            <button
                onClick={closeBasket}
                className="w-full rounded-xl bg-amber-500 py-3 text-sm font-bold uppercase tracking-wide text-stone-900 transition-colors hover:bg-amber-400"
            >
                Checkout →
            </button>
            <button onClick={clearBasket} className="w-full py-2 text-xs text-stone-500 transition-colors hover:text-red-400">
                Clear basket
            </button>
        </div>
    );
}
