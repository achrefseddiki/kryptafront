"use client";

import { ASSETS } from "../lib/assets";
import { useT } from "../lib/language-context";

const SOCIALS = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@krypta.tn",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#ft-tiktok)">
          <path d="M18.2 4.5C15.9 4.3 14.1 2.6 13.8 0.3V0H10.4V13.8C10.4 15.2 9.20002 16.4 7.60002 16.4C6.20002 16.4 5.00002 15.3 5.00002 13.8C5.00002 12.3 6.10002 11.2 7.60002 11.2H7.80002L8.30002 11.3V7.5H7.60002C4.20002 7.5 1.40002 10.3 1.40002 13.7C1.40002 17.1 4.20002 20 7.70002 20C11.2 20 13.9 17.2 13.9 13.8V6.8C15 7.9 16.3 8.4 17.8 8.4H18.6V4.6L18.2 4.5Z" fill="white"/>
        </g>
        <defs><clipPath id="ft-tiktok"><rect width="20" height="20" fill="white"/></clipPath></defs>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/krypta.tn/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#ft-facebook)">
          <path d="M20 10.0996C20 4.59961 15.5 0.0996094 10 0.0996094C4.5 0.0996094 0 4.49961 0 10.0996C0 15.0996 3.7 19.1996 8.4 19.9996V12.9996H5.9V10.0996H8.4V7.89961C8.4 5.39961 9.9 3.99961 12.2 3.99961C13.3 3.99961 14.4 4.19961 14.4 4.19961V6.69961H13.1C11.9 6.69961 11.5 7.49961 11.5 8.29961V10.1996H14.3L13.9 12.9996H11.6V19.9996C16.3 19.1996 20 15.0996 20 10.0996Z" fill="white"/>
        </g>
        <defs><clipPath id="ft-facebook"><rect width="20" height="20" fill="white"/></clipPath></defs>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/krypta.tn/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#ft-instagram)">
          <path d="M9.99995 13.2992C11.8225 13.2992 13.3 11.8218 13.3 9.99922C13.3 8.17668 11.8225 6.69922 9.99995 6.69922C8.17741 6.69922 6.69995 8.17668 6.69995 9.99922C6.69995 11.8218 8.17741 13.2992 9.99995 13.2992Z" fill="white"/>
          <path d="M14.2 0H5.8C2.6 0 0 2.6 0 5.8V14.1C0 17.4 2.6 20 5.8 20H14.1C17.3 20 19.9 17.4 19.9 14.2V5.8C20 2.6 17.4 0 14.2 0ZM10 15C7.2 15 5 12.8 5 10C5 7.2 7.2 5 10 5C12.8 5 15 7.2 15 10C15 12.8 12.8 15 10 15ZM15.8 5C15.4 5 15 4.6 15 4.2C15 3.8 15.4 3.4 15.8 3.4C16.2 3.4 16.6 3.8 16.6 4.2C16.6 4.6 16.3 5 15.8 5Z" fill="white"/>
        </g>
        <defs><clipPath id="ft-instagram"><rect width="20" height="20" fill="white"/></clipPath></defs>
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#ft-discord)">
          <path d="M17.2 4.19961C15.5 2.79961 12.7 2.59961 12.6 2.59961C12.4 2.59961 12.2 2.69961 12.2 2.89961C12.2 2.89961 12.1 2.99961 12.1 3.29961C13.2 3.49961 14.7 3.89961 15.9 4.69961C16.1 4.69961 16.2 4.99961 16 5.19961C15.9 5.29961 15.8 5.39961 15.6 5.39961C15.5 5.39961 15.4 5.39961 15.4 5.29961C13.3 3.99961 10.5 3.89961 10 3.89961C9.5 3.89961 6.7 3.99961 4.6 5.29961C4.4 5.49961 4.1 5.39961 4 5.19961C3.8 4.99961 3.9 4.69961 4.1 4.59961C5.4 3.79961 6.8 3.39961 7.9 3.19961C7.9 2.99961 7.8 2.89961 7.8 2.89961C7.7 2.69961 7.5 2.59961 7.4 2.59961C7.3 2.59961 4.5 2.79961 2.8 4.29961C1.8 5.09961 0 10.0996 0 14.2996C0 14.3996 0 14.4996 0.1 14.4996C1.4 16.6996 4.8 17.2996 5.6 17.2996C5.7 17.2996 5.9 17.1996 6 17.0996L6.8 15.9996C4.7 15.3996 3.6 14.4996 3.5 14.3996C3.3 14.1996 3.3 13.9996 3.5 13.7996C3.7 13.5996 3.9 13.5996 4.1 13.7996C4.1 13.7996 6.1 15.4996 10.1 15.4996C14.1 15.4996 16.1 13.7996 16.1 13.7996C16.3 13.5996 16.6 13.6996 16.7 13.7996C16.9 13.9996 16.8 14.2996 16.7 14.3996C16.6 14.4996 15.5 15.3996 13.4 15.9996L14.2 17.0996C14.3 17.1996 14.4 17.2996 14.6 17.2996C15.4 17.2996 18.8 16.6996 20.1 14.4996C20.1 14.3996 20.2 14.3996 20.2 14.2996C20 10.0996 18.2 5.09961 17.2 4.19961ZM7.2 12.5996C6.4 12.5996 5.7 11.7996 5.7 10.8996C5.7 9.99961 6.4 9.19961 7.2 9.19961C8 9.19961 8.7 9.99961 8.7 10.8996C8.7 11.7996 8 12.5996 7.2 12.5996ZM12.8 12.5996C12 12.5996 11.3 11.7996 11.3 10.8996C11.3 9.99961 12 9.19961 12.8 9.19961C13.6 9.19961 14.3 9.99961 14.3 10.8996C14.3 11.7996 13.7 12.5996 12.8 12.5996Z" fill="white"/>
        </g>
        <defs><clipPath id="ft-discord"><rect width="20" height="20" fill="white"/></clipPath></defs>
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-black pt-5 pb-7 px-4 sm:px-8 lg:px-24 flex flex-col items-center gap-10">
      {/* Link columns + newsletter */}
      <div className="flex flex-wrap gap-8 lg:flex-nowrap lg:gap-10 w-full justify-between">
        {t.home.footer.links.map(({ heading, items }) => (
          <div key={heading} className="flex flex-col gap-4 min-w-[140px]">
            <p className="text-white text-sm font-medium leading-5">{heading}</p>
            <ul className="flex flex-col gap-3">
              {items.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-[#a0a0a0] text-sm font-normal leading-5 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[362px]">
          <p className="text-white text-sm font-medium leading-5">{t.home.footer.stayUpToDate}</p>
          <p className="text-[#a0a0a0] text-sm font-normal leading-5 text-justify max-w-[306px]">
            {t.home.footer.newsletter}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mt-2 lg:mt-6">
            <input
              type="email"
              placeholder={t.home.footer.placeholder}
              className="bg-[rgba(255,255,255,0.15)] border border-[#ddd] rounded-[3px] h-10 px-3.5 text-sm text-[#777] placeholder:text-[#777] outline-none focus:border-[#00f5ff] transition-colors w-full sm:w-[242px]"
            />
            <button className="bg-white text-[#111] text-sm font-semibold h-10 px-5 rounded-[5px] hover:bg-gray-100 transition-colors whitespace-nowrap">
              {t.home.footer.subscribe}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.1)] w-full pt-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-0 justify-between">
        <a href="/">
          <img src={ASSETS.logo} alt="KRYPTA" className="h-10 w-auto" />
        </a>
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="size-10 border border-[rgba(218,222,228,0.5)] rounded-[8px] flex items-center justify-center hover:border-white/50 transition-colors">
              {icon}
            </a>
          ))}
        </div>
      </div>

      <p className="text-[#a0a0a0] text-sm font-normal text-center leading-5">
        {t.home.footer.copyright}
      </p>
    </footer>
  );
}
