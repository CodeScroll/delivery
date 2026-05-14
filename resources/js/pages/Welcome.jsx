import { constTrans } from '@/api';
import { useState } from 'react';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];

export default function Welcome() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchValue, setSearchValue] = useState('');
    const [selectedCity, setSelectedCity] = useState('Δράμα');

    function categorySelecting(category) {
        setActiveCategory(category);
        console.log('Category selected:', category);
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

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <div>
                    <span  style={styles.textLabel}>{ti8c('city')}:</span>
                    <span className="ml-1 font-semibold">{selectedCity}</span>
                </div>
                <h1 style={styles.title}>
                    {constTrans(transes, 'setnextdel')}
                    <br />
                    {ti8c('delivery')}
                </h1>
            </div>
            <div style={styles.categorySection}>
                <p style={styles.textLabel}>{constTrans(transes, 'bycategory')}</p>
                <div style={styles.categoryList} role="list">
                    {CATEGORIES.map((cat, i) => {
                        const isActive = activeCategory === cat;
                        return (
                            <span key={cat} style={styles.categoryItem} role="listitem">
                                <button
                                    onClick={() => categorySelecting(cat)}
                                    style={{
                                        ...styles.categoryText,
                                        ...(isActive ? styles.categoryTextActive : {}),
                                    }}
                                    aria-pressed={isActive}
                                >
                                    {cat}
                                </button>
                                {i < CATEGORIES.length - 1 && <span style={styles.divider} aria-hidden="true" />}
                            </span>
                        );
                    })}
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
    categoryItem: {
        display: 'flex',
        alignItems: 'center',
    },
    categoryText: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 13,
        fontFamily: "'Courier New', monospace",
        letterSpacing: '0.05em',
        color: '#9a8c7e',
        padding: '2px 12px',
        transition: 'color 0.15s',
    },
    categoryTextActive: {
        color: '#1a1510',
        fontWeight: 700,
    },
    divider: {
        display: 'inline-block',
        width: 1,
        height: 13,
        background: '#c8bfb5',
        flexShrink: 0,
    },
};
