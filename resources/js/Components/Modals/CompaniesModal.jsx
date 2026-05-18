import { fetchSource } from '@/api';
import { useEffect, useState } from 'react';
import CompanyCard from '../CompanyCard';
import Modal from '../Modal';

export default function CompaniesModal({ selectedCity = null, companySelectModal, setCompanySelectModal }) {
    const [companiesList, setCompaniesList] = useState([]);

    const getCompanies = async () => {
        let url = '/api/companies';

        if (selectedCity) {
            url += `?cityid=${selectedCity.id}`;
        }

        try {
            const data = await fetchSource(url);
            if (data?.data?.length > 0) {
                setCompaniesList(data.data);
            } else {
                console.log('Empty or missing data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCompanies();
        console.log('executeddd');
    }, []);

    return (
        <>
            <Modal
                show={companySelectModal}
                onClose={() => {
                    setCompanySelectModal(false);
                }}
                maxWidth="7xl"
            >
                <div className="space-y-4 p-4">
                    {Array.isArray(companiesList) && companiesList.length > 0 ? (
                        companiesList.map((company) => <CompanyCard key={company.id} company={company} />)
                    ) : (
                        <p>{ti8a(['not_founds', 'companies'])}</p>
                    )}
                </div>
            </Modal>
        </>
    );
}
