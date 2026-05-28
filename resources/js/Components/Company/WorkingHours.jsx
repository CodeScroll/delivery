import { useState } from 'react';

const DAY_NAMES = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'];

function fmt(time) {
    if (!time) return null;

    const [h, m] = time.split(':');
    const hr = parseInt(h);

    return `${String(hr).padStart(2, '0')}:${m}`;
}

export default function WorkingHours({ schedule }) {
    const [openDay, setOpenDay] = useState(null);

    const toggleDay = (day) => {
        setOpenDay(openDay === day ? null : day);
    };

    return (
        <div className="w-full divide-y rounded-xl border border-gray-200 bg-white">
            {schedule.map((day) => {
                const isOpen = openDay === day.day_of_week;

                return (
                    <div key={day.day_of_week} className="w-full">
                        {/* Header */}
                        <button
                            onClick={() => toggleDay(day.day_of_week)}
                            className="flex w-full items-center justify-between px-4 py-4 text-left hover:bg-gray-50"
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">{DAY_NAMES[day.day_of_week]}</span>

                                {/* preview */}
                                {day.slots.length === 0 ? (
                                    <span className="text-xs text-gray-400">{ti8c('closed')}</span>
                                ) : (
                                    <span className="text-xs text-gray-500">
                                        {fmt(day.slots[0].opens_at)} - {fmt(day.slots[0].closes_at)}
                                        {day.slots.length > 1 ? ' +' + ti8c('hours') : ''}
                                    </span>
                                )}
                            </div>

                            <span className={`text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}>⌄</span>
                        </button>

                        {/* Content */}
                        {isOpen && (
                            <div className="px-4 pb-4">
                                {day.slots.length === 0 ? (
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">Κλειστά</span>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        {day.slots.map((slot, i) => (
                                            <div key={i} className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                                                <span className="text-sm font-medium text-green-700">
                                                    {ti8c('opensat')}: {fmt(slot.opens_at)}
                                                </span>

                                                <span className="text-sm font-medium text-red-700">
                                                    {ti8c('closesat')}: {fmt(slot.closes_at)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
