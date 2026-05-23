import { formatCurrency } from '@/Utils/basketHelpers';

export default function BasketItem({ item }) {
    const { removeFromBasket, updateQuantity } = useBasket();

    return (
        <div className="group flex items-center gap-4 border-b border-stone-800 py-4">
            {/* Thumbnail */}
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-stone-800">
                {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl text-stone-500">{item.emoji || '🛍'}</div>
                )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-stone-100">{item.name}</p>
                <p className="mt-0.5 font-mono text-xs text-amber-400">{formatCurrency(item.price)} each</p>

                {/* Quantity stepper */}
                <div className="mt-2 flex items-center gap-2">
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-700 text-xs font-bold text-stone-100 transition-colors hover:bg-amber-500"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="w-5 text-center font-mono text-sm text-stone-200">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-700 text-xs font-bold text-stone-100 transition-colors hover:bg-amber-500"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Line total + remove */}
            <div className="flex flex-shrink-0 flex-col items-end gap-2">
                <span className="font-mono text-sm font-bold text-stone-100">{formatCurrency(item.price * item.quantity)}</span>
                <button
                    onClick={() => removeFromBasket(item.id)}
                    className="text-xs text-stone-600 opacity-0 transition-colors hover:text-red-400 group-hover:opacity-100"
                    aria-label={`Remove ${item.name}`}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
