import { BsGeoAlt, BsX } from 'react-icons/bs';

export default function CompanyCard({ company, theme = 'light', onClick, removable = false, onRemove = null }) {
    const isDark = theme === 'dark';

    const textColor = isDark ? 'text-gray-200' : 'text-gray-700';
    const iconColor = isDark ? 'text-gray-400' : 'text-gray-500';
    const titleColor = isDark ? 'text-white' : 'text-gray-900';
    const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
    const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

    const logoUrl = company?.logourl ? company.logourl : '/images/default-company.png';

    return (
        <>
            <div
                onClick={() => !removable && onClick && onClick(company)}
                className={`${bgColor} ${borderColor} relative w-full cursor-pointer gap-4 rounded-xl border p-4 shadow-sm transition duration-200 hover:border-gray-400 hover:shadow-xl`}
            >
                {removable && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove && onRemove(company);
                        }}
                        className="absolute right-3 top-3 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Remove"
                    >
                        <BsX size={22} />
                    </button>
                )}

                <div className="flex items-start">
                    <img src={logoUrl} alt={`${company?.name} logo`} className="h-14 w-14 flex-shrink-0 rounded-lg object-cover" />
                    <div className="ms-2 flex flex-col justify-center">
                        <h2 className={`text-lg font-semibold ${titleColor}`}>{company?.name}</h2>
                        <div className={`mt-1 flex items-center gap-2 text-sm ${textColor}`}>
                            <BsGeoAlt size={16} className={iconColor} />
                            <span className="leading-tight">{company?.fulladdress}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
