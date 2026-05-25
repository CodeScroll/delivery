import React, { useEffect, useState } from "react";
import { constTrans } from "@/api";

export default function GoogleLoginButton({ redirectto = null }) {
    const transes = {
        el: {
            continuewith: "Συνέχεια με",
        },
    };

    const googleUrl = "/auth/google";
    const [url, setUrl] = useState(googleUrl);

    const handleGoogleLogin = () => {
        window.location.href = url;
    };

    useEffect(() => {
        if (redirectto) {
            setUrl(googleUrl + "?redirectto=" + encodeURIComponent(redirectto));
        }
    }, []);

    return (
        <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm 
             transition-all duration-200 
             hover:bg-gray-800 hover:text-white hover:border-gray-800
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            {/* Google Icon (SVG) */}
            <svg
                className="h-5 w-5 transition-colors duration-200"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6 1.54 7.38 2.84l5.4-5.4C33.64 3.64 29.3 1.5 24 1.5 14.82 1.5 7.09 6.98 3.9 14.76l6.9 5.36C12.16 14.14 17.56 9.5 24 9.5z"
                />
                <path
                    fill="#4285F4"
                    d="M46.5 24.5c0-1.57-.14-3.08-.41-4.5H24v9h12.7c-.55 2.9-2.23 5.36-4.76 7.02l7.45 5.78C43.9 37.98 46.5 31.73 46.5 24.5z"
                />
                <path
                    fill="#FBBC05"
                    d="M10.8 28.62A14.5 14.5 0 0 1 9.5 24c0-1.6.28-3.15.8-4.62l-6.9-5.36A22.43 22.43 0 0 0 1.5 24c0 3.64.87 7.07 2.4 10.08l6.9-5.46z"
                />
                <path
                    fill="#34A853"
                    d="M24 46.5c6.3 0 11.6-2.08 15.47-5.66l-7.45-5.78C30.16 36.68 27.33 37.5 24 37.5c-6.44 0-11.84-4.64-13.2-10.88l-6.9 5.46C7.09 41.02 14.82 46.5 24 46.5z"
                />
                <path fill="none" d="M1.5 1.5h45v45h-45z" />
            </svg>

            <span>{constTrans(transes, "continuewith")} Google</span>
        </button>
    );
}
