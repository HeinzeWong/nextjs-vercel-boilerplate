import styles from './NavBar.module.scss';

interface NavBarProps {
  title: string;
  onBack?: () => void;
}

export default function NavBar({ title, onBack }: NavBarProps) {
  return (
    <div className={styles.navBar}>
      <button className={styles.backButton} onClick={onBack}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path 
            d="M20 24L12 16L20 8" 
            stroke="#1f1f1d" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.rightContent}></div>
    </div>
  );
} 