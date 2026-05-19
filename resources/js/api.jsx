export const constTrans = (transArray, key, locale = 'el') => {
    return transArray[locale]?.[key];
};

export async function fetchSource(url, options = {}) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        return await response.text();
    } catch (error) {
        console.error('fetchSource error:', error);
        throw error;
    }
}

export async function fetchProducts(params = {}) {
    let url = `/api/products`;

    const queryString = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    if (queryString) url += `?${queryString}`;

    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
}

export function handleAjaxError(error) {
    console.error('handleAjaxError', error);
}
