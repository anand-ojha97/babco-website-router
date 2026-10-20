import RichScenes from "../components/RichScenes.jsx";
import BrandShowcase from "../components/BrandShowcase.jsx";
import Distribution from "../components/Distribution.jsx";
import Locations from "../components/Locations.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import { useSearchParams } from "react-router";
import { brandCatalog } from "../data/brands.js";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedBrand = Number(searchParams.get("brand"));
  const brand = Number.isInteger(requestedBrand) && requestedBrand >= 0 && requestedBrand < brandCatalog.length
    ? requestedBrand : 0;

  function onBrandChange(index) {
    // URL state supports direct links without keeping a second copy in App.
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.set("brand", String(index));
      return next;
    }, { replace: true, state: { preserveScroll: true } });
  }
  return (
    <>
      <section
        id="home"
        className="page-hero relative aspect-[1920/953] overflow-hidden max-[640px]:aspect-[1/1.05]"
        aria-label="Babco Foods distribution"
      >
        <h1 className="sr-only">
          Babco Foods — Good. Authentic. Pure. Reach.
        </h1>
        <img
          className="h-full w-full object-cover object-[50%_2%] max-[640px]:object-[60%_center]"
          src="/images/hero-distribution.webp"
          alt="BABCO refrigerated delivery trucks outside a distribution warehouse"
          width="1672"
          height="941"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-black/20 max-[640px]:bg-black/8"
          aria-hidden="true"
        />
      </section>
      <ScrollReveal>
        <RichScenes />
      </ScrollReveal>
      <ScrollReveal>
        <BrandShowcase brand={brand} onBrandChange={onBrandChange} />
      </ScrollReveal>
      <ScrollReveal>
        <Distribution />
      </ScrollReveal>
      <ScrollReveal>
        <Locations />
      </ScrollReveal>
    </>
  );
}
