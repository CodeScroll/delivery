import { constTrans, fetchProducts, fetchSource } from '@/api';
import { useBasket } from '@/Providers/BasketProvider';
import { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import CitiesList from './CitiesList';
import CompanyCard from './CompanyCard';
import LoadMoreProductsButton from './LoadMoreProductsButton';
import Modal from './Modal';
import CompaniesModal from './Modals/CompaniesModal';
import ProductCard from './ProductCard';

export default function DeliveryForm({ defaultCity = null }) {
    const { addToBasket } = useBasket();
    const [activeCategory, setActiveCategory] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchingProductLoader, setSearchingProductLoader] = useState(false);
    const [targetCity, setTargetCity] = useState(defaultCity);
    const [targetCityName, setTargetCityName] = useState(defaultCity ? defaultCity.name : null);
    const [targetCityId, setTargetCityId] = useState(defaultCity ? defaultCity.id : null);
    const [selectCityModal, setSelectCityModal] = useState(false);
    const [companySelectModal, setCompanySelectModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [foundProducts, setFoundProducts] = useState([]);
    const [foundProductsPage, setFoundProductsPage] = useState(1);
    const [productsLoadMore, setProductsLoadMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSelectProduct = (product) => {
        addToBasket({
            ...product,
            quantity: 1,
        });
    };

    const selectingCity = () => {
        setSelectCityModal(true);
    };

    const resetFoundedProducts = () => {
        setFoundProducts([]);
        setFoundProductsPage(1);
        setProductsLoadMore(false);
    };

    const clearSelectedCategory = () => {
        setActiveCategory(0);
        setSelectedCategory(null);
        resetFoundedProducts();
    };

    function categorySelecting(category) {
        if (activeCategory == category.id) {
            setActiveCategory(0);
            setSelectedCategory(null);
        } else {
            setActiveCategory(category.id);
            setSelectedCategory(category);
        }

        resetFoundedProducts();
    }

    function searchingProduct() {
        setSearchingProductLoader(true);

        const params = {
            ...(searchValue != null && { search: searchValue }),
            ...(targetCityId != null && { cityid: targetCityId }),
            ...(selectedCategory?.id != null && { categoryid: selectedCategory.id }),
            ...(selectedCompany?.id != null && { companyid: selectedCompany.id }),
        };

        fetchProducts(params)
            .then((data) => {
                console.log(data);
                if (data.status === true) {
                    if (data.products.length > 0) {
                        setFoundProducts(data.products);
                    }

                    setProductsLoadMore(data.pagination.has_more);
                    setFoundProductsPage(data.pagination.current_page + 1);
                }
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setSearchingProductLoader(false);
            });
    }

    function handleSearchChange(e) {
        const val = e.target.value;
        setSearchValue(val);
    }

    const selectingCompany = (companyItem) => {
        setSelectedCompany(companyItem);
        setCompanySelectModal(false);
        resetFoundedProducts();
    };

    const removeCompany = () => {
        setSelectedCompany(null);
        resetFoundedProducts();
    };

    const handleLoadMoreProduct = () => {};

    const transes = {
        el: {
            setnextdel: 'Προγραμματίστε την επόμενη σας',
            bycategory: 'ανα κατηγορία',
            bycompany: 'ανα εταιρεία',
            selectedcomp: 'επιλεγμένη εταιρεία',
        },
    };

    useEffect(() => {
        fetchSource('/api/categories')
            .then((data) => {
                setCategoriesList(data);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (targetCity) {
            setTargetCityName(targetCity.name);
            setTargetCityId(targetCity.id);
            resetFoundedProducts();
        }
    }, [targetCity]);

    useEffect(() => {
        if (searchValue.length < 2) return;

        const timer = setTimeout(() => {
            searchingProduct();
        }, 800);

        return () => clearTimeout(timer);
    }, [searchValue]);

    useEffect(() => {
        searchingProduct();
    }, [activeCategory, selectedCompany]);

    return (
        <>
            <div className="mx-auto box-border max-w-[1536px] px-6 pb-8 pt-12 font-serif">
                <div style={styles.header}>
                    <div className="flex items-center gap-1">
                        <span style={styles.textLabel}>{ti8c('city')}:</span>

                        <span className="font-semibold">{targetCityName}</span>

                        <FaExchangeAlt className="cursor-pointer text-sm" onClick={selectingCity} />
                    </div>
                    <h1 style={styles.title}>
                        {constTrans(transes, 'setnextdel')}
                        <br />
                        {ti8c('delivery')}
                    </h1>
                </div>
                <div className="mb-6 flex flex-col gap-4">
                    <p style={styles.textLabel}>{constTrans(transes, 'bycategory')}</p>
                    {categoriesList?.length > 0 && (
                        <div style={styles.categoryList} role="list">
                            {categoriesList.map((cat, i) => {
                                const isActive = activeCategory === cat.id;
                                return (
                                    <span key={cat.id} role="listitem" className="flex items-center">
                                        <button
                                            onClick={() => categorySelecting(cat)}
                                            className={`cursor-pointer border-0 bg-transparent px-3 py-[2px] font-mono text-[13px] tracking-wider transition-colors duration-150 hover:text-black ${isActive ? 'font-bold text-[#1a1510]' : 'text-[#9a8c7e]'}`}
                                            aria-pressed={isActive}
                                        >
                                            {cat.name}
                                        </button>

                                        {i < categoriesList.length - 1 && (
                                            <span className="inline-block h-[13px] w-px shrink-0 bg-[#c8bfb5]" aria-hidden="true" />
                                        )}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                    {selectedCategory && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-800">
                            <span>{selectedCategory.name}</span>
                            <button
                                onClick={clearSelectedCategory}
                                className="flex h-4 w-4 items-center justify-center rounded-full text-indigo-500 transition-colors hover:bg-indigo-200 hover:text-indigo-700"
                                aria-label="Clear category"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>
                <div className="mb-4 flex flex-col gap-1">
                    <p style={styles.textLabel}>{constTrans(transes, 'bycompany')}</p>
                    <button
                        onClick={() => setCompanySelectModal(true)}
                        className="w-auto self-start whitespace-nowrap rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800"
                    >
                        {ti8a(['select', 'of.company'])}
                    </button>
                    {companySelectModal && (
                        <CompaniesModal
                            selectedCity={targetCity}
                            companySelectModal={companySelectModal}
                            setCompanySelectModal={setCompanySelectModal}
                            onClick={selectingCompany}
                        />
                    )}
                    <div className="space-y-4 p-4">
                        <h3 className="text-sm font-semibold text-gray-700">{constTrans(transes, 'selectedcomp')}</h3>
                        {selectedCompany && <CompanyCard company={selectedCompany} removable={true} onRemove={removeCompany} />}
                    </div>
                </div>
                <div style={styles.searchRow}>
                    <div style={styles.searchBox}>
                        <svg
                            style={styles.searchIcon}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <div className="relative flex flex-1 items-center">
                            <input
                                type="text"
                                placeholder={ti8a(['search', 'products'])}
                                value={searchValue}
                                onChange={handleSearchChange}
                                disabled={searchingProductLoader}
                                className="font-inherit flex-1 border-0 bg-transparent py-[14px] text-[16px] text-[#1a1510] caret-[#c47f3a] outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Search products"
                            />
                            {searchingProductLoader && (
                                <span className="pointer-events-none absolute right-2 flex items-center">
                                    <svg
                                        className="h-4 w-4 animate-spin text-[#c47f3a]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                </span>
                            )}
                        </div>
                        {searchValue && (
                            <button
                                style={styles.clearBtn}
                                onClick={() => {
                                    setSearchValue('');
                                    searchingProduct('');
                                }}
                                aria-label="Clear search"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {(foundProducts || []).map((product) => (
                        <ProductCard key={product.id} product={product} onSelect={handleSelectProduct} />
                    ))}
                </div>
                {productsLoadMore && (
                    <div className="my-3">
                        <LoadMoreProductsButton onClick={handleLoadMoreProduct} loading={loading} />
                    </div>
                )}
            </div>
            <Modal
                show={selectCityModal}
                onClose={() => {
                    setSelectCityModal(false);
                }}
                maxWidth="7xl"
            >
                <CitiesList setTargetCity={setTargetCity} targetCity={targetCity} />
            </Modal>
        </>
    );
}

const styles = {
    header: {
        marginBottom: '2rem',
    },
    eyebrow: {
        fontSize: 12,
        fontFamily: "'Courier New', monospace",
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#9a8c7e',
        margin: '0 0 0.5rem',
    },
    title: {
        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
        fontWeight: 400,
        lineHeight: 1.15,
        margin: 0,
        color: '#1a1510',
    },
    searchRow: {
        marginBottom: '2.5rem',
        marginTop: '2rem',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: '1.5px solid #c8bfb5',
        borderRadius: 4,
        padding: '0 14px',
        background: '#faf9f7',
        transition: 'border-color 0.15s',
    },
    searchIcon: {
        color: '#9a8c7e',
        flexShrink: 0,
    },
    clearBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 20,
        color: '#9a8c7e',
        lineHeight: 1,
        padding: '0 2px',
        display: 'flex',
        alignItems: 'center',
    },
    textLabel: {
        fontSize: 12,
        fontFamily: "'Courier New', monospace",
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#9a8c7e',
        margin: 0,
    },
    categoryList: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 0,
    },
};
