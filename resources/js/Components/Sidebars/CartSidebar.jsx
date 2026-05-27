import { useBasket } from '@/Providers/BasketProvider';
import { constTrans } from '@/api';
import { router } from '@inertiajs/react';

const fmt = (n) => `€${n.toFixed(2)}`;

function QtyStepper({ quantity, onDecrease, onIncrease }) {
    return (
        <div className="flex items-center overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
            <button
                onClick={onDecrease}
                className="flex h-[26px] w-7 items-center justify-center text-sm font-medium text-stone-400 transition-colors hover:bg-stone-200"
                aria-label="Decrease quantity"
            >
                −
            </button>
            <span className="min-w-[20px] text-center text-xs font-medium tabular-nums text-stone-800">{quantity}</span>
            <button
                onClick={onIncrease}
                className="flex h-[26px] w-7 items-center justify-center text-sm font-medium text-stone-400 transition-colors hover:bg-stone-200"
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    );
}

function CartItem({ item, onRemove, onQtyChange }) {
    return (
        <div className="group flex items-start gap-3 border-b border-stone-100 px-5 py-3.5">
            {/* thumbnail */}
            <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-xl bg-stone-100 text-2xl">
                {item.image ? <img src={item.image} alt={item.name || 'item'} className="h-full w-full rounded-xl object-cover" /> : <span>🛒</span>}
            </div>

            {/* details */}
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-medium leading-tight text-stone-800">{item.name}</p>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="flex-shrink-0 text-sm leading-none text-stone-300 opacity-0 transition-colors hover:text-red-400 group-hover:opacity-100"
                        aria-label={`Remove ${item.name}`}
                    >
                        ✕
                    </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <QtyStepper
                        quantity={item.quantity}
                        onDecrease={() => onQtyChange(item.id, item.quantity - 1)}
                        onIncrease={() => onQtyChange(item.id, item.quantity + 1)}
                    />
                    <span className="text-[13px] font-medium tabular-nums text-stone-800">
                        {item.price ? (
                            <div className="flex flex-col">
                                <span>{fmt(item.price * item.quantity)}</span>
                            </div>
                        ) : item.estimated_price ? (
                            <div className="flex flex-col">
                                <span>~ {fmt(item.estimated_price * item.quantity)}</span>
                            </div>
                        ) : null}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function CartSidebar({ isOpen = true, onClose = () => {} }) {
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
            proceedcheckout: 'Προχωρήστε στο Ταμείο',
            continueshopping: 'Συνέχεια αγορών',
        },
    };

    return (
        <>
            {/* backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            />

            {/* sidebar panel */}
            <aside
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className={`fixed right-0 top-0 z-50 flex h-full w-[360px] max-w-full flex-col bg-[#FAFAF8] shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                aria-label="Shopping cart"
            >
                {/* ── header ── */}
                <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
                    <div className="flex items-center gap-2.5">
                        <span style={{ fontFamily: "'DM Serif Display', serif" }} className="text-xl tracking-tight text-stone-800">
                            {ti8c('cart')}
                        </span>
                        {itemCount > 0 && (
                            <span className="rounded-full bg-[#B85C30] px-2 py-0.5 text-[11px] font-medium leading-relaxed text-white">
                                {itemCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-base text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-700"
                        aria-label="Close cart"
                    >
                        ✕
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 pb-16 text-center">
                        <span className="text-4xl">🛍️</span>
                        <p className="text-sm font-medium text-stone-700">Your cart is empty</p>
                        <p className="text-xs text-stone-400">Add some items to get started</p>
                        <button onClick={onClose} className="mt-2 text-xs text-[#B85C30] hover:underline">
                            {constTrans(transes, 'continueshopping')} → →
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} onRemove={handleRemove} onQtyChange={handleQtyChange} />
                        ))}
                    </div>
                )}

                {items.length > 0 && (
                    <div className="border-t border-stone-200 px-5 pb-5 pt-3">
                        <div className="mb-3 flex items-baseline justify-between border-t border-stone-200 py-2.5">
                            <span style={{ fontFamily: "'DM Serif Display', serif" }} className="text-sm text-stone-800">
                                {ti8c('total')}
                            </span>
                            <span className="text-[15px] font-medium tabular-nums text-stone-800">{Number.isNaN(total) ? '—' : fmt(total)}</span>
                        </div>

                        <div className="mb-3 flex items-baseline justify-between border-t border-stone-200 py-2.5">
                            <span style={{ fontFamily: "'DM Serif Display', serif" }} className="text-sm text-stone-800">
                                {ti8c('estimatedtotal')}
                            </span>
                            <span className="text-[15px] font-medium tabular-nums text-stone-800">
                                {Number.isNaN(estimatedSubtotal) ? '—' : fmt(estimatedSubtotal)}
                            </span>
                        </div>

                        <button
                            onClick={() => {
                                onClose();
                                router.visit('/checkout');
                            }}
                            className="h-11 w-full rounded-xl bg-stone-900 text-[13px] font-medium tracking-wide text-[#FAFAF8] transition-colors hover:bg-stone-700"
                        >
                            {constTrans(transes, 'proceedcheckout')} →
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}
