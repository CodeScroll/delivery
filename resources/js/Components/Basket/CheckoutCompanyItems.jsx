import { fetchSource } from '@/api';
import { useEffect, useState } from 'react';
import WorkingHours from '../Company/WorkingHours';
import CompanyCard from '../CompanyCard';
import BasketItem from './BasketItem';

export default function CheckoutCompanyItems({ companyId, companyItems }) {
    const [company, setCompany] = useState(null);
    const [workingHours, setWorkingHours] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const basicDivClass = 'my-4 rounded-xl border p-4 shadow-sm';

    useEffect(() => {
        const params = new URLSearchParams({
            id: companyId,
            workinghours: 1,
        });

        fetchSource(`/api/companies?${params.toString()}`)
            .then((data) => {
                console.log(data);
                if (data.company && Object.keys(data.company).length > 0) {
                    setCompany(data.company);

                    if (data.workinghours && Array.isArray(data.workinghours) && data.workinghours.length > 0) {
                        setWorkingHours(data.workinghours);
                    }
                }
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-md ring-1 ring-gray-200">
                {company && (
                    <>
                        <CompanyCard company={company} onClick={() => {}} />
                    </>
                )}

                <div className={basicDivClass}>
                    <div className="mb-3 text-sm font-medium text-gray-500">{ti8c('products')}</div>
                    {companyItems.map((item, index) => (
                        <BasketItem key={`${item.id}-${index}`} item={item} />
                    ))}
                </div>

                {workingHours.length > 0 && (
                    <div className={basicDivClass}>
                        <p className="mb-3 text-sm font-medium text-gray-500">{ti8c('workinghours')}</p>
                        <WorkingHours
                            schedule={workingHours}
                            selectedDay={selectedDay}
                            onSelectDay={setSelectedDay}
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                        />
                    </div>
                )}

                {company && (
                    <>
                        <div className="my-4">
                            {ti8c('company')} {company.name}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
