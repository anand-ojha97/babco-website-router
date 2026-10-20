import PageHero from "../components/PageHero.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import CountUp from "../components/CountUp.jsx";
import { salesStats, warehouseStages, logisticsSteps, qualityStats } from "../data/business.js";

const display =
  "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1000px]:leading-[1.2]";
const paragraph =
  "font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none]";
const copy = `${paragraph} text-[1.302083cqw] leading-[1.28] max-[1000px]:text-base max-[1000px]:leading-[1.55]`;
const images = "/images/our-business/";

function BusinessStat({ value, lines, index }) {
  return (
    <div className="business-step" style={{ "--step-delay": `${index * 110}ms` }}>
      <p className={`${display} text-[2.478125cqw] leading-none text-white max-[1000px]:text-[clamp(32px,5vw,48px)] max-[640px]:text-[clamp(24px,7vw,38px)]`}><CountUp value={value} /></p>
      <p className={`${paragraph} mt-[0.75cqw] flex flex-col text-[clamp(12px,0.604167cqw,14px)] leading-[1.4] text-white max-[1000px]:mt-3`}>
        {lines.map((line) => <span key={line}>{line}</span>)}
      </p>
    </div>
  );
}

function WarehousePhoto() {
  return (
    <figure className="brand-photo-hover warehouse-photo relative size-full overflow-hidden rounded-[3.125cqw] max-[1000px]:rounded-[28px]" aria-label="Babco warehouse and distribution facility">
      <div className="business-image-layer relative size-full">
        <div className="absolute inset-x-0 bottom-0 top-[15.789%] overflow-hidden rounded-[3.125cqw] max-[1000px]:rounded-[28px]">
          <img src={`${images}warehouse-context.webp`} alt="" width="1536" height="1024" loading="lazy" className="absolute -left-[54.435%] -top-[37.86%] w-[168.78%] max-w-none" />
        </div>
        <img src={`${images}warehouse-cutout.webp`} alt="Babco’s warehouse with branded exterior and loading bays" width="2007" height="1174" loading="lazy" className="absolute -left-[57.598%] top-[1.5545%] w-[174.2255%] max-w-none" />
      </div>
    </figure>
  );
}

function QualityPhoto() {
  return (
    <figure className="brand-photo-hover relative h-[39.21875cqw] w-full overflow-hidden rounded-br-[15.9286cqw] rounded-tl-[15.9286cqw] bg-[#bad6d3] max-[1000px]:aspect-[760/753] max-[1000px]:h-auto max-[1000px]:rounded-br-[40%] max-[1000px]:rounded-tl-[40%]">
      <div className="business-image-layer relative size-full max-[1000px]:absolute max-[1000px]:inset-0">
        <img src={`${images}quality-field.webp`} alt="" width="2200" height="1272" loading="lazy" className="absolute -left-[42.8947%] -top-[0.4714%] h-[100%] w-[171.0526%] max-w-none object-cover" />
        <img src={`${images}quality-specialist.webp`} alt="A food quality specialist with a microscope against a green agricultural field" width="1338" height="1333" loading="lazy" className="absolute -left-[0.88947%] top-[11.757%] w-[88.0263%] max-w-none -scale-x-100" />
      </div>
    </figure>
  );
}

export default function OurBusiness() {
  return (
    <>
      <PageHero
        id="our-business"
        title="Our Business"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#15323f] max-[1000px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: `${images}hero-growth.webp`,
          alt: "A business professional studying a digital growth chart",
          width: "2200",
          height: "1354",
          className: "absolute -left-[8.591146%] top-0 h-[147.175%] w-[118.75%] max-w-none object-cover max-[1000px]:inset-0 max-[1000px]:size-full max-[640px]:object-[43%_center]",
        }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/45"
        titleClassName={`${display} absolute inset-x-0 top-[79.7954%] text-center text-[4.28958cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1000px]:top-auto max-[1000px]:bottom-12 max-[1000px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14 max-[640px]:text-[clamp(30px,7vw,54px)]`}
      />

      <section id="sales" aria-labelledby="sales-title" className="relative bg-white min-[1001px]:h-[49.635417cqw] max-[1000px]:pt-8">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-r from-[#ff6420] to-[#ed4100] max-[1000px]:hidden" aria-hidden="true" />
        <ScrollReveal className="business-reveal min-[1001px]:absolute min-[1001px]:left-[3.3854cqw] min-[1001px]:top-[3.3854cqw] min-[1001px]:h-[42.6016cqw] min-[1001px]:w-[43.0828cqw] max-[1000px]:mx-6 max-[1000px]:aspect-[4/3] max-[1000px]:max-h-[560px] max-[640px]:mx-4">
          <figure className="brand-photo-hover relative size-full overflow-hidden rounded-[2.0833cqw] bg-[#e5e4df] max-[1000px]:rounded-[26px]">
            <img src={`${images}sales-growth.webp`} alt="Wooden SALES blocks with a red arrow rising above them" width="2200" height="1711" loading="lazy" className="absolute -left-[21.176%] -top-[2.818%] w-[133.695%] max-w-none max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-cover" />
          </figure>
        </ScrollReveal>
        <ScrollReveal className="business-reveal min-[1001px]:absolute min-[1001px]:left-[49.6208cqw] min-[1001px]:top-[4.054687cqw] min-[1001px]:w-[43cqw] max-[1000px]:px-6 max-[1000px]:py-8">
          <h2 id="sales-title" className={`${display} business-step text-[3.478125cqw] leading-none text-[#e83e00] max-[1000px]:text-[clamp(32px,4.6vw,46px)]`}>Sales</h2>
          <div className={`${copy} mt-[1.2729cqw] space-y-[1.666667cqw] text-black max-[1000px]:mt-5 max-[1000px]:space-y-5`}>
            <p className="business-step" style={{ "--step-delay": "80ms" }}>
              Developing genuine relationships with our customers is a core value
              <br className="max-[1000px]:hidden" /> that shapes how we do business. We focus on trust, transparency,
              <br className="max-[1000px]:hidden" /> and understanding to build strong, long-term partnerships rather
              <br className="max-[1000px]:hidden" /> than short-term transactions.
            </p>
            <p className="business-step" style={{ "--step-delay": "160ms" }}>
              Through open communication, reliable service, and proactive
              <br className="max-[1000px]:hidden" /> engagement, we deliver consistent value and grow together
              <br className="max-[1000px]:hidden" /> with our customers over time.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal className="business-reveal min-[1001px]:absolute min-[1001px]:left-[50.6302cqw] min-[1001px]:top-[28.3526cqw] min-[1001px]:w-[36cqw] max-[1000px]:bg-linear-to-r max-[1000px]:from-[#ff6420] max-[1000px]:to-[#ed4100] max-[1000px]:px-6 max-[1000px]:py-10">
          <div className="grid grid-cols-[14.44cqw_1fr] gap-y-[2.9cqw] max-[1000px]:grid-cols-2 max-[1000px]:gap-x-5 max-[1000px]:gap-y-9">
            {salesStats.map((stat, index) => <BusinessStat key={stat.value} {...stat} index={index} />)}
          </div>
        </ScrollReveal>
      </section>

      <section id="warehousing" aria-labelledby="warehousing-title" className="relative bg-white min-[1001px]:h-[49.635417cqw] max-[1000px]:pt-10">
        <div className="business-gradient absolute inset-x-0 bottom-0 top-[13.125cqw] max-[1000px]:hidden" aria-hidden="true" />
        <ScrollReveal className="min-[1001px]:absolute min-[1001px]:left-[3.7328cqw] min-[1001px]:top-[3.10885cqw] max-[1000px]:px-6">
          <h2 id="warehousing-title" className={`${display} text-[3.915104cqw] leading-none text-babco-blue max-[1000px]:text-[clamp(30px,4.6vw,46px)] max-[640px]:text-[clamp(25px,6.8vw,34px)]`}>Warehousing</h2>
        </ScrollReveal>
        <ScrollReveal className="min-[1001px]:absolute min-[1001px]:left-[38.9583cqw] min-[1001px]:top-[3.0729cqw] min-[1001px]:h-[43.5906cqw] min-[1001px]:w-[57.3969cqw] max-[1000px]:mx-6 max-[1000px]:mt-7 max-[1000px]:aspect-[1102/837] max-[640px]:mx-4">
          <WarehousePhoto />
        </ScrollReveal>
        <ScrollReveal className="business-reveal business-warehouse-copy min-[1001px]:absolute min-[1001px]:left-[3.7328cqw] min-[1001px]:top-[15.8656cqw] min-[1001px]:w-[32cqw] max-[1000px]:px-6 max-[1000px]:pb-12 max-[1000px]:pt-8">
          <div className="space-y-[3.69cqw] max-[1000px]:space-y-7">
            {warehouseStages.map(({ title, text }, index) => (
              <div key={title} className="business-step" style={{ "--step-delay": `${index * 120}ms` }}>
                <h3 className={`${display} text-[1.970833cqw] leading-none text-white max-[1000px]:text-[27px]`}>{title}</h3>
                <p className={`${paragraph} mt-[0.528cqw] text-[1.041667cqw] leading-[1.2] text-white max-[1000px]:mt-3 max-[1000px]:text-base max-[1000px]:leading-[1.5]`}>{text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="business-logistics" aria-labelledby="logistics-title" className="business-gradient relative overflow-hidden min-[1001px]:h-[49.635417cqw] max-[1000px]:pt-8">
        <ScrollReveal className="business-reveal relative min-[1001px]:h-[10.9375cqw] min-[1001px]:px-[3.7328cqw] min-[1001px]:pt-[1.65885cqw] max-[1000px]:px-6">
          <h2 id="logistics-title" className={`${display} business-step text-[3.478125cqw] leading-none text-white max-[1000px]:text-[clamp(32px,4.6vw,46px)]`}>Logistics</h2>
          <p className={`${paragraph} business-step mt-[1.0115cqw] text-[1.822917cqw] leading-[1.2] text-white max-[1000px]:mt-5 max-[1000px]:text-base max-[1000px]:leading-[1.55]`} style={{ "--step-delay": "100ms" }}>
            Our logistics ensure efficient storage, accurate order handling, and on-time delivery while maintaining
            <br className="max-[1000px]:hidden" /> product quality and supply reliability.
          </p>
        </ScrollReveal>
        <div className="relative min-[1001px]:h-[38.697917cqw] min-[1001px]:overflow-hidden">
          <ScrollReveal className="pointer-events-none absolute inset-0 max-[1000px]:hidden">
            <img src={`${images}logistics-truck.webp`} alt="A refrigerated truck in a shipping container yard at dusk" width="2001" height="1092" loading="lazy" className="reveal-truck absolute left-0 top-[-2.180208cqw] w-full max-w-none" />
          </ScrollReveal>
          <ScrollReveal className="business-reveal relative z-10 min-[1001px]:absolute min-[1001px]:left-[3.645833cqw] min-[1001px]:top-[4.166667cqw] min-[1001px]:w-[93.072917cqw] max-[1000px]:mx-auto max-[1000px]:mt-8 max-[1000px]:w-[calc(100%_-_48px)]">
            <ol className="grid grid-cols-5 gap-[0.9375cqw] max-[1000px]:grid-cols-2 max-[1000px]:gap-5 max-[640px]:grid-cols-1 max-[640px]:gap-4">
              {logisticsSteps.map(({ title, lines }, index) => (
                <li key={title.join(" ")} className="business-step" style={{ "--step-delay": `${index * 130}ms` }}>
                  <div className="business-process-card relative h-[15.416667cqw] rounded-[1.354167cqw] px-[0.9cqw] pt-[0.694531cqw] text-center text-white max-[1000px]:h-full max-[1000px]:min-h-[180px] max-[1000px]:rounded-[22px] max-[1000px]:px-5 max-[1000px]:py-6">
                    <h3 className={`${paragraph} flex min-h-[3.375cqw] flex-col justify-center text-[1.489583cqw] uppercase leading-[1.132867] max-[1000px]:min-h-0 max-[1000px]:text-[20px] max-[640px]:text-[22px]`}>{title.map((line) => <span key={line}>{line}</span>)}</h3>
                    <p className={`${paragraph} mt-[0.524219cqw] text-[0.677083cqw] leading-[1.2] max-[1000px]:mt-4 max-[1000px]:text-[14px] max-[1000px]:leading-[1.5]`}>{lines.map((line, lineIndex) => <span key={line} className="min-[1001px]:block">{line}{lineIndex < lines.length - 1 ? " " : ""}</span>)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollReveal>
          <ScrollReveal className="relative mt-3 hidden aspect-[1920/743] overflow-hidden max-[1000px]:block" aria-hidden="true">
            <img src={`${images}logistics-truck.webp`} alt="" width="2001" height="1092" loading="lazy" className="reveal-truck absolute left-0 top-[-5.634%] w-full max-w-none" />
          </ScrollReveal>
        </div>
      </section>

      <section id="food-safety-quality" aria-labelledby="quality-title" className="relative grid grid-cols-2 bg-[#0f440e] min-[1001px]:h-[49.635417cqw] max-[1000px]:grid-cols-1">
        <div className="bg-[#3b6420] p-[5.208333cqw] max-[1000px]:p-6 max-[640px]:p-4">
          <ScrollReveal className="h-full"><QualityPhoto /></ScrollReveal>
        </div>
        <ScrollReveal className="business-reveal relative text-[#bfde7d] max-[1000px]:px-6 max-[1000px]:py-10">
          <h2 id="quality-title" className={`${display} business-step flex flex-col gap-[1.63151cqw] text-[3.451823cqw] leading-none min-[1001px]:absolute min-[1001px]:left-[4.0943cqw] min-[1001px]:top-[5.7578cqw] max-[1000px]:gap-2 max-[1000px]:text-[clamp(34px,6vw,58px)] max-[1000px]:leading-[1.2]`}>
            <span>Food</span><span className="text-[#8ebc29]">Safety &</span><span>Quality</span>
          </h2>
          <p className={`${copy} business-step leading-[1.4] min-[1001px]:absolute min-[1001px]:left-[4.22448cqw] min-[1001px]:top-[22.5307cqw] min-[1001px]:w-[37.5cqw] max-[1000px]:mt-8`} style={{ "--step-delay": "110ms" }}>
            We strictly adhere to FDA regulations and U.S. food safety
            <br className="max-[1000px]:hidden" /> standards across sourcing, storage, and distribution,
            <br className="max-[1000px]:hidden" /> ensuring every product meets the highest quality,
            <br className="max-[1000px]:hidden" /> compliance, and safety requirements.
          </p>
          <div className="grid grid-cols-[18.3448cqw_1fr] min-[1001px]:absolute min-[1001px]:left-[4.0943cqw] min-[1001px]:top-[38.10833cqw] min-[1001px]:w-[43cqw] max-[1000px]:mt-12 max-[1000px]:grid-cols-2 max-[1000px]:gap-5">
            {qualityStats.map((stat, index) => <BusinessStat key={stat.value} {...stat} index={index + 2} />)}
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
