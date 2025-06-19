'use client'

import dynamic from "next/dynamic";
import styles from "./index.module.scss";

// 在客户端组件中使用动态导入
const DynamicProductInfo = dynamic(
  () => import("./productInfo").then(mod => ({ default: mod.DynamicProductInfo })),
  {
    loading: () => (
      <div className={styles.loading}>
        {/* 价格骨架 */}
        <div className={styles.loadingHeader}>
          <div className={styles.loadingTitle}></div>
          <div className={styles.loadingStatus}></div>
        </div>
        {/* 更新时间骨架 */}
        <div className={styles.loadingSubtitle}></div>
      </div>
    ),
    ssr: false, // 现在可以在客户端组件中使用
  }
);

export const ClientPriceWrapper = ({ productId }: { productId?: string }) => {
  return <DynamicProductInfo productId={productId} />;
}; 