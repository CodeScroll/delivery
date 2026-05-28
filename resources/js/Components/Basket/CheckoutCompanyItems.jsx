import { fetchSource } from '@/api';
import { useEffect, useState } from 'react';
import WorkingHours from '../Company/WorkingHours';
import BasketItem from './BasketItem';

export default function CheckoutCompanyItems({ companyId, companyItems }) {
    const [company, setCompany] = useState(null);
    const [workingHours, setWorkingHours] = useState([]);

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
                        <div className="mb-3 text-sm font-semibold text-gray-600">
                            {ti8c('company')}: {company.name}
                        </div>
                    </>
                )}

                {companyItems.map((item) => (
                    <BasketItem key={item.id} item={item} />
                ))}

                {workingHours.length > 0 && (
                    <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
                        <p className="mb-3 text-sm font-medium text-gray-500">{ti8c('workinghours')}</p>
                        <WorkingHours schedule={workingHours} />
                    </div>
                )}
            </div>
        </>
    );
}
