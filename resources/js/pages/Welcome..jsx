import { useState } from "react";

const CATEGORIES = [
  "All",
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
];

export default function Welcome() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  function categorySelecting(category) {
    setActiveCategory(category);
    console.log("Category selected:", category);
  }

  function searchingProduct(value) {
    console.log("Searching for:", value);
  }

  function handleSearchChange(e) {
    const val = e.target.value;
    setSearchValue(val);
    searchingProduct(val);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Discover</p>
        <h1 style={styles.title}>What are you<br />looking for?</h1>
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
              onClick={() => { setSearchValue(""); searchingProduct(""); }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div style={styles.categorySection}>
        <p style={styles.categoryLabel}>Browse by category</p>
        <div style={styles.categoryList} role="list">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="listitem"
                onClick={() => categorySelecting(cat)}
                style={{
                  ...styles.categoryChip,
                  ...(isActive ? styles.categoryChipActive : {}),
                }}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "'Georgia', serif",
    maxWidth: 640,
    margin: "0 auto",
    padding: "3rem 1.5rem 2rem",
    boxSizing: "border-box",
  },
  header: {
    marginBottom: "2.5rem",
  },
  eyebrow: {
    fontSize: 12,
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#9a8c7e",
    margin: "0 0 0.5rem",
  },
  title: {
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    fontWeight: 400,
    lineHeight: 1.15,
    margin: 0,
    color: "#1a1510",
  },
  searchRow: {
    marginBottom: "2.5rem",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1.5px solid #c8bfb5",
    borderRadius: 4,
    padding: "0 14px",
    background: "#faf9f7",
    transition: "border-color 0.15s",
  },
  searchIcon: {
    color: "#9a8c7e",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: 16,
    color: "#1a1510",
    padding: "14px 0",
    fontFamily: "inherit",
    caretColor: "#c47f3a",
  },
  clearBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 20,
    color: "#9a8c7e",
    lineHeight: 1,
    padding: "0 2px",
    display: "flex",
    alignItems: "center",
  },
  categorySection: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  categoryLabel: {
    fontSize: 12,
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#9a8c7e",
    margin: 0,
  },
  categoryList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  categoryChip: {
    padding: "8px 18px",
    borderRadius: 2,
    border: "1px solid #c8bfb5",
    background: "transparent",
    color: "#4a3f35",
    fontSize: 14,
    fontFamily: "inherit",
    cursor: "pointer",
    letterSpacing: "0.01em",
    transition: "background 0.15s, color 0.15s, border-color 0.15s",
    lineHeight: 1.5,
  },
  categoryChipActive: {
    background: "#1a1510",
    color: "#faf9f7",
    borderColor: "#1a1510",
  },
};
