import { Link, useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Search, Menu, X } from "lucide-react";
import { navigation, aboutLinks, navigationHref } from "../data/navigation.js";
import AboutMegaMenu from "./AboutMegaMenu.jsx";
import SearchDialog from "./SearchDialog.jsx";
import { iconButton } from "../styles.js";
import { connectStickyHeader } from "./stickyHeader.js";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const header = useRef(null);
  const location = useLocation();
  useEffect(() => {
    setDropdown(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);
  useEffect(() => connectStickyHeader(header.current), []);

  // Close the menu with Escape or a click outside the header.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "Escape") return;
      const menuButton = header.current?.querySelector(".mobile-nav.is-open")
        ? header.current.querySelector(".mobile-menu-button")
        : header.current?.querySelector(
            '.desktop-nav button[aria-expanded="true"]',
          );
      menuButton?.focus();
      setDropdown(null);
      setMobileOpen(false);
    }
    function handleOutsideClick(event) {
      if (!header.current?.contains(event.target)) {
        setDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  function followLink() {
    setDropdown(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }

  return (
    <>
      <div className="site-header-anchor sticky top-0 z-40 h-0">
      <header
        ref={header}
        data-mega-menu-open={dropdown === 0}
        className="site-header absolute left-[3.3854%] top-0 z-30 flex h-[8.78125cqw] min-h-[90px] w-[93.2292%] items-center justify-between min-[1001px]:pt-[1.6cqw] gap-[2.6cqw] rounded-b-[2.1cqw] min-[1001px]:data-[mega-menu-open=true]:rounded-b-none bg-white px-[2.5cqw] text-babco-red font-copy font-medium max-[1000px]:h-20 max-[1000px]:min-h-[76px] max-[1000px]:rounded-b-[20px] max-[1000px]:px-[26px] max-[640px]:left-[14px] max-[640px]:h-[70px] max-[640px]:min-h-[70px] max-[640px]:w-[calc(100%_-_28px)] max-[640px]:gap-3 max-[640px]:px-4 data-[sticky=true]:pt-0 data-[sticky=true]:h-[90px] data-[sticky=true]:min-h-[90px]"
      >
        <Link
          to="/#home"
          aria-label="Babco Foods home"
          className="relative min-[1001px]:-left-[0.4167cqw] w-[12.6cqw] shrink-0 max-[1000px]:w-[150px] max-[640px]:w-[122px]"
        >
          <img
            src="/images/babco-logo.png"
            alt="BABCO Foods"
            width="964"
            height="336"
            className="h-auto w-full transition-transform duration-300 min-[1001px]:translate-y-[var(--header-logo-offset,0.475cqw)]"
          />
        </Link>
        <nav
          className="desktop-nav flex flex-1 items-center justify-center gap-[1.5cqw] max-[1000px]:hidden"
          aria-label="Main navigation"
        >
          {navigation.map((item, index) => (
            <div
              className={index === 0 ? "static" : "relative"}
              key={item.label}
            >
              <button
                className="inline-flex items-center gap-1.5 whitespace-nowrap py-3 text-[1.24cqw] leading-[1.4]"
                aria-expanded={dropdown === index}
                aria-controls={`nav-menu-${index}`}
                onClick={() => setDropdown(dropdown === index ? null : index)}
              >
                {item.label}
                <ChevronDown
                  size={16}
                  className={`size-[1.1cqw] transition-transform duration-300 ${dropdown === index ? "rotate-180" : ""}`}
                />
              </button>
              {index === 0 ? (
                <AboutMegaMenu
                  open={dropdown === 0}
                  onNavigate={() => followLink()}
                />
              ) : (
                <div
                  id={`nav-menu-${index}`}
                  className={`menu-panel absolute -left-4 top-full min-w-[190px] rounded-xl bg-white p-2 text-sm shadow-xl ${dropdown === index ? "is-open" : ""}`}
                  aria-hidden={dropdown !== index}
                  inert={dropdown !== index}
                >
                  {item.links.map((link, linkIndex) => (
                    <Link
                      key={link.label}
                      to={navigationHref(link)}
                      className="menu-link block rounded-lg px-4 py-3 hover:bg-red-50"
                      style={{ "--link-index": linkIndex }}
                      onClick={() => followLink()}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mr-[7.8cqw] flex items-center gap-3 max-[1000px]:mr-0">
          <button
            className={`${iconButton} size-[2.5cqw] max-[1000px]:size-9`}
            aria-label="Search this site"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-[1.2cqw] max-[1000px]:size-5" />
          </button>
          <button
            className={`${iconButton} mobile-menu-button hidden max-[1000px]:flex`}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`mobile-nav menu-panel absolute inset-x-0 top-full hidden max-h-[calc(100dvh_-_90px)] overflow-y-auto rounded-b-2xl bg-white p-5 text-base shadow-xl max-[1000px]:block ${mobileOpen ? "is-open" : ""}`}
          aria-hidden={!mobileOpen}
          inert={!mobileOpen}
        >
          {navigation.map((item, index) =>
            index === 0 ? (
              <div key={item.label}>
                <button
                  className="menu-link flex w-full items-center justify-between min-[1001px]:pt-[1.6cqw] border-b border-red-50 py-3.5"
                  style={{ "--link-index": index }}
                  aria-expanded={dropdown === 0}
                  aria-controls="mobile-about-submenu"
                  onClick={() => setDropdown(dropdown === 0 ? null : 0)}
                >
                  {item.label}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${dropdown === 0 ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  id="mobile-about-submenu"
                  className={`grid transition-[grid-template-rows,opacity] duration-[380ms] ease-out ${dropdown === 0 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  aria-hidden={dropdown !== 0}
                  inert={dropdown !== 0}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="rounded-b-xl bg-babco-red px-2.5 pb-2.5 pt-2 text-white">
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.label}
                          to={navigationHref(link)}
                          className="flex items-center justify-between min-[1001px]:pt-[1.6cqw] px-2 py-[11px] text-sm"
                          onClick={() => followLink()}
                        >
                          {link.label}
                          <ArrowUpRight size={16} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="menu-link flex items-center justify-between min-[1001px]:pt-[1.6cqw] border-b border-red-50 py-3.5"
                style={{ "--link-index": index }}
                onClick={() => followLink()}
              >
                {item.label}
                <ArrowUpRight size={18} />
              </Link>
            ),
          )}
        </nav>
      </header>
      </div>
      {searchOpen && (
        <SearchDialog
          onClose={() => setSearchOpen(false)}
          onNavigate={followLink}
        />
      )}
    </>
  );
}
