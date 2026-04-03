'use client';

// components/FiveStarReviews.tsx
import { useMemo, useState } from "react";
import Collapse from "@/components/Collapse";

type Review = {
  text: string;
  publishTimeISO: string; // ISO để tính "x ngày trước"
  author: { name: string; photo?: string; uri?: string };
};

const MOCK_REVIEWS: Review[] = [
  {
    text:
      "My boyfriend brought me here for the first time after his two visits, and I was truly impressed. At first, I thought it would be just like everywhere else for cleaning, but it was completely different—in the best way. Dr. Phương was amazing, very kind, and extremely careful throughout the process. I felt very comfortable and well taken care of. Highly recommend!”",
    publishTimeISO: "2025-09-15T10:22:00+07:00",
    author: { name: "Dev Conmi", photo: "https://lh3.googleusercontent.com/a-/ALV-UjW-obTle3SCx2hEZKRWy9_rTZQ4wBkURLlYvWzbGgBeFTQyoOFh=w72-h72-p-rp-mo-ba2-br100", },
  },
  {
    text:
      "Highly recommend. From the moment I called the clinic, I was only pleasantly surprised. They immediately arranged a quick appointment for me, and when I arrived at the clinic, I was surprised to discover extraordinary technology and innovation. They replaced fillings on 7 teeth in the most pleasant way possible. In the days following the treatment, the team stayed in touch with me to make sure I was feeling well and even invited me for another check-up free of charge after I felt discomfort in one of my teeth and they treated it effectively. In summary, a great team, great treatment, and really affordable prices. Highly recommend.",
    publishTimeISO: "2025-04-16T19:05:00+07:00",
    author: { name: "Avi Diskind", photo: "https://lh3.googleusercontent.com/a-/ALV-UjWXoFnaz3zQh2a7LD4ALylJkqUw-Qu-_7TZSGp8OmXeXbrsa3_O=w72-h72-p-rp-mo-ba3-br100", },
  },
  {
    text:
      "Bác Yến làm niềng răng siêu êm và đỉnh luôn nha mọi người. Mình là đứa khá nhát và sợ đau nên chần chừ mãi, tình trạng răng của mình cũng không dễ nên đã đi vài nha khoa tư vấn nhưng vẫn chưa dám làm. May mắn là đến đây thì trải nghiệm rất khác luôn: bác tư vấn rất kỹ, giải thích rõ từng bước nên mình cảm thấy cực kỳ yên tâm. Quá trình làm nhẹ nhàng hơn mình tưởng rất nhiều, gần như không đau như mình lo lắng trước đó. Các chị phụ tá take care nhiệt tình, dễ thương nữa nên mỗi lần tới tái khám mình đều thấy thoải mái. Chắc chắn mình sẽ giới thiệu bạn bè đến đây nếu có nhu cầu niềng răng luôn nè 💙",
    publishTimeISO: "2025-09-15T14:10:00+07:00",
    author: { name: "Phan Thị Mỹ Hạnh", photo: "https://lh3.googleusercontent.com/a/ACg8ocJkmlXU1spsVm0dc4kV83awPLE4SRk5pLRvHiy6MBbZTsBq=w72-h72-p-rp-mo-br100", },
  },
  {
    text:
      "Trước giờ mình luôn tự ti vì răng bị xỉn màu và form không đều, chụp hình lúc nào cũng phải cười mím nên quyết định tìm hiểu làm răng sứ. Đi tư vấn vài nơi rồi nhưng vẫn chưa thấy đủ tin tưởng cho tới khi gặp bác Tùng. Ấn tượng đầu tiên là bác cực kỳ có tâm, không hề ép làm nhiều mà tư vấn rất kỹ, phân tích rõ tình trạng răng của mình nên mình hiểu mình đang làm gì luôn. Sau khi hoàn thành thì thật sự bất ngờ luôn, răng trắng sáng nhưng vẫn rất tự nhiên, form nhìn hài hòa với khuôn mặt chứ không bị “giả”. Từ lúc làm xong là mình cười nhiều hơn hẳn, tự tin hơn hẳn luôn. Điểm cộng nữa là team phụ tá siêu dễ thương, chăm sóc kỹ và rất tinh tế trong suốt quá trình.",
    publishTimeISO: "2024-10-08T12:30:00+07:00",
    author: { name: "Hồng Nhung", photo: "https://lh3.googleusercontent.com/a-/ALV-UjXKoMz0tt6wPTPB4MyJe3nQTmJKItF3T5cBVF9ODycPhAyofWkMrg=w72-h72-p-rp-mo-ba2-br100", },
  },
  {
    text:
      "Bác Tùng nhổ răng siêu siêu mát tay, siêu nhẹ nhàng luôn á , nhổ về không sưng không đau, ăn uống bình thường, có thể là đi ăn đi chơi được liền luôn mặc dù răng tui thuộc dạng khó nhổ nha ( đi bệnh viện khám rồi nên tui biết ) đi nhổ răng về mà tui gặp ai cũng nói đi qua Passion nhổ răng liền đii. Nói chung rất là mê bác sĩ ở Passion á.",
    publishTimeISO: "2025-05-12T16:40:00+07:00",
    author: { name: "Phương Quỳnh Đỗ", photo: "https://lh3.googleusercontent.com/a/ACg8ocKz8eOoalcmNySUNNtp0uSo6dteZRt8Yr5pFQplF9xfE0kPgQ=w72-h72-p-rp-mo-br100", },
  },
  {
    text: "Thank you team for making a fear of mine and stepping out of my comfort zone a true pleasure.\n\
    Was never part of my plan to get my teeth revamped on this holiday.\n\
    You all made me feel extremely comfortable.\n\
    Proud to call you all members of my Vietnamese family.❤️✌️🕺\n\
    Anyone thinking of getting work on their teeth.\n\
    They will take care of you with respect and professionalism no matter what part of the world you're from.\n\
    I left with a smile.",
    publishTimeISO: "2025-04-14T09:18:00+07:00",
    author: { name: "Todd Poynter", photo: "https://lh3.googleusercontent.com/a-/ALV-UjVyxgBJkbapvgHgFU3PMbGY4Vxgta1QrXmvsRPTXG98Jm7cESeYaw=w72-h72-p-rp-mo-ba2-br100" },
  },
];

function timeAgo(iso: string) {
  const now = new Date();
  const t = new Date(iso);
  const diff = Math.max(0, now.getTime() - t.getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
    
}

function StaticFiveStars() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-yellow-400">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.954L10 0l2.949 5.956 6.561.954-4.755 4.635 1.123 6.545z" />
        </svg>
      ))}
      <span className="ml-2 text-xs text-gray-600">5/5</span>
    </div>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = r.text.length > 180;

  return (
    <article className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
      <div className="flex items-center gap-3">
        <img
          src={r.author.photo}
          alt={r.author.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="truncate font-medium">{r.author.name}</div>
          <div className="text-xs text-gray-500">{timeAgo(r.publishTimeISO)}</div>
        </div>
      </div>

      <div className="mt-3">
        <StaticFiveStars />
      </div>

      {/* Text có animate trượt */}
      <div className="relative mt-3">
        <Collapse
          open={expanded}
          collapsedHeight={90}                   // ~3–4 dòng; chỉnh tùy design
          duration={280}
          className="whitespace-pre-line text-[15px] leading-relaxed text-gray-800"
        >
          {r.text}
        </Collapse>

        {/* Fade ở đáy khi đang thu gọn */}
        {isLong && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-2 text-sm font-medium text-blue-600 hover:underline hover:cursor-pointer"
          aria-expanded={expanded}
          aria-controls={`review-${r.author.name.replace(/\s+/g, "-")}`}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </article>
  );
}


export default function FiveStarReviews({
  all = MOCK_REVIEWS,
}: {
  all?: Review[];
  overallRating?: number;
  totalCount?: number;
}) {
  // Không cần lọc theo rating nữa, vì dữ liệu đã "chỉ 5★"
  const list = useMemo(() => all, [all]);

  return (
    <section className="w-full">
      {/* Grid reviews */}
      <div className="grid gap-4 md:grid-cols-2 items-start">
        {list.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
    </section>
  );
}

