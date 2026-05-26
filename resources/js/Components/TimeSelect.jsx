import { constTrans } from '@/api';

export default function TimeSelect({ value, onChange }) {
    const generateTimes = () => {
        const times = [];

        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const h = String(hour).padStart(2, '0');
                const m = String(minute).padStart(2, '0');

                times.push(`${h}:${m}`);
            }
        }

        return times;
    };

    const transes = {
        el: {
            selecttime: 'Επιλογή ώρας',
        },
    };

    return (
        <div className="relative w-full">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
                <option value="">{constTrans(transes, 'selecttime')}</option>

                {generateTimes().map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>

            {/* dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
}
