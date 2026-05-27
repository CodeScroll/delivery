import { constTrans } from '@/api';
import { useBasket } from '@/Providers/BasketProvider';
import BasketSummary from './BasketSummary';
import CheckoutCompanyItems from './CheckoutCompanyItems';

export default function CheckoutBasket() {
    const { items, updateQuantity, removeFromBasket } = useBasket();

    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const estimatedSubtotal = items.reduce((s, i) => s + (i.estimated_price || i.price) * i.quantity, 0);
    const itemCount = items.reduce((s, i) => s + i.quantity, 0);

    function handleRemove(id) {
        removeFromBasket(id);
    }

    function handleQtyChange(id, newQty) {
        if (newQty < 1) return;
        updateQuantity(id, newQty);
    }

    const transes = {
        el: {
            basket: 'Καλάθι',
            continueshopping: 'Συνέχεια αγορών',
            basketempty: '  Το καλάθι σας είναι άδειο.',
        },
    };

    return (
        <>
            <aside className={`flex h-full w-full translate-x-0 flex-col transition-transform duration-300 ease-in-out`} aria-label="Shopping basket">
                <div className="flex items-center justify-between border-b border-stone-800 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h11M7 13L5.4 5M17 17a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
                            />
                        </svg>
                        <h2 className="text-lg font-bold tracking-tight">{constTrans(transes, 'basket')}</h2>
                        {itemCount > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-stone-900">
                                {itemCount}
                            </span>
                        )}
                    </div>
                </div>

                <div className="my-4 flex-1 overflow-y-auto px-6">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-4 pb-16 text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-800 text-4xl">🛍️</div>
                            <p className="text-sm text-stone-400">{constTrans(transes, 'basketempty')}</p>
                        </div>
                    ) : (
                        <div>
                            {Object.entries(
                                items.reduce((acc, item) => {
                                    if (!acc[item.company_id]) {
                                        acc[item.company_id] = [];
                                    }

                                    acc[item.company_id].push(item);
                                    return acc;
                                }, {}),
                            ).map(([companyId, companyItems], groupIndex) => (
                                <div key={companyId} className="mb-4">
                                    <CheckoutCompanyItems companyId={companyId} companyItems={companyItems} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-stone-800 px-6 pb-6 pt-2">
                        <BasketSummary isCheckoutpage={true} />
                    </div>
                )}
            </aside>
        </>
    );
}
