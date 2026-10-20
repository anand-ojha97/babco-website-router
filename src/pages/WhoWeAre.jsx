import { Link } from "react-router";
import PageHero from "../components/PageHero.jsx";
import CountUp from "../components/CountUp.jsx";
import { ArrowUpRight } from "lucide-react";

const display =
  "font-about-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1000px]:leading-[1.2]";
const paragraphMetrics =
  "font-paragraph tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] text-[1.302083cqw] leading-[1.2] max-[1000px]:text-base max-[1000px]:leading-[1.55]";
const copy = `${paragraphMetrics} font-semibold`;
const caption = `${paragraphMetrics} font-medium`;

function PageLink({ href, children, light = false }) {
  return (
    <Link
      to={href}
      className={`action-hover inline-flex w-fit items-center gap-[0.6cqw] rounded-full px-[0.8333cqw] py-[0.45cqw] font-sans text-[0.96cqw] font-bold leading-[1.4] max-[1000px]:gap-2 max-[1000px]:px-4 max-[1000px]:py-2 max-[1000px]:text-sm ${light ? "bg-white text-[#0f440e] hover:bg-[#ffebc8]" : "bg-babco-blue text-[#0036ae] hover:bg-[#caddff]"}`}
    >
      Go to Page <span className="sr-only">: {children}</span>
      <ArrowUpRight
        className="size-[1.05cqw] max-[1000px]:size-[18px]"
        aria-hidden="true"
      />
    </Link>
  );
}

function Statement({ id, title, lines, children, mission = false }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`px-[3.3854cqw] py-[3.3854cqw] min-[1001px]:min-h-[49.6354cqw] max-[1000px]:px-6 max-[1000px]:py-8 max-[640px]:px-4 ${mission ? "bg-babco-blue" : "bg-[#ffebc8]"}`}
    >
      <div
        className={`flex flex-col rounded-[3.125cqw] pb-[1.3021cqw] pt-[2.98cqw] min-[1001px]:min-h-[42.8646cqw] max-[1000px]:rounded-[28px] max-[1000px]:p-6 max-[640px]:p-4 ${mission ? "bg-linear-to-r from-[#1d5dff] to-[#0036ae]" : "bg-linear-to-r from-babco-orange to-[#eb3700]"}`}
      >
        <h2 data-reveal
          id={`${id}-title`}
          className={`${display} mx-[2.8542cqw] text-[3.478125cqw] leading-none text-white max-[1000px]:mx-0 max-[1000px]:text-[clamp(25px,4.6vw,45px)] ${mission ? "self-end max-[1000px]:self-start" : "self-start"}`}
        >
          {title}
        </h2>
        <div
          className={`mt-[2.72396cqw] w-[70.5859cqw] rounded-[1.8229cqw] px-[3.127cqw] pb-[3.08cqw] pt-[3.46198cqw] max-[1000px]:mt-6 max-[1000px]:w-full max-[1000px]:rounded-[20px] max-[1000px]:px-6 max-[1000px]:py-7 max-[640px]:px-5 ${mission ? "ml-[1.3297cqw] mr-auto bg-[#caddff] max-[1000px]:ml-0" : "ml-auto mr-[1.3297cqw] bg-[#ffebc8] max-[1000px]:mr-0"}`}
        >
          <h3 data-reveal
            className={`${display} flex flex-col gap-[1.69cqw] text-[3.478125cqw] leading-none text-black max-[1000px]:gap-2 max-[1000px]:text-[clamp(24px,4.6vw,45px)] max-[640px]:text-[clamp(17px,5.3vw,30px)]`}
          >
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h3>
          <div
            className={`${copy} mx-[0.2552cqw] mt-[3.06cqw] max-w-[62.5cqw] space-y-[1.5625cqw] text-black max-[1000px]:mx-0 max-[1000px]:mt-6 max-[1000px]:max-w-none max-[1000px]:space-y-5`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WhoWeAre() {
  return (
    <>
      <PageHero
        id="who-we-are"
        title="Who We Are"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#87979b] max-[1000px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: "/images/who-we-are/hero-truck.webp",
          alt: "A BABCO delivery truck travelling along a highway",
          width: "1366",
          height: "763",
          className: "absolute -left-[0.4734%] -top-[5.8846%] h-[115.2403%] w-[102.4833%] max-w-none object-cover max-[1000px]:inset-0 max-[1000px]:size-full max-[640px]:object-[51%_center]",
        }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/15 to-black/45"
        titleClassName={`${display} absolute inset-x-0 top-[79.7954%] text-center text-[4.28958cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1000px]:top-auto max-[1000px]:bottom-12 max-[1000px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14`}
      />

      <section
        id="our-company"
        aria-labelledby="company-title"
        className="relative px-[3.3854cqw] pb-[4.375cqw] pt-[4.1604cqw] min-[1001px]:min-h-[49.6354cqw] max-[1000px]:px-6 max-[1000px]:py-12 max-[640px]:px-4"
      >
        <div
          className="absolute inset-x-0 top-0 h-1/2 bg-[#f7f5f3]"
          aria-hidden="true"
        />
        <div className="relative text-center">
          <h2 data-reveal
            id="company-title"
            className={`${display} text-[3.478125cqw] leading-none text-babco-blue max-[1000px]:mx-auto max-[1000px]:max-w-[760px] max-[1000px]:text-[clamp(27px,4.5vw,46px)] max-[1000px]:leading-[1.25]`}
          >
            Moving Food Forward Since 2002
          </h2>
          <p data-reveal
            className={`${copy} mx-auto mt-[1.25cqw] max-w-[84cqw] text-black max-[1000px]:mt-5 max-[1000px]:max-w-[750px]`}
          >
            Built on generations of trust, we remain focused on meeting our
            customers’ needs and expectations. This enduring commitment drives
            us to
            <br className="max-[1000px]:hidden" /> consistently deliver quality,
            reliability, and value in everything we offer, today and for
            generations to come.
          </p>
          <figure data-reveal className="brand-photo-hover mx-auto mt-[3.6979cqw] w-[86.3589cqw] overflow-hidden rounded-[2.0833cqw] max-[1000px]:mt-8 max-[1000px]:w-full max-[1000px]:rounded-[24px]">
            <img
              src="/images/who-we-are/retail-partners.webp"
              alt="A BABCO representative and a retailer talking in a grocery store"
              width="2941"
              height="1263"
              loading="lazy"
              className="h-[22.2396cqw] w-full object-cover object-[center_47%] max-[1000px]:h-auto max-[1000px]:aspect-[2/1] max-[640px]:aspect-[4/3]"
            />
            <figcaption
              className={`${caption} flex min-h-[7.4073cqw] items-center justify-center bg-linear-to-r from-babco-blue to-[#69a9ff] px-[2.5cqw] py-[1.25cqw] text-white max-[1000px]:px-6 max-[1000px]:py-6 max-[640px]:px-5`}
            >
              <p data-reveal className="max-w-[81cqw] max-[1000px]:max-w-none">
                We work with retailers of all sizes, serving South and North
                Indian stores across the US, as well as non-Indian retailers and
                supermarkets with diverse customer bases. Our wide distribution
                network, guided by ethics and integrity, drives the strong
                growth of Babco and the brands we represent.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="babco-story"
        aria-labelledby="story-title"
        className="grid grid-cols-[46.212%_1fr] gap-[3.3854cqw] px-[3.3854cqw] pb-[3.3854cqw] pt-[3.3854cqw] min-[1001px]:min-h-[49.6354cqw] max-[1000px]:grid-cols-1 max-[1000px]:gap-7 max-[1000px]:px-6 max-[1000px]:pb-12 max-[1000px]:pt-8 max-[640px]:px-4"
      >
        <div data-reveal className="brand-photo-hover relative aspect-[827.19/817.95] overflow-hidden rounded-[2.0833cqw] max-[1000px]:aspect-[4/3] max-[1000px]:max-h-[520px] max-[1000px]:rounded-[24px]">
          <img
            src="/images/who-we-are/babco-team.webp"
            alt="The BABCO warehouse team standing together at a distribution centre"
            width="2528"
            height="1696"
            loading="lazy"
            className="absolute -left-[53.2864%] -top-[15.7088%] w-[174.1994%] max-w-none max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-cover max-[1000px]:object-[65%_center]"
          />
        </div>
        <div className="flex flex-col items-start pt-[0.669cqw] max-[1000px]:pt-0">
          <h2 data-reveal
            id="story-title"
            className={`${display} text-[3.478125cqw] leading-none text-babco-blue max-[1000px]:text-[clamp(30px,4.6vw,46px)]`}
          >
            Babco Story
          </h2>
          <div
            className={`${copy} mt-[1.55cqw] max-w-[43.3cqw] space-y-[1.5625cqw] text-black max-[1000px]:mt-5 max-[1000px]:max-w-none max-[1000px]:space-y-5`}
          >
            <p data-reveal>
              Babco Foods was founded in New Jersey in 2002 by Bob and Olivia
              Vaz, beginning with the import and distribution of high-quality
              Anand brand snack products from Kerala and Karnataka, India.
              Strong customer response, efficient logistics, and responsive
              service drove rapid growth across the northeastern US.
            </p>
            <p data-reveal>
              Today, Babco Foods operates four strategically located
              distribution centers, serving <CountUp value="46" /> US states. We represent several
              brands as exclusive US distributors and are a trusted partner for
              internationally recognized companies entering the US market.
            </p>
          </div>
          <div className="mt-auto pt-8">
            <PageLink href="/babco-story/">Read the full Babco Story</PageLink>
          </div>
        </div>
      </section>

      <Statement
        id="vision"
        title="Our Vision"
        lines={["Better Food.", "Better Future."]}
      >
        <p data-reveal>
          Better food begins with responsible sourcing, consistent quality, and
          thoughtful distribution. We work closely with trusted partners to
          ensure products meet established standards for safety, reliability,
          and performance at every stage of the supply chain. Through efficient
          logistics and careful handling, we strive to preserve product
          integrity while delivering value to retailers and consumers alike.
        </p>
        <p data-reveal>
          By prioritizing transparency, long-term partnerships, and continuous
          improvement, we aim to support healthier choices today and adapt to
          evolving market needs. Our approach is focused on building a resilient
          and sustainable food ecosystem—one that balances quality,
          accountability, and responsible growth for the future.
        </p>
      </Statement>

      <Statement
        id="mission"
        title="Our Mission"
        lines={["Authentic Taste.", "Global Presence."]}
        mission
      >
        <p data-reveal>
          Our mission is to serve the South Indian diaspora worldwide with
          authentically sourced, safe, and world-class food products. We partner
          with trusted producers who share our commitment to quality, ensuring
          that every product meets rigorous standards for safety, consistency,
          and authenticity while staying true to traditional South Indian
          flavors.
        </p>
        <p data-reveal>
          Through efficient distribution, reliable logistics, and a focus on
          long-term partnerships, we work to make these products widely
          accessible across global markets. By continuously improving our
          processes and responding to evolving consumer needs, we aim to
          preserve culinary heritage while delivering dependable, high-quality
          food experiences for communities around the world.
        </p>
      </Statement>

      <section
        id="operation"
        aria-labelledby="operation-title"
        className="scenic-hover relative flex min-h-[49.6354cqw] flex-col items-start overflow-hidden bg-[#63812e] px-[7.8271cqw] pb-[3.3854cqw] pt-[5.1641cqw] text-white max-[1000px]:min-h-[600px] max-[1000px]:px-8 max-[1000px]:py-12 max-[640px]:min-h-[620px] max-[640px]:px-6"
      >
        <img
          src="/images/who-we-are/operations-field.webp"
          alt="Agricultural machinery tending a green field, illustrating the start of the food supply chain"
          width="3308"
          height="2205"
          loading="lazy"
          className="absolute inset-x-0 bottom-[-8.4829%] h-[134.3127%] w-full max-w-none object-cover max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-[50%_center]"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-black/10 max-[1000px]:from-black/55 max-[1000px]:via-black/10 max-[1000px]:to-black/15"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 data-reveal
            id="operation-title"
            className={`${display} text-[4.28958cqw] leading-none max-[1000px]:text-[clamp(36px,5.4vw,60px)]`}
          >
            Operation
          </h2>
          <p data-reveal
            className={`${copy} mt-[1.5cqw] max-w-[62cqw] max-[1000px]:mt-5 max-[1000px]:max-w-[700px]`}
          >
            Our operations are built to ensure efficiency, reliability, and
            consistency across every stage of the supply chain. From sourcing
            and warehousing to order fulfillment and distribution, we follow
            structured processes that support timely delivery and product
            integrity.
          </p>
        </div>
        <div className="relative mt-auto pt-12">
          <PageLink href="/operations/" light>
            Explore our distribution operations
          </PageLink>
        </div>
      </section>
    </>
  );
}
