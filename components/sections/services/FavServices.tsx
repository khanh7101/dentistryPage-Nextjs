'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { serviceImage } from "@/lib/utils/assetMaps";

export default function FavServices() {
  const t = useTranslations("services");

  const FAVORITES = [
    {
      to: "/services/orthodontic",
      title: t("service.favService.service1"),
      img: "fav1.jpg",
      desc: t("service.favService.desc1"),
    },
    {
      to: "/services/implant",
      title: t("service.favService.service2"),
      img: "fav2.jpg",
      desc: t("service.favService.desc2"),
    },
    {
      to: "/services/porcelain",
      title: t("service.favService.service3"),
      img: "fav3.jpg",
      desc: t("service.favService.desc3"),
    },
    {
      to: "/services/general",
      title: t("service.favService.service4"),
      img: "fav4.jpg",
      desc: t("service.favService.desc4"),
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-4">
      {FAVORITES.map((s) => (
        <Link
          key={s.title}
          href={s.to}
          className="group relative block overflow-hidden rounded-xl ring-1 ring-black/5"
        >
          {/* Wrapper để dùng Image fill */}
          <div className="relative h-56 w-full md:h-60">
            <Image
              src={serviceImage(s.img)} // "/images/services/service/fav1.jpg"
              alt={s.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 50vw, 100vw"
              priority={false}
            />
          </div>

          {/* gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sky-600/80 via-sky-600/40 to-transparent opacity-95" />

          {/* bottom content */}
          <div className="absolute inset-x-0 bottom-0">
            <div
              className="px-4 pb-4 lg:pb-0 text-white translate-y-0 transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-3 will-change-transform"
            >
              {/* TITLE */}
              <div className="mb-2 inline-flex rounded-lg bg-white/20 px-3 py-2 text-base backdrop-blur">
                {s.title}
              </div>

              {/* DESC */}
              <div
                className="translate-y-0 opacity-100 max-h-none transition-[max-height,opacity,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] delay-50 lg:max-h-0 lg:overflow-hidden lg:translate-y-1 lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
              >
                <p className="text-sm/6 text-white/95">{s.desc}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

