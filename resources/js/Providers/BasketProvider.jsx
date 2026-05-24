import { addItem, calcItemCount, calcTotal, calcEstimatedTotal, removeItem, updateQuantity as updateQty } from '@/Utils/basketHelpers';
import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const BasketContext = createContext();

export function BasketProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const cookiesAccepted = Cookies.get('cookiesAccepted');

        if (cookiesAccepted === 'true') {
            const savedCart = Cookies.get('cart');

            if (savedCart) {
                setItems(JSON.parse(savedCart));
            } else {
                Cookies.set('cart', JSON.stringify([]), {
                    expires: 1,
                });
            }
        }
    }, []);

    const saveCartCookie = useCallback((updatedItems) => {
        const cookiesAccepted = Cookies.get('cookiesAccepted');

        if (cookiesAccepted === 'true') {
            Cookies.set('cart', JSON.stringify(updatedItems), {
                expires: 1,
            });
        }
    }, []);

    const addToBasket = useCallback(
        (product) => {
            setItems((prev) => {
                const updated = addItem(prev, product);

                saveCartCookie(updated);

                return updated;
            });

            setIsOpen(true);
        },
        [saveCartCookie],
    );

    const removeFromBasket = useCallback(
        (id) => {
            setItems((prev) => {
                const updated = removeItem(prev, id);

                saveCartCookie(updated);

                return updated;
            });
        },
        [saveCartCookie],
    );

    const updateQuantity = useCallback(
        (id, quantity) => {
            setItems((prev) => {
                const updated = updateQty(prev, id, quantity);

                saveCartCookie(updated);

                return updated;
            });
        },
        [saveCartCookie],
    );

    const clearBasket = useCallback(() => {
        setItems([]);

        saveCartCookie([]);
    }, [saveCartCookie]);

    const openBasket = useCallback(() => setIsOpen(true), []);
    const closeBasket = useCallback(() => setIsOpen(false), []);
    const toggleBasket = useCallback(() => setIsOpen((v) => !v), []);

    const total = calcTotal(items);
    const estimatedTotal = calcEstimatedTotal(items);
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
                estimatedTotal,
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
