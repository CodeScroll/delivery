import BasketItem from './BasketItem';
import BasketSummary from './BasketSummary';

export default function Basket() {
    const { items, isOpen, closeBasket, itemCount } = useBasket();

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={closeBasket}
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            />

            {/* Drawer */}
            <aside
                className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-stone-900 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                aria-label="Shopping basket"
            >
                {/* Header */}
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
                        <h2 className="text-lg font-bold tracking-tight text-stone-100">Your Basket</h2>
                        {itemCount > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-stone-900">
                                {itemCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeBasket}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-800 text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-100"
                        aria-label="Close basket"
                    >
                        ✕
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-4 pb-16 text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-800 text-4xl">🛍️</div>
                            <p className="text-sm text-stone-400">Your basket is empty.</p>
                            <button onClick={closeBasket} className="text-sm text-amber-400 hover:underline">
                                Continue shopping →
                            </button>
                        </div>
                    ) : (
                        <div>
                            {items.map((item) => (
                                <BasketItem key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Summary */}
                {items.length > 0 && (
                    <div className="border-t border-stone-800 px-6 pb-6 pt-2">
                        <BasketSummary />
                    </div>
                )}
            </aside>
        </>
    );
}
