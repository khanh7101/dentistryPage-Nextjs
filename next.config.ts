import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Chỉ rõ đường dẫn tới file request.ts mà bạn đang có
const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  // React Compiler bây giờ là property ở root, không nằm trong experimental nữa
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
