import { constTrans } from '@/api';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';

export default function DatePickerCard({ setDaySelected }) {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [value, setValue] = useState(dayjs().tz('Europe/Athens'));

    const handleDayToday = () => {
        const today = dayjs().tz('Europe/Athens');
        setValue(today);
        setDaySelected(today.format('YYYY-MM-DD'));
    };

    const handleDateChange = (newValue) => {
        setValue(newValue);
        const mysqlDateTime = newValue?.tz('Europe/Athens').format('YYYY-MM-DD');
        setDaySelected(mysqlDateTime);
    };

    const transes = {
        el: {
            chooseday: 'Επιλογή ημέρας',
            selectdate: 'Επιλέξτε ημερομηνία',
        },
    };

    return (
        <div className="mx-auto max-w-sm space-y-4 rounded-2xl bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">{constTrans(transes, 'chooseday')}</h2>
                <button onClick={handleDayToday} className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white transition hover:bg-blue-600">
                    {ti8c('today')}
                </button>
            </div>

            <div className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={constTrans(transes, 'selectdate')}
                        value={value}
                        format="DD/MM/YYYY"
                        onChange={handleDateChange}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                className: 'bg-white rounded-xl',
                            },
                        }}
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
}
