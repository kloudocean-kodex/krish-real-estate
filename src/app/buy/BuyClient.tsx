"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useQueryString } from "@/lib/useQueryString";
import type { NormalizedListing } from "@/data/listings";
import { PropertyCard } from "@/components/property/PropertyCard";
import styles from "./Buy.module.css";

interface BuyClientProps {
  initialListings: NormalizedListing[];
}

export function BuyClient({ initialListings }: BuyClientProps) {
  const query = new URLSearchParams(useQueryString());
  const [suburbOverride, setSelectedSuburb] = useState<string | null>(null);
  const selectedSuburb = suburbOverride ?? query.get("suburb") ?? "all";
  const [typeOverride, setSelectedType] = useState<string | null>(null);
  const selectedType = typeOverride ?? query.get("type") ?? "all";
  const [selectedBeds, setSelectedBeds] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredListings = useMemo(() => {
    let result = [...initialListings];

    // Filter Suburb
    if (selectedSuburb !== "all") {
      result = result.filter(
        (l) => l.address.suburb.toLowerCase() === selectedSuburb.toLowerCase(),
      );
    }

    if (selectedType !== "all")
      result = result.filter(
        (l) => l.propertyType.toLowerCase() === selectedType.toLowerCase(),
      );

    // Filter Beds
    if (selectedBeds !== "all") {
      const minBeds = parseInt(selectedBeds, 10);
      result = result.filter((l) => l.beds >= minBeds);
    }

    // Sort
    if (selectedSort === "price-desc") {
      result.sort(
        (a, b) =>
          (b.price.to || b.price.from || 0) - (a.price.to || a.price.from || 0),
      );
    } else if (selectedSort === "price-asc") {
      result.sort((a, b) => (a.price.from || 0) - (b.price.from || 0));
    }

    return result;
  }, [
    initialListings,
    selectedSuburb,
    selectedBeds,
    selectedSort,
    selectedType,
  ]);

  const resetFilters = () => {
    setSelectedSuburb("all");
    setSelectedBeds("all");
    setSelectedType("all");
    setSelectedSort("newest");
  };

  const isFiltered =
    selectedSuburb !== "all" ||
    selectedBeds !== "all" ||
    selectedType !== "all";

  return (
    <main className={styles.page}>
      {/* ── Page Masthead ── */}
      <section className={styles.masthead}>
        <div className="container">
          <div className={styles.mastheadContent}>
            <div className={styles.prestigeOverline}>
              <span>◆</span>
              <span>MELBOURNE NORTHERN CORRIDOR</span>
              <span>◆</span>
            </div>
            <h1 className={styles.title}>
              Homes &amp; Land
              <br />
              <span className={styles.titleItalic}>For Sale.</span>
            </h1>
            <p className={styles.subtitle}>
              Distinctive family residences, architectural townhomes, and
              lifestyle acreage across Wollert, Epping, Craigieburn, and
              Donnybrook. Handled with discreet professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
              <div className={styles.filterItem}>
                <label htmlFor="filter-type" className={styles.filterLabel}>
                  Property Type
                </label>
                <select
                  id="filter-type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Types</option>
                  {Array.from(
                    new Set(initialListings.map((l) => l.propertyType)),
                  )
                    .sort()
                    .map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                </select>
              </div>
              {/* Suburb */}
              <div className={styles.filterItem}>
                <label htmlFor="filter-suburb" className={styles.filterLabel}>
                  Suburb
                </label>
                <select
                  id="filter-suburb"
                  value={selectedSuburb}
                  onChange={(e) => setSelectedSuburb(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Suburbs</option>
                  {Array.from(
                    new Set(initialListings.map((l) => l.address.suburb)),
                  )
                    .sort()
                    .map((suburb) => (
                      <option key={suburb} value={suburb.toLowerCase()}>
                        {suburb}
                      </option>
                    ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div className={styles.filterItem}>
                <label htmlFor="filter-beds" className={styles.filterLabel}>
                  Bedrooms
                </label>
                <select
                  id="filter-beds"
                  value={selectedBeds}
                  onChange={(e) => setSelectedBeds(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Any Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>

              {/* Sort */}
              <div className={styles.filterItem}>
                <label htmlFor="filter-sort" className={styles.filterLabel}>
                  Sort Order
                </label>
                <select
                  id="filter-sort"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="newest">Featured / Newest</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                </select>
              </div>

              {isFiltered && (
                <button onClick={resetFilters} className={styles.resetBtn}>
                  Reset Filters ✕
                </button>
              )}
            </div>

            {/* Results Count & View Toggle */}
            <div className={styles.metaGroup}>
              <span className={styles.resultCount}>
                Showing <strong>{filteredListings.length}</strong>{" "}
                {filteredListings.length === 1 ? "Property" : "Properties"}
              </span>

              <div
                className={styles.viewToggle}
                role="group"
                aria-label="View layout"
              >
                <button
                  type="button"
                  aria-pressed={viewMode === "grid"}
                  className={`${styles.toggleBtn} ${viewMode === "grid" ? styles.toggleBtnActive : ""}`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid layout"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button
                  type="button"
                  aria-pressed={viewMode === "list"}
                  className={`${styles.toggleBtn} ${viewMode === "list" ? styles.toggleBtnActive : ""}`}
                  onClick={() => setViewMode("list")}
                  aria-label="List layout"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Listings Display ── */}
      <section className={styles.resultsSection}>
        <div className="container">
          {filteredListings.length > 0 ? (
            <div className={viewMode === "grid" ? styles.grid : styles.list}>
              {filteredListings.map((listing, index) => (
                <PropertyCard
                  key={listing.listingId}
                  listing={listing}
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p className={styles.noResultsTitle}>
                No properties match your current criteria.
              </p>
              <p className={styles.noResultsText}>
                Try loosening your filters, or speak with our acquisitions team
                regarding confidential off-market opportunities.
              </p>
              <button onClick={resetFilters} className={styles.resetLargeBtn}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Off-Market Advisory Banner ── */}
      <section className={styles.offMarketBanner}>
        <div className="container">
          <div className={styles.offMarketBox}>
            <div className={styles.offMarketContent}>
              <span className={styles.offMarketTag}>
                PRIVATE CLIENT ACQUISITIONS
              </span>
              <h2 className={styles.offMarketTitle}>
                Seeking an off-market opportunity in Melbourne&apos;s north?
              </h2>
              <p className={styles.offMarketDesc}>
                Tell us what you are looking for, including your preferred
                suburbs, budget and timing. Register your search brief to
                receive early access.
              </p>
            </div>
            <Link href="/contact" className={styles.offMarketCta}>
              <span>Register Acquisition Brief</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
