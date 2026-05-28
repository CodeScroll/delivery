const DAY_NAMES = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'];

function fmt(time) {
    if (!time) return null;
    const [h, m] = time.split(':');
    const hr = parseInt(h);
    return `${String(hr).padStart(2, '0')}:${m}`;
}

export default function WorkingHours({ schedule, selectedDay, onSelectDay, selectedTime, onSelectTime }) {
    return (
        <div className="w-full divide-y rounded-xl border border-gray-200 bg-white">
            {schedule.map((day) => {
                const isSelected = selectedDay === day.day_of_week;
                return (
                    <div key={day.day_of_week} className="w-full">
                        {/* Day button */}
                        <button
                            onClick={() => onSelectDay(isSelected ? null : day.day_of_week)}
                            className={`flex w-full items-center justify-between px-4 py-4 text-left transition-colors ${
                                isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex flex-col">
                                <span className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                                    {DAY_NAMES[day.day_of_week]}
                                </span>
                                {day.slots.length === 0 ? (
                                    <span className="text-xs text-gray-400">Κλειστά</span>
                                ) : (
                                    <span className="text-xs text-gray-500">
                                        {fmt(day.slots[0].opens_at)} - {fmt(day.slots[0].closes_at)}
                                        {day.slots.length > 1 ? ` +${day.slots.length - 1}` : ''}
                                    </span>
                                )}
                            </div>
                            <span className={`text-sm transition-transform ${isSelected ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}>⌄</span>
                        </button>

                        {/* Time slot checkboxes */}
                        {isSelected && (
                            <div className="px-4 pb-4">
                                {day.slots.length === 0 ? (
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">Κλειστά</span>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        {day.slots.map((slot, i) => {
                                            const slotKey = `${day.day_of_week}-${slot.opens_at}-${slot.closes_at}`;
                                            const isChecked = selectedTime === slotKey;
                                            return (
                                                <label
                                                    key={i}
                                                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${
                                                        isChecked ? 'border-blue-300 bg-blue-50' : 'border-transparent bg-gray-50 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => onSelectTime(isChecked ? null : slotKey)}
                                                        className="h-4 w-4 rounded accent-blue-600"
                                                    />
                                                    <span className="text-sm font-medium text-green-700">{fmt(slot.opens_at)}</span>
                                                    <span className="text-xs text-gray-400">–</span>
                                                    <span className="text-sm font-medium text-red-700">{fmt(slot.closes_at)}</span>
                                                </label>
                                            );
                                        })}
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
