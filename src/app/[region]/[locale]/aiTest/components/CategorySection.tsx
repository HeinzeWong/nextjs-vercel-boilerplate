import styles from './CategorySection.module.scss';

interface CategorySectionProps {
  selectedCategory?: string;
  selectedCondition?: string;
  onCategoryChange?: (category: string) => void;
  onConditionChange?: (condition: string) => void;
}

export default function CategorySection({ 
  selectedCategory = 'Ungraded',
  selectedCondition = 'S',
  onCategoryChange,
  onConditionChange 
}: CategorySectionProps) {
  const categories = ['Ungraded', 'Graded'];
  const conditions = ['S', 'A', 'B', 'C'];

  return (
    <div className={styles.categorySection}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Category <span>&amp;</span> Cond.
        </h2>
        <button className={styles.guideButton}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#8c8c8a" strokeWidth="1"/>
            <path d="M8 5.5V8.5M8 11H8.01" stroke="#8c8c8a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Check Guide</span>
        </button>
      </div>
      
      <div className={styles.content}>
        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <div className={styles.options}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.option} ${selectedCategory === category ? styles.selected : ''}`}
                onClick={() => onCategoryChange?.(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.field}>
          <label className={styles.label}>Cond.</label>
          <div className={styles.options}>
            {conditions.map((condition) => (
              <button
                key={condition}
                className={`${styles.option} ${selectedCondition === condition ? styles.selected : ''}`}
                onClick={() => onConditionChange?.(condition)}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.alert}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L15 14H1L8 1Z" stroke="#8c8c8a" strokeWidth="1" fill="none"/>
            <path d="M8 6V9M8 12H8.01" stroke="#8c8c8a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p>Please ensure the accuracy of the information. The seller will be responsible for any disputes arising from discrepancies.</p>
        </div>
      </div>
    </div>
  );
} 