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

export function handleAjaxError (error) {
    console.error('handleAjaxError', error);
};