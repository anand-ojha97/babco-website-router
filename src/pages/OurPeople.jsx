import PageHero from "../components/PageHero.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import { leadership } from "../data/people.js";

const display = "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1000px]:leading-[1.2]";
const paragraph = "font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none]";
const profile = "font-profile tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none]";
const images = "/images/our-people/";

function LeaderCard({ name, credentials, role, image, width, height, crop, index }) {
  return (
    <li className="business-step" style={{ "--step-delay": `${index * 140}ms` }}>
      <article aria-labelledby={`leader-${index}`} className="brand-card-hover relative aspect-[407.5/523.17] overflow-hidden rounded-[1.5625cqw] border-[0.15625cqw] border-[#5ab1ff] bg-white max-[1000px]:rounded-[26px] max-[1000px]:border-2">
        <img src={`${images}${image}`} alt={`Portrait of ${name.replace(/ Partner$/, "")}`} width={width} height={height} loading="lazy" className="absolute max-w-none" style={crop} />
        <div className={`absolute inset-x-[1.041667cqw] bottom-[1.041667cqw] h-[4.852604cqw] rounded-[0.520833cqw] bg-white px-[0.520833cqw] text-center text-black max-[1000px]:inset-x-4 max-[1000px]:bottom-4 max-[1000px]:flex max-[1000px]:h-[96px] max-[1000px]:flex-col max-[1000px]:justify-center max-[1000px]:rounded-xl max-[1000px]:px-2 ${credentials ? "pt-[0.094792cqw]" : "pt-[0.685938cqw]"}`}>
          <h3 id={`leader-${index}`} className={`${profile} font-bold text-[1.302083cqw] uppercase leading-[1.2] max-[1000px]:text-[18px] max-[1000px]:leading-[1.2] max-[640px]:text-[clamp(15px,4.5vw,18px)]`}>
            {name}{credentials && <span className="block">{credentials}</span>}
          </h3>
          <p className={`${profile} font-normal text-[1.054688cqw] uppercase leading-[1.2] max-[1000px]:mt-2 max-[1000px]:text-[14px] max-[1000px]:leading-[1.3] max-[640px]:text-[clamp(12px,3.6vw,14px)] ${credentials ? "mt-[0.044271cqw]" : "mt-[0.424479cqw]"}`}>{role}</p>
        </div>
      </article>
    </li>
  );
}

export default function OurPeople() {
  return (
    <>
      <PageHero
        id="our-people"
        title="Our People"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#6e5136] max-[1000px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: `${images}people-hero.webp`,
          alt: "A team standing together in silhouette against a golden sunrise",
          width: "1672",
          height: "941",
          className: "absolute -left-[0.563558%] -top-[7.279144%] w-[101.333333%] max-w-none max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-cover max-[640px]:object-[50%_center]",
        }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/40"
        titleClassName={`${display} absolute inset-x-0 top-[79.838405%] text-center text-[4.289583cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1000px]:top-auto max-[1000px]:bottom-12 max-[1000px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14`}
      />

      <section id="leadership" aria-labelledby="leadership-title" className="relative bg-white min-[1001px]:h-[49.646875cqw] max-[1000px]:pb-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[24.841667cqw] bg-[#5ab1ff] max-[1000px]:hidden" aria-hidden="true" />
        <ScrollReveal className="business-reveal relative px-[3.385417cqw] pt-[3.966667cqw] text-white max-[1000px]:bg-[#5ab1ff] max-[1000px]:px-6 max-[1000px]:pb-12 max-[1000px]:pt-12">
          <h2 id="leadership-title" className={`${display} business-step text-[3.478125cqw] leading-none max-[1000px]:text-[clamp(32px,4.6vw,46px)]`}>Leadership</h2>
          <p className={`${paragraph} business-step ml-[0.225cqw] mt-[0.864063cqw] text-[1.822917cqw] leading-[1.2] max-[1000px]:ml-0 max-[1000px]:mt-5 max-[1000px]:text-base max-[1000px]:leading-[1.55]`} style={{ "--step-delay": "100ms" }}>
            Babco Foods is led by an experienced management team whose vision and hands-on leadership have driven
            <br className="max-[1000px]:hidden" /> the company’s consistent growth and strong presence in the U.S. food industry. Based in New Jersey, our
            <br className="max-[1000px]:hidden" /> leadership team has guided the company’s progress since its founding in 2002.
          </p>
        </ScrollReveal>
        <ScrollReveal className="business-reveal relative min-[1001px]:absolute min-[1001px]:left-[4.427083cqw] min-[1001px]:top-[18.878646cqw] min-[1001px]:w-[91.145833cqw] max-[1000px]:mx-6 max-[1000px]:mt-8 max-[640px]:mx-auto max-[640px]:w-[calc(100%_-_32px)] max-[640px]:max-w-[420px]">
          <ul className="grid grid-cols-4 gap-[2.083333cqw] max-[1000px]:grid-cols-2 max-[1000px]:gap-6 max-[640px]:grid-cols-1">
            {leadership.map((leader, index) => <LeaderCard key={leader.name} {...leader} index={index} />)}
          </ul>
        </ScrollReveal>
      </section>

      <section id="workforce" aria-labelledby="workforce-title" className="relative bg-white min-[1001px]:h-[34.728125cqw] max-[1000px]:pb-8">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[12.526042cqw] bg-linear-to-r from-babco-orange to-[#ed4100] max-[1000px]:h-[24%]" aria-hidden="true" />
        <ScrollReveal className="business-reveal relative min-[1001px]:absolute min-[1001px]:left-[43.49375cqw] min-[1001px]:top-[4.054167cqw] min-[1001px]:w-[53.645833cqw] max-[1000px]:px-6 max-[1000px]:pt-2 max-[1000px]:pb-8">
          <h2 id="workforce-title" className={`${display} business-step text-[3.478125cqw] leading-none text-[#e73d00] max-[1000px]:text-[clamp(32px,4.6vw,46px)]`}>Workforce</h2>
          <div className={`${paragraph} ml-[0.159896cqw] mt-[0.802188cqw] space-y-[1.666667cqw] text-[1.302083cqw] leading-[1.28] text-black max-[1000px]:ml-0 max-[1000px]:mt-5 max-[1000px]:space-y-5 max-[1000px]:text-base max-[1000px]:leading-[1.55]`}>
            <p className="business-step" style={{ "--step-delay": "90ms" }}>Our culture is founded on three guiding pillars: Responsibility, Operational Excellence,
              <br className="max-[1000px]:hidden" /> and Innovation. These values influence every decision we make and support ongoing
              <br className="max-[1000px]:hidden" /> improvement across the business.</p>
            <p className="business-step" style={{ "--step-delay": "190ms" }}>We encourage our teams to think creatively and take initiative, cultivating an innovative
              <br className="max-[1000px]:hidden" /> mindset while staying committed to accountability, sustainability, and ethical operations
              <br className="max-[1000px]:hidden" /> as we adapt to our customers’ changing needs.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal className="relative min-[1001px]:absolute min-[1001px]:left-[9.322917cqw] min-[1001px]:top-[0.939583cqw] min-[1001px]:h-[32.411458cqw] min-[1001px]:w-[30.988542cqw] max-[1000px]:mx-auto max-[1000px]:aspect-[594.98/622.3] max-[1000px]:w-[min(78%,440px)]">
          <figure className="brand-photo-hover relative size-full overflow-hidden rounded-b-[1.498438cqw] max-[1000px]:rounded-b-[26px]">
            <div className="absolute inset-x-0 bottom-0 top-[5.457175%] rounded-[1.498438cqw] bg-[#ffe9c6] max-[1000px]:rounded-[26px]" aria-hidden="true" />
            <div className="business-image-layer absolute inset-0">
              <img src={`${images}workforce-specialist.webp`} alt="A smiling operations specialist wearing a yellow hard hat and safety vest" width="1218" height="1571" loading="lazy" className="absolute left-[6.990151%] top-0 w-[82.086793%] max-w-none" />
            </div>
          </figure>
        </ScrollReveal>
      </section>
    </>
  );
}
