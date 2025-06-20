import styles from './BottomButton.module.scss';
import HomeIndicator from './HomeIndicator';

interface BottomButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function BottomButton({ text, onClick, disabled = false }: BottomButtonProps) {
  return (
    <div className={styles.bottomButton}>
      <div className={styles.buttonContainer}>
        <button 
          className={styles.button} 
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
} 