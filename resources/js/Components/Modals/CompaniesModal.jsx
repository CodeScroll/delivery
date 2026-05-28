import { fetchSource } from '@/api';
import { useEffect, useState } from 'react';
import CompanyCard from '../CompanyCard';
import LoadMoreButton from '../LoadMoreButton';
import Modal from '../Modal';

export default function CompaniesModal({ selectedCity = null, companySelectModal, setCompanySelectModal, onClick }) {
    const [companiesList, setCompaniesList] = useState([]);
    const [indexPage, setIndexPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getCompanies = async () => {
        let url = '/api/companies';
        const params = new URLSearchParams();

        if (selectedCity) {
            params.append('cityid', selectedCity.id);
        }

        params.append('page', indexPage);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        try {
            const data = await fetchSource(url);
            if (data?.data?.length > 0) {
                if (indexPage == 1) {
                    setCompaniesList(data.data);
                } else {
                    setCompaniesList((prev) => [...prev, ...data.data]);
                }

                setIndexPage((prev) => prev + 1);
            } else {
                console.log('Empty or missing data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoadMoreCompanies = () => {
        getCompanies();
    };

    useEffect(() => {
        getCompanies();
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
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                    {companiesList.length > 0 ? (
                        companiesList.map((company) => <CompanyCard key={company.id} company={company} onClick={onClick} />)
                    ) : (
                        <p>{ti8a(['not_founds', 'companies'])}</p>
                    )}
                </div>

                <div className="space-y-4 p-4">
                    <LoadMoreButton onClick={handleLoadMoreCompanies} loading={loading} />
                </div>
            </Modal>
        </>
    );
}
