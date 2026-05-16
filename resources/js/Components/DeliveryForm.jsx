import { constTrans, fetchSource } from '@/api';
import { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import CitiesList from './CitiesList';
import Modal from './Modal';

export default function DeliveryForm({ targetCity = null }) {
    const [activeCategory, setActiveCategory] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [targetCityName, setTargetCityName] = useState(targetCity ? targetCity.name : null);
    const [targetCityId, setTargetCityId] = useState(targetCity ? targetCity.id : null);
    const [selectCityModal, setSelectCityModal] = useState(false);

    const selectingCity = () => {
        setSelectCityModal(true);
    };

    const clearSelectedCategory = () => {
        setActiveCategory(0);
        setSelectedCategory(null);
    };

    function categorySelecting(category) {
        if (activeCategory == category.id) {
            setActiveCategory(0);
            setSelectedCategory(null);
        } else {
            setActiveCategory(category.id);
            setSelectedCategory(category);
        }
    }

    function searchingProduct(value) {
        console.log('Searching for:', value);
    }

    function handleSearchChange(e) {
        const val = e.target.value;
        setSearchValue(val);
        searchingProduct(val);
    }

    const transes = {
        el: {
            setnextdel: 'Προγραμματίστε την επόμενη σας',
            bycategory: 'ανα κατηγορία',
        },
    };

    useEffect(() => {
        fetchSource('/api/categories')
            .then((data) => {
                setCategoriesList(data);
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <div style={styles.wrapper}>
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
                <div style={styles.categorySection}>
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
                        <input
                            type="text"
                            placeholder="Search products…"
                            value={searchValue}
                            onChange={handleSearchChange}
                            style={styles.input}
                            aria-label="Search products"
                        />
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
            </div>
            {targetCityId && (
                <Modal
                    show={selectCityModal}
                    onClose={() => {
                        setSelectCityModal(false);
                    }}
                    maxWidth="7xl"
                >
                    <CitiesList targetCityId={targetCityId} />
                </Modal>
            )}
        </>
    );
}

const styles = {
    wrapper: {
        fontFamily: "'Georgia', serif",
        maxWidth: 640,
        margin: '0 auto',
        padding: '3rem 1.5rem 2rem',
        boxSizing: 'border-box',
    },
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
    input: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        outline: 'none',
        fontSize: 16,
        color: '#1a1510',
        padding: '14px 0',
        fontFamily: 'inherit',
        caretColor: '#c47f3a',
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
    categorySection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
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
