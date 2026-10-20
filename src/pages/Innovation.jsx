import PageHero from "../components/PageHero.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";

const display = "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1000px]:leading-[1.2]";
const paragraph = "font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none]";
const copy = `${paragraph} text-[1.302083cqw] leading-[1.2] max-[1000px]:text-base max-[1000px]:leading-[1.55]`;
const images = "/images/innovation/";

const sourcingPrinciples = [
  { title: ["Village", "to-village"], lines: ["Sourcing directly from", "taluk to taluk & village to village"] },
  { title: ["Authentic", "producers"], lines: ["Identifying authentic", "regional producers"] },
  { title: ["Quality from", "the source"], lines: ["Ensuring quality from", "the source"] },
  { title: ["Direct market", "access"], lines: ["Creating direct market access", "for small manufacturers"] },
];

export default function Innovation() {
  return (
    <>
      <PageHero
        id="innovation"
        title="Innovation"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#6a7470] max-[1000px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: `${images}innovation-hero.webp`,
          alt: "A food production specialist inspecting fresh peppers on an automated processing line",
          width: "1774",
          height: "887",
          className: "absolute -left-[6.614583%] -top-[7.214061%] w-[113.59375%] max-w-none max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-cover max-[640px]:object-[65%_center]",
        }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/15 to-black/45"
        titleClassName={`${display} absolute inset-x-0 top-[79.7954%] text-center text-[4.289583cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1000px]:top-auto max-[1000px]:bottom-12 max-[1000px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14`}
      />

      <section id="product-sourcing" aria-labelledby="product-sourcing-title" className="relative bg-white min-[1001px]:h-[49.635417cqw] max-[1000px]:pb-12">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[#f7f5f3]" aria-hidden="true" />
        <ScrollReveal className="business-reveal relative text-center min-[1001px]:pt-[3.731771cqw] max-[1000px]:px-6 max-[1000px]:pt-12">
          <h2 id="product-sourcing-title" className={`${display} business-step text-[3.478125cqw] leading-none text-babco-blue max-[1000px]:text-[clamp(30px,4.6vw,46px)] max-[640px]:text-[clamp(28px,7vw,38px)]`}>Product Sourcing</h2>
          <p className={`${copy} business-step mx-auto mt-[1.255208cqw] max-w-[83.333333cqw] text-black max-[1000px]:mt-5 max-[1000px]:max-w-[800px]`} style={{ "--step-delay": "90ms" }}>
            Our approach is rooted in direct engagement, working taluk to taluk and village to village to identify authentic regional producers.
            <br className="max-[1000px]:hidden" /> By sourcing directly from the origin, we ensure consistent quality, preserve traditional practices, and maintain full
            <br className="max-[1000px]:hidden" /> control over standards from the source itself.
          </p>
        </ScrollReveal>
        <ScrollReveal className="business-reveal relative overflow-hidden rounded-[2.083333cqw] min-[1001px]:absolute min-[1001px]:left-[6.592188cqw] min-[1001px]:top-[15.229167cqw] min-[1001px]:w-[86.358854cqw] max-[1000px]:mx-6 max-[1000px]:mt-8 max-[1000px]:rounded-[26px] max-[640px]:mx-4">
          <figure className="brand-photo-hover relative h-[18.899479cqw] overflow-hidden max-[1000px]:h-auto max-[1000px]:aspect-[16/7] max-[640px]:aspect-[4/3]">
            <img src={`${images}product-sourcing.webp`} alt="Gloved hands checking fresh vegetables for quality at their source" width="2400" height="807" loading="lazy" className="absolute -left-[1.275528%] -top-[34.246711%] w-[102.587917%] max-w-none max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-cover" />
          </figure>
          <ol className="business-gradient grid min-h-[10.729167cqw] grid-cols-4 px-[1.041667cqw] pb-[1.5625cqw] pt-[1.666667cqw] text-center text-white max-[1000px]:grid-cols-2 max-[1000px]:gap-x-5 max-[1000px]:gap-y-8 max-[1000px]:px-5 max-[1000px]:py-7 max-[640px]:gap-x-4 max-[640px]:gap-y-7 max-[640px]:px-4">
            {sourcingPrinciples.map(({ title, lines }, index) => (
              <li key={title[0]} className="business-step" style={{ "--step-delay": `${index * 120}ms` }}>
                <h3 className={`${display} flex flex-col text-[1.352604cqw] leading-[1.347709] max-[1000px]:text-[22px] max-[1000px]:leading-[1.2] max-[640px]:text-[clamp(16px,4.4vw,22px)] max-[360px]:text-[15px]`}>{title.map(line => <span key={line}>{line}</span>)}</h3>
                <p className={`${copy} mt-[0.625cqw] max-[1000px]:mt-3 max-[640px]:text-[13px] max-[640px]:leading-[1.4]`}>{lines.map((line, index) => <span key={line} className="min-[1001px]:block">{line}{index < lines.length - 1 ? " " : ""}</span>)}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </section>

      <section id="graphics-packaging" aria-labelledby="graphics-packaging-title" className="bg-[#ffebc8] p-[3.385417cqw] min-[1001px]:h-[49.635417cqw] max-[1000px]:px-6 max-[1000px]:py-8 max-[640px]:px-4">
        <div className="relative overflow-hidden rounded-[3.125cqw] bg-linear-to-r from-babco-orange to-[#ed4100] min-[1001px]:h-[42.864583cqw] max-[1000px]:rounded-[28px] max-[1000px]:p-6 max-[640px]:p-4">
          <svg className="pointer-events-none absolute left-[1.5625cqw] top-[9.126563cqw] h-[32.300521cqw] w-[90.343229cqw] max-[1000px]:hidden" viewBox="0 0 1734.59 620.17" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#ffebc8" d="M1081.64 29.92V232.41A29.92 29.92 0 0 1 1051.72 262.33H29.92A29.92 29.92 0 0 0 0 292.25V590.25A29.92 29.92 0 0 0 29.92 620.17H1704.67A29.92 29.92 0 0 0 1734.59 590.25V29.92A29.92 29.92 0 0 0 1704.67 0H1111.56A29.92 29.92 0 0 0 1081.64 29.92Z" />
          </svg>
          <ScrollReveal className="business-reveal relative min-[1001px]:px-[2.855729cqw] min-[1001px]:pt-[2.856771cqw]">
            <h2 id="graphics-packaging-title" className={`${display} business-step text-[3.478125cqw] leading-none text-white max-[1000px]:text-[clamp(28px,4.6vw,45px)] max-[1000px]:leading-[1.2]`}>Graphics & Packaging</h2>
            <h3 className={`${display} business-step mt-[5.178646cqw] flex flex-col gap-[1.64375cqw] text-[3.478125cqw] leading-none text-white max-[1000px]:mt-8 max-[1000px]:gap-1 max-[1000px]:text-[clamp(24px,4.2vw,38px)] max-[1000px]:leading-[1.2]`} style={{ "--step-delay": "120ms" }}><span>Compliance with</span><span>FDA & U.S. Standards</span></h3>
          </ScrollReveal>
          <ScrollReveal className="business-reveal relative min-[1001px]:absolute min-[1001px]:left-[3.033854cqw] min-[1001px]:top-[24.868229cqw] min-[1001px]:w-[54.166667cqw] max-[1000px]:mt-7 max-[1000px]:rounded-[20px] max-[1000px]:bg-[#ffebc8] max-[1000px]:p-6 max-[640px]:p-5">
            <div className={`${copy} space-y-[1.5625cqw] text-black max-[1000px]:space-y-5`}>
              <p className="business-step">All our packaging is developed in strict adherence to FDA regulations and U.S. food safety
                <br className="max-[1000px]:hidden" /> and labeling standards, ensuring full compliance at every stage. From approved materials
                <br className="max-[1000px]:hidden" /> and food-safe inks to accurate nutritional labeling and required disclosures, each element
                <br className="max-[1000px]:hidden" /> is carefully evaluated to meet regulatory requirements.</p>
              <p className="business-step" style={{ "--step-delay": "130ms" }}>Alongside compliance, we maintain high aesthetic and quality standards to deliver
                <br className="max-[1000px]:hidden" /> packaging that is both functional and visually compelling. Through precise design,
                <br className="max-[1000px]:hidden" /> durable materials, and high print quality, we protect product integrity while presenting
                <br className="max-[1000px]:hidden" /> a modern, premium appearance suited for the U.S. retail environment.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="min-[1001px]:absolute min-[1001px]:left-[58.879167cqw] min-[1001px]:top-[10.104167cqw] min-[1001px]:h-[30.341146cqw] min-[1001px]:w-[32.049479cqw] max-[1000px]:mt-6 max-[1000px]:aspect-[16/10] max-[640px]:aspect-[4/3]">
            <figure className="brand-photo-hover relative size-full overflow-hidden rounded-[0.625521cqw] bg-[#a6b19a] max-[1000px]:rounded-[20px]">
              <img src={`${images}fda-standards.webp`} alt="U.S. Food and Drug Administration sign outside its headquarters" width="1018" height="679" loading="lazy" className="absolute -left-[91.344641%] -top-[51.259225%] w-[216.332169%] max-w-none max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-cover max-[1000px]:object-[65%_65%]" />
            </figure>
          </ScrollReveal>
        </div>
      </section>

      <section id="future-food" aria-labelledby="future-food-title" className="relative bg-white min-[1001px]:h-[49.635417cqw] max-[1000px]:pb-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 grid h-1/2 grid-cols-2 max-[1000px]:hidden" aria-hidden="true"><div className="business-gradient" /><div className="bg-[#caddff]" /></div>
        <div className="relative grid min-h-[19.004167cqw] grid-cols-2 max-[1000px]:grid-cols-1">
          <ScrollReveal className="business-reveal pl-[10.436458cqw] pt-[7.047917cqw] max-[1000px]:bg-linear-to-r max-[1000px]:from-babco-blue max-[1000px]:via-[#819bff] max-[1000px]:to-babco-blue max-[1000px]:px-6 max-[1000px]:pb-8 max-[1000px]:pt-10">
            <h2 id="future-food-title" className={`${display} business-step flex flex-col gap-[0.898438cqw] text-[1.900521cqw] leading-none text-white max-[1000px]:gap-2 max-[1000px]:text-[clamp(24px,4.5vw,36px)] max-[1000px]:leading-[1.2]`}><span>Technology Shaping</span><span>The Future of Food</span></h2>
          </ScrollReveal>
          <ScrollReveal className="business-reveal px-[2.810938cqw] pt-[5.413281cqw] max-[1000px]:bg-[#caddff] max-[1000px]:px-6 max-[1000px]:py-8">
            <p className={`${copy} business-step text-black`}>In the coming years, our innovation strategy will focus on
              <br className="max-[1000px]:hidden" /> advancing consumer-driven platforms that keep us ahead of
              <br className="max-[1000px]:hidden" /> evolving food trends. Through strong investment in R&D,
              <br className="max-[1000px]:hidden" /> sustainable packaging, and food science, we develop
              <br className="max-[1000px]:hidden" /> great-tasting products that align with changing lifestyles
              <br className="max-[1000px]:hidden" /> and position us to lead the future of food innovation.</p>
          </ScrollReveal>
        </div>
        <ScrollReveal className="relative ml-[3.858854cqw] mr-[3.385417cqw] h-[27.245833cqw] max-[1000px]:mx-6 max-[1000px]:mt-6 max-[1000px]:h-auto max-[1000px]:aspect-[16/9] max-[640px]:mx-4 max-[640px]:aspect-[4/3]">
          <figure className="brand-photo-hover relative size-full overflow-hidden rounded-[2.083333cqw] bg-[#a3c5c3] max-[1000px]:rounded-[24px]">
            <img src={`${images}future-food.webp`} alt="Fresh leafy vegetables moving through a modern automated food processing facility" width="1915" height="821" loading="lazy" className="absolute -left-[0.270664%] -top-[27.645666%] w-[100.270664%] max-w-none max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-cover" />
          </figure>
        </ScrollReveal>
      </section>
    </>
  );
}
