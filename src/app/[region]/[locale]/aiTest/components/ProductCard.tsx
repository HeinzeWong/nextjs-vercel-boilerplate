import Image from 'next/image';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  name: string;
  code: string;
  rarity: string;
  grade: string;
  game: string;
  imageSrc?: string;
}

export default function ProductCard({ 
  name, 
  code, 
  rarity, 
  grade, 
  game,
  imageSrc = '/placeholder-card.jpg'
}: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={name} className={styles.image} />
        
      </div>
      <div className={styles.details}>
        <div className={styles.nameSection}>
          <h3 className={styles.name}>{name}</h3>
        </div>
        <div className={styles.codeSection}>
          <span className={styles.code}>{code}</span>
          <span className={styles.rarity}>{rarity}</span>
          <span className={styles.grade}>{grade}</span>
        </div>
        <div className={styles.gameSection}>
          <span className={styles.game}>{game}</span>
        </div>
      </div>
    </div>
  );
} 