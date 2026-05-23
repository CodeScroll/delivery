/**
 * Calculate the total price of all items in the basket.
 * @param {Array} items
 * @returns {number}
 */
export function calcTotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Calculate total item count (sum of quantities).
 * @param {Array} items
 * @returns {number}
 */
export function calcItemCount(items) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Format a number as a currency string.
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

/**
 * Add a product to the basket items array, incrementing quantity if it already exists.
 * @param {Array} items
 * @param {Object} product  – must have at least { id, name, price, image? }
 * @returns {Array} new items array
 */
export function addItem(items, product) {
    const existing = items.find((i) => i.id === product.id);
    if (existing) {
        return items.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    }
    return [...items, { ...product, quantity: 1 }];
}

/**
 * Remove an item completely from the basket.
 * @param {Array} items
 * @param {string|number} id
 * @returns {Array}
 */
export function removeItem(items, id) {
    return items.filter((i) => i.id !== id);
}

/**
 * Change an item's quantity. Removes the item if quantity reaches 0.
 * @param {Array} items
 * @param {string|number} id
 * @param {number} quantity
 * @returns {Array}
 */
export function updateQuantity(items, id, quantity) {
    if (quantity <= 0) return removeItem(items, id);
    return items.map((i) => (i.id === id ? { ...i, quantity } : i));
}
