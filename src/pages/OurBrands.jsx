import { Link } from "react-router";
import PageHero from "../components/PageHero.jsx";
import { inhouseBrands, partnerBrands } from "../data/brandDirectory.js";

const display =
  "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1000px]:leading-[1.2]";
const copy =
  "font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] text-[1.302083cqw] leading-[1.36] max-[1000px]:text-base max-[1000px]:leading-[1.55]";
const imagePath = "/images/our-brands/";

function CollectionPhoto({ name, image, index, className = "", imageClass = "object-cover" }) {
  return (
    <Link
      data-reveal
      to={`/?brand=${index}#brands`}
      aria-label={`Explore ${name} products`}
      className={`brand-photo-hover relative block overflow-hidden bg-[#f6f5f3] ${className}`}
    >
      <img
        src={`${imagePath}${image}.webp`}
        alt={name}
        loading="lazy"
        width="1000"
        height="1000"
        className={`h-full w-full ${imageClass}`}
      />
    </Link>
  );
}

export default function OurBrands() {
  return (
    <>
      <PageHero
        id="our-brands"
        title="Our Brands"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#f6d752] max-[1000px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: `${imagePath}hero-products.webp`,
          alt: "Anand and Ullasam snack and frozen food packs with bowls of South Indian favourites",
          width: "1536",
          height: "1024",
          className: "absolute -left-[0.78125%] -top-[24.13536%] h-[135.387%] w-[100.8%] max-w-none object-cover max-[1000px]:inset-0 max-[1000px]:size-full max-[640px]:object-[52%_center]",
        }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/45"
        titleClassName={`${display} absolute inset-x-0 top-[79.7954%] text-center text-[4.28958cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1000px]:top-auto max-[1000px]:bottom-12 max-[1000px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14`}
      />

      <section
        id="inhouse-brands"
        aria-labelledby="inhouse-brands-title"
        className="relative pb-[3.3604cqw] pt-[2.90625cqw] max-[1000px]:py-10 max-[640px]:py-9"
      >
        <div className="absolute inset-x-0 top-0 h-[24.8177cqw] bg-[#f7f5f3] max-[1000px]:h-[420px]" aria-hidden="true" />
        <h2 data-reveal
          id="inhouse-brands-title"
          className={`${display} relative text-center text-[3.478125cqw] leading-none text-[#ff5a1d] max-[1000px]:px-5 max-[1000px]:text-[clamp(30px,4.6vw,46px)]`}
        >
          Inhouse Brands
        </h2>
        <p data-reveal className={`${copy} relative mx-auto mt-[1.2927cqw] max-w-[88cqw] text-center text-black max-[1000px]:mt-5 max-[1000px]:max-w-[800px] max-[1000px]:px-6`}>
          Explore the brands that power Babco’s growth and reputation. Our in-house brands—Anand, Adarsh,
          <br className="max-[1000px]:hidden" /> Meenu, and Ullasam—span categories and cuisines, delivering consistent quality and products that resonate with the
          <br className="max-[1000px]:hidden" /> preferences of today’s consumers.
        </p>
        <figure data-reveal className="brand-photo-hover relative mx-auto mt-[2.23958cqw] w-[86.3589cqw] overflow-hidden rounded-[2.0833cqw] bg-[#634724] max-[1000px]:mt-8 max-[1000px]:w-[calc(100%_-_48px)] max-[1000px]:rounded-[24px] max-[640px]:w-[calc(100%_-_32px)]">
          <img
            src={`${imagePath}inhouse-snacks.webp`}
            alt="South Indian snacks with Ullasam White Ellu Unda and Anand Ratlami Sev packs on a wooden table"
            width="2200"
            height="1166"
            loading="lazy"
            className="absolute -left-[0.4312%] -top-[14.089%] w-[100.742%] max-w-none max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-cover"
          />
          <div className="relative h-[22.2396cqw] max-[1000px]:aspect-[2/1] max-[1000px]:h-auto max-[640px]:aspect-[4/3]" aria-hidden="true" />
          <figcaption className={`${copy} relative flex min-h-[7.4073cqw] items-center justify-center bg-[#ff5a1d]/85 px-[2.5cqw] py-[1.3cqw] text-center text-white max-[1000px]:px-6 max-[1000px]:py-6 max-[640px]:px-5`}>
            <p data-reveal>
              Anand, Adarsh, Meenu, and Ullasam together represent Babco’s in-house brand portfolio, developed to serve a wide range of
              <br className="max-[1000px]:hidden" /> everyday consumer needs. Each brand focuses on consistency, quality standards, and reliable availability across diverse markets.
            </p>
          </figcaption>
        </figure>
        <nav
          aria-label="Explore our inhouse brands"
          className="relative mx-auto mt-[3.43385cqw] grid w-[71.9094cqw] grid-cols-4 gap-[3.55469cqw] max-[1000px]:mt-8 max-[1000px]:w-[calc(100%_-_48px)] max-[1000px]:gap-5 max-[640px]:w-[calc(100%_-_48px)] max-[640px]:grid-cols-2 max-[640px]:gap-4"
        >
          {inhouseBrands.map(({ name, slug, index }) => (
            <Link
              key={slug}
              data-reveal
              style={{ "--reveal-delay": `${index * 70}ms` }}
              to={`/?brand=${index}#brands`}
              aria-label={`Explore ${name} products`}
              className="brand-card-hover flex aspect-[294/142.45] items-center justify-center overflow-hidden rounded-[1.04167cqw] bg-[#f6f5f3] max-[1000px]:rounded-[16px]"
            >
              <img src={`${imagePath}logo-${slug}.webp`} alt={name} width="490" height="230" loading="lazy" className="max-h-[83%] w-[80%] object-contain" />
            </Link>
          ))}
        </nav>
        <div className="mx-auto mt-[3.38385cqw] grid h-[36.5677cqw] w-[79.8047cqw] grid-cols-[1.05fr_1fr] gap-[1.51354cqw] max-[1000px]:mt-8 max-[1000px]:h-[58vw] max-[1000px]:w-[calc(100%_-_48px)] max-[1000px]:gap-5 max-[640px]:h-auto max-[640px]:w-[calc(100%_-_32px)] max-[640px]:grid-cols-1 max-[640px]:gap-4">
          <div className="grid min-h-0 grid-rows-2 gap-[1.92083cqw] max-[1000px]:gap-5 max-[640px]:h-[88vw] max-[640px]:gap-4">
            <CollectionPhoto name="Anand banana chips" image="anand-banana-chips" index={0} className="rounded-[3.125cqw] max-[1000px]:rounded-[24px]" imageClass="object-cover object-bottom" />
            <div className="grid min-h-0 grid-cols-2 gap-[1.92083cqw] max-[1000px]:gap-5 max-[640px]:gap-4">
              <CollectionPhoto name="Adarsh mixture" image="adarsh-mixture" index={1} className="rounded-[2.0833cqw] max-[1000px]:rounded-[20px]" />
              <CollectionPhoto name="Anand pineapple kesari bath" image="anand-kesari-bath" index={0} className="rounded-[2.0833cqw] max-[1000px]:rounded-[20px]" />
            </div>
          </div>
          <CollectionPhoto name="Ullasam roasted rice powder" image="ullasam-rice-powder" index={3} className="rounded-[4.1667cqw] max-[1000px]:rounded-[32px] max-[640px]:aspect-square" />
        </div>
      </section>

      <section id="partner-brands" aria-labelledby="partner-brands-title" className="pb-[2.29427cqw] pt-[0.9354cqw] max-[1000px]:pb-10 max-[1000px]:pt-4">
        <h2 data-reveal id="partner-brands-title" className={`${display} text-center text-[3.478125cqw] leading-none text-babco-blue max-[1000px]:px-5 max-[1000px]:text-[clamp(30px,4.6vw,46px)]`}>
          Partner Brands
        </h2>
        <p data-reveal className={`${copy} mx-auto mt-[1.7135cqw] max-w-[93cqw] text-center text-black max-[1000px]:mt-5 max-[1000px]:max-w-[800px] max-[1000px]:px-6`}>
          Our partner brands complement Babco’s portfolio by bringing trusted products, established expertise, and category strength to the markets we serve.
          <br className="max-[1000px]:hidden" /> Through long-term partnerships, we ensure consistent quality, reliable supply, and a diverse offering that meets evolving customer and consumer needs.
        </p>
        <div className="mx-auto mt-[2.3495cqw] grid w-[91.137cqw] grid-cols-5 gap-x-[1.6927cqw] gap-y-[2.5271cqw] max-[1000px]:mt-8 max-[1000px]:w-[calc(100%_-_48px)] max-[1000px]:grid-cols-3 max-[1000px]:gap-5 max-[640px]:w-[calc(100%_-_32px)] max-[640px]:grid-cols-2 max-[640px]:gap-4">
          {partnerBrands.map(({ name, label, slug, category, categoryLines, origin }, index) => (
            <article data-reveal style={{ "--reveal-delay": `${(index % 5) * 65}ms` }} key={slug} id={`brand-${slug}`} className="brand-card-hover overflow-hidden rounded-[2.0833cqw] bg-[#f6f5f3] max-[1000px]:rounded-[22px]">
              <div className="overflow-hidden">
                <img src={`${imagePath}partner-${slug}.webp`} alt="" width="648" height="441" loading="lazy" className="block aspect-[323.97/220.11] w-full object-cover" />
              </div>
              <div className="flex min-h-[max(68px,3.82135cqw)] flex-col items-center justify-center rounded-[2.0833cqw] bg-[#f0f0f0] px-2 py-[0.55cqw] text-center font-paragraph font-semibold tracking-normal text-black [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] max-[1000px]:rounded-[18px] max-[1000px]:py-3">
                <h3 data-reveal className="text-[clamp(11px,0.888cqw,17.05px)] uppercase leading-[1.05] max-[1000px]:mb-1 max-[1000px]:leading-[1.3]">{label || name}</h3>
                {(categoryLines || [category]).map((line) => <p data-reveal key={line} className="text-[clamp(11px,0.879167cqw,16.88px)] leading-[1.05] max-[1000px]:leading-[1.3]">{line}</p>)}
                {origin && <p data-reveal className="text-[clamp(11px,0.879167cqw,16.88px)] leading-[1.05] max-[1000px]:leading-[1.3]">{origin}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
