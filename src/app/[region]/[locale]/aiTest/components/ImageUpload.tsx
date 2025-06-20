import Image from 'next/image';
import styles from './ImageUpload.module.scss';

interface ImageUploadProps {
  imageSrc?: string;
  onRemove?: () => void;
}

export default function ImageUpload({ 
  imageSrc = '/placeholder-card.jpg', 
  onRemove 
}: ImageUploadProps) {
  return (
    <div className={styles.imageUpload}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt="Product" className={styles.image} />
        
        <button className={styles.removeButton} onClick={onRemove}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M18 6L6 18M6 6L18 18" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
} 