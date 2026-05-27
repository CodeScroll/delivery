import BasketItem from './BasketItem';

export default function CheckoutCompanyItems({ companyId, companyItems }) {
    return (
        <>
            <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-md ring-1 ring-gray-200">
                <div className="mb-3 text-sm font-semibold text-gray-600">
                    {ti8c('company')}: {companyItems[0]?.company_name ?? `#${companyId}`}
                </div>

                {companyItems.map((item) => (
                    <BasketItem key={item.id} item={item} />
                ))}
            </div>
        </>
    );
}
