import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";

// 👇 Đây chính là default function mà Next yêu cầu
const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;

export const config = {
  // Match tất cả route, trừ mấy thứ kỹ thuật
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
