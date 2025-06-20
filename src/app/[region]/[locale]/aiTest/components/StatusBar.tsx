import styles from './StatusBar.module.scss';

interface StatusBarProps {
  darkMode?: boolean;
}

export default function StatusBar({ darkMode = false }: StatusBarProps) {
  return (
    <div className={styles.statusBar}>
      <div className={styles.time}>
        <span>9:41</span>
      </div>
      <div className={styles.logo}>
        <div className={styles.logoBackground}>
          <div className={styles.logoContent}>
            {/* Logo placeholder */}
          </div>
        </div>
      </div>
      <div className={styles.indicators}>
        <div className={styles.cellular}></div>
        <div className={styles.wifi}></div>
        <div className={styles.battery}>
          <div className={styles.batteryBorder}></div>
          <div className={styles.batteryCapacity}></div>
          <div className={styles.batteryCap}></div>
        </div>
      </div>
    </div>
  );
} 