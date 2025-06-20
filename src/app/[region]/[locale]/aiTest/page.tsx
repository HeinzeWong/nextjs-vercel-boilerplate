'use client';

import { useState } from 'react';
import BottomButton from './components/BottomButton';
import CategorySection from './components/CategorySection';
import ImageUpload from './components/ImageUpload';
import InputField from './components/InputField';
import NavBar from './components/NavBar';
import ProductCard from './components/ProductCard';
import StatusBar from './components/StatusBar';
import Stepper from './components/Stepper';
import styles from './page.module.scss';

export default function AddItemPage() {
  const [selectedCategory, setSelectedCategory] = useState('Ungraded');
  const [selectedCondition, setSelectedCondition] = useState('S');
  const [price, setPrice] = useState('');
  const [stockQty, setStockQty] = useState(1);

  const handleBack = () => {
    // Navigate back logic
    console.log('Navigate back');
  };

  const handleSubmit = () => {
    // Submit form logic
    console.log('Submit form');
  };

  return (
    <div className={styles.container}>
      {/* Status Bar */}
      <div className={styles.statusBar}>
        <StatusBar />
      </div>

      {/* Navigation Bar */}
      <div className={styles.navBar}>
        <NavBar title="Add Item" onBack={handleBack} />
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Similar Items Section */}
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.productRow}>
              <ProductCard
                name="Iron Treads ex"
                code="PAF-066/091"
                rarity="R"
                grade="RR"
                game="Pokémon EN"
                imageSrc="https://tcgplayer-cdn.tcgplayer.com/set_icon/SV09JourneyTogether.png"
              />
              <button className={styles.arrowButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#8c8c8a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.expandRow}>
              <span className={styles.expandText}>Listed similar items 2</span>
              <button className={styles.expandButton}>
                <span>Expand</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3.5 5.25L7 8.75L10.5 5.25"
                    stroke="#8c8c8a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Category & Condition Section */}
        <CategorySection
          selectedCategory={selectedCategory}
          selectedCondition={selectedCondition}
          onCategoryChange={setSelectedCategory}
          onConditionChange={setSelectedCondition}
        />

        {/* Price & Stock Section */}
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              <label className={styles.rowLabel}>Price</label>
              <div className={styles.inputContainer}>
                <InputField
                  placeholder="Please"
                  value={price}
                  onChange={setPrice}
                  type="number"
                />
              </div>
            </div>
            <div className={styles.row}>
              <label className={styles.rowLabel}>Stock Qty</label>
              <Stepper
                value={stockQty}
                onChange={setStockQty}
              />
            </div>
            <div className={styles.row}>
              <label className={styles.rowLabel}>Remarks</label>
              <div className={styles.remarksValue}>
                <span>Without blemish</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.imageHeader}>
              <h2 className={styles.sectionTitle}>Image</h2>
              <button className={styles.requirementsButton}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#8c8c8a" strokeWidth="1" />
                  <path d="M8 5.5V8.5M8 11H8.01" stroke="#8c8c8a" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Requirements</span>
              </button>
            </div>
            <ImageUpload
              imageSrc="https://tcgplayer-cdn.tcgplayer.com/set_icon/SV09JourneyTogether.png"
              onRemove={() => console.log('Remove image')}
            />
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <BottomButton
        text="Primary"
        onClick={handleSubmit}
      />
    </div>
  );
}
