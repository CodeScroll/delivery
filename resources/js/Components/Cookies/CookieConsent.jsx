import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const COOKIE_KEY = 'cookiesAccepted';

const cookieOptions = {
    expires: 365,
    sameSite: 'lax',
    path: '/',
};

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const storedChoice = Cookies.get(COOKIE_KEY);
        if (storedChoice === undefined || storedChoice === 'false') {
            setVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        Cookies.set(COOKIE_KEY, 'true', cookieOptions);
        setVisible(false);
    };

    const rejectCookies = () => {
        Cookies.set(COOKIE_KEY, 'false', cookieOptions);
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl bg-gray-900 p-4 text-white shadow-lg">
            <p className="text-sm leading-relaxed">We use cookies to improve your experience. You can accept or decline non-essential cookies.</p>
            <div className="mt-4 flex justify-end gap-2">
                <button onClick={rejectCookies} className="rounded-xl border border-white px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                    No
                </button>
                <button onClick={acceptCookies} className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">
                    Yes
                </button>
            </div>
        </div>
    );
}
