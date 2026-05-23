export default function GuestHeader({ onCartClick, logo = 'MyShop' }) {
    return (
        <header className="w-full border-b bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold text-gray-800">{logo}</h1>
                </div>

                <nav>
                    <ul className="flex items-center gap-6">
                        <li>
                            <button
                                type="button"
                                onClick={onCartClick}
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
                            >
                                Cart
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
