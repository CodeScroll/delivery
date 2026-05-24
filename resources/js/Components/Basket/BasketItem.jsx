import { useBasket } from '@/Providers/BasketProvider';

const fmt = (n) => `€${n.toFixed(2)}`;

export default function BasketItem({ item }) {
    const { removeFromBasket, updateQuantity } = useBasket();

    function onRemove(id) {
        removeFromBasket(id);
    }

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
                    {item.estimated_price && (
                        <div className="flex flex-col">
                            <span>~ {fmt(item.estimated_price * item.quantity)}</span>
                        </div>
                    )}
                    {item.price && (
                        <div className="flex flex-col">
                            <span>{fmt(item.price * item.quantity)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

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
