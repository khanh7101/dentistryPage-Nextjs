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
      "Bác Tùng nhổ răng khôn siêu êm và đỉnh luôn nha mn. Mình là đứa nhát gan dữ lắm và sợ đau chần chừ mãi và ca răng mình khó đến vài nha khoa từ chối nhận nhổ luôn, nay đến nha khoa nhổ không đau và nhẹ nhàng ạ, các chị phụ tá takecare nhiệt tình và dễ thương lắm ạ, mình sẽ giới thiệu bạn bè đến đây nếu có nhu cầu nhổ răng khôn nè",
    publishTimeISO: "2025-09-15T14:10:00+07:00",
    author: { name: "Phan Thị Mỹ Hạnh", photo: "https://lh3.googleusercontent.com/a/ACg8ocJkmlXU1spsVm0dc4kV83awPLE4SRk5pLRvHiy6MBbZTsBq=w72-h72-p-rp-mo-br100", },
  },
  {
    text:
      "Tới bây giờ mình vẫn chưa tin đã nhổ 4 chiếc răng khôn và trồng implant cùng 1 lúc🥲. Một quyết định chớp nhoáng trong buổi chiều, mình không nghĩ nhổ răng để lâu lại bị nhiều vấn đề đến v, oh my god:)). Chụp film thấy 4 răng 'ngốc' nữa. Được tư vấn của bác sĩ Tùng tại đây, mình làm luôn. Hiện tại thì mình đang đợi để đến cắm răng sứ vào nữa. Trộm vía, rất trộm vía lun, BS mát tay và rất nhiệt tình ahhhh. Mặc dù làm xong ai cũng chửi 'khùng hả?', 'nhổ 4 cái mà trồng sao chịu nổi', 'sao gan vậy', v.v. Nhưng mà 2 giờ trong phòng phẫu thật là đáng nhớ, nhớ lại lúc làm cũng kh thấy đau lắm, sau đó mình ăn cháo khoảng gần 1 tuần nhưng cũng ổn. Rùi đi cắt chỉ, trộm vía n lần. Cảm ơn BS Tùng và các chị ở đây siêu nhiệt tình huhu, support mình quá trời. Mình được chị giới thiệu đến đây, đoạn về có việc gấp còn được Bác đưa qua chỗ lấy xe giúp. Recommend ở đây cực kì lun, mình cũng giới thiệu vài người bạn mình tới đây gòi =)) Mình viết bài này khi đã làm khoảng 3-4 tháng trước, cuối tháng này sẽ đến lại để cắm sứ vào. Cả nhà đang phân vân thì đừng lăn tăn nữa nhe, qua đây liền i ạaa",
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

