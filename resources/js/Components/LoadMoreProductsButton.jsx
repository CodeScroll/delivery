export default function LoadMoreProductsButton({ onClick, loading = false }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`flex items-center gap-2 rounded-full bg-green-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-green-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 active:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60`}
        >
            {loading ? (
                <>
                    <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    {ti8c('loading')}
                </>
            ) : (
                <>
                    <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    {ti8c('loadmore')}
                </>
            )}
        </button>
    );
}
