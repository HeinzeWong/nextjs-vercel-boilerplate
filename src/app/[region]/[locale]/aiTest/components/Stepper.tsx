import styles from './Stepper.module.scss';

interface StepperProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
}

export default function Stepper({ value, onChange, min = 1, max = 99 }: StepperProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange?.(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange?.(value + 1);
    }
  };

  return (
    <div className={styles.stepper}>
      <button 
        className={styles.button}
        onClick={handleDecrease}
        disabled={value <= min}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      <div className={styles.value}>
        <span>{value}</span>
      </div>
      <button 
        className={styles.button}
        onClick={handleIncrease}
        disabled={value >= max}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
} 