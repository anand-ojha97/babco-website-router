import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { aboutLinks } from "../data/navigation.js";
import { headingText } from "../styles.js";

export default function AboutMegaMenu({ open, onNavigate }) {
  return (
    <div
      id="nav-menu-0"
      className={`menu-panel absolute left-0 top-[calc(100%_-_1px)] grid w-full grid-cols-[31%_1fr] overflow-hidden rounded-b-[30px] bg-[#e6e6e6] shadow-[0_18px_40px_rgb(30_20_20/0.11),0_4px_12px_rgb(30_20_20/0.04)] ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="relative min-h-[17.1cqw] bg-babco-red px-[2.75cqw] py-[2.35cqw] text-white">
        <h2
          className={`${headingText} menu-detail relative z-10 w-full whitespace-nowrap text-[2.7cqw] leading-[1.2]`}
        >
          About us
        </h2>
        <span
          className="absolute right-0 top-[35%] h-[65%] w-[38%] rounded-tl-[14px] border-l border-t border-white"
          aria-hidden="true"
        />
        <Link
          to="/who-we-are/"
          className="menu-detail absolute bottom-[12%] left-[9%] inline-flex items-center gap-[5px] rounded-full bg-white px-2.5 py-[5px] text-[clamp(10px,0.8cqw,15px)] leading-[1.3] text-babco-red hover:bg-[#ffebdf]"
          onClick={onNavigate}
        >
          Go to Page <ArrowUpRight size={16} />
        </Link>
        <img
          src="/images/about-operations.webp"
          alt="Warehouse staff handling an order"
          width="2881"
          height="1921"
          className="menu-detail absolute bottom-[12%] right-[14.5%] aspect-[1.5] w-[37.5%] rounded-[1.2cqw] object-cover"
        />
      </div>
      <nav className="px-[3cqw] py-[1.7cqw]" aria-label="About us sections">
        {aboutLinks.map((link, index) => (
          <Link
            key={link.label}
            to={link.href}
            onClick={onNavigate}
            className="menu-link group/link flex min-h-[2.65cqw] w-[min(80%,420px)] items-center justify-between rounded-lg px-[0.5cqw] py-[0.35cqw] text-[1.35cqw] leading-[1.3] text-[#262626] hover:bg-[#fff4f0] hover:text-babco-red focus-visible:bg-[#fff4f0] focus-visible:text-babco-red"
            style={{ "--link-index": index }}
          >
            <span>{link.label}</span>
            <ArrowUpRight
              size={22}
              className="-translate-x-[5px] translate-y-[5px] text-babco-red opacity-0 transition-[transform,opacity] duration-200 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100 group-focus-visible/link:translate-x-0 group-focus-visible/link:translate-y-0 group-focus-visible/link:opacity-100"
            />
          </Link>
        ))}
      </nav>
    </div>
  );
}
