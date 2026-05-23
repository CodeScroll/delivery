import { addItem, calcItemCount, calcTotal, removeItem, updateQuantity as updateQty } from '@/Utils/basketHelpers';
import { createContext, useCallback, useContext, useState } from 'react';

const BasketContext = createContext();

export function BasketProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addToBasket = useCallback((product) => {
        setItems((prev) => addItem(prev, product));
        setIsOpen(true);
    }, []);

    const removeFromBasket = useCallback((id) => {
        setItems((prev) => removeItem(prev, id));
    }, []);

    const updateQuantity = useCallback((id, quantity) => {
        setItems((prev) => updateQty(prev, id, quantity));
    }, []);

    const clearBasket = useCallback(() => setItems([]), []);

    const openBasket = useCallback(() => setIsOpen(true), []);
    const closeBasket = useCallback(() => setIsOpen(false), []);
    const toggleBasket = useCallback(() => setIsOpen((v) => !v), []);

    const total = calcTotal(items);
    const itemCount = calcItemCount(items);

    return (
        <BasketContext.Provider
            value={{
                items,
                addToBasket,
                removeFromBasket,
                updateQuantity,
                clearBasket,
                total,
                itemCount,
                isOpen,
                openBasket,
                closeBasket,
                toggleBasket,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
}

export function useBasket() {
    return useContext(BasketContext);
}
