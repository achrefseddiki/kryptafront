import { ASSETS } from "../lib/assets";

const FOOTER_LINKS = {
  Shop: ["Gaming PCs", "Components", "Peripherals", "Streaming Gear"],
  Krypta: ["Build Your Setup", "Drops", "Custom Requests", "Guides & Articles", "Esports"],
  "Support & Legal": ["Contact Us", "Shipping", "Privacy Policy", "Terms of Service"],
};

const SOCIAL_ICONS = [
  ASSETS.iconSocial1,
  ASSETS.iconSocial2,
  ASSETS.iconSocial3,
  ASSETS.iconSocial4,
];

export default function Footer() {
  return (
    <footer className="border-t border-black pt-5 pb-7 px-24 flex flex-col items-center gap-10">
      {/* Link columns + newsletter */}
      <div className="flex gap-10 w-full justify-between">
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className="flex flex-col gap-4">
            <p className="text-white text-sm font-medium leading-5">{heading}</p>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#a0a0a0] text-sm font-normal leading-5 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="flex flex-col gap-4 max-w-[362px]">
          <p className="text-white text-sm font-medium leading-5">Stay Up To Date</p>
          <p className="text-[#a0a0a0] text-sm font-normal leading-5 text-justify max-w-[306px]">
            {"Rejoins notre communauté de +300.000 fans de gaming et d'esport et accède à des offres exclusives."}
          </p>
          <div className="flex gap-4 items-center mt-6">
            <input
              type="email"
              placeholder="Drop ton email"
              className="bg-[rgba(255,255,255,0.15)] border border-[#ddd] rounded-[3px] h-10 px-3.5 text-sm text-[#777] placeholder:text-[#777] outline-none focus:border-[#00f5ff] transition-colors w-[242px]"
            />
            <button className="bg-white text-[#111] text-sm font-semibold h-10 px-5 rounded-[5px] hover:bg-gray-100 transition-colors whitespace-nowrap">
              {"S'inscrire"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.1)] w-full pt-8 flex items-center justify-between">
        <a href="/" className="relative w-[177px] h-10 overflow-hidden">
          <img
            src={ASSETS.logo}
            alt="KRYPTA"
            className="absolute"
            style={{ height: "610%", width: "138%", left: "-19%", top: "-255%" }}
          />
        </a>
        <div className="flex items-center gap-4">
          {SOCIAL_ICONS.map((icon, i) => (
            <a key={i} href="#" className="size-10 border border-[rgba(218,222,228,0.5)] rounded-[8px] flex items-center justify-center hover:border-white/50 transition-colors">
              <img src={icon} alt="" className="size-5" />
            </a>
          ))}
        </div>
      </div>

      <p className="text-[#a0a0a0] text-sm font-normal text-center leading-5">
        © 2026 KRYPTA. All rights reserved.
      </p>
    </footer>
  );
}
