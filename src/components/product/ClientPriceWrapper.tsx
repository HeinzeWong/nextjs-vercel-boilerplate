'use client'

import dynamic from "next/dynamic";

// 在客户端组件中使用动态导入
const DynamicProductInfo = dynamic(
  () => import("./productInfo").then(mod => ({ default: mod.DynamicProductInfo })),
  {
    loading: () => (
      <div className="space-y-2 animate-pulse">
        {/* 价格骨架 */}
        <div className="flex items-center space-x-3">
          <div className="h-8 bg-gray-200 rounded-md w-32"></div>
          <div className="h-6 bg-gray-200 rounded-md w-20"></div>
        </div>
        {/* 更新时间骨架 */}
        <div className="h-4 bg-gray-200 rounded-md w-40"></div>
      </div>
    ),
    ssr: false, // 现在可以在客户端组件中使用
  }
);

export const ClientPriceWrapper = ({ productId }: { productId?: string }) => {
  return <DynamicProductInfo productId={productId} />;
}; 