import CountUp from "../components/CountUp.jsx";
import { useEffect, useRef } from "react";
import { connectHistoryTimeline } from "../components/historyMotion.js";
import StoryBannerVideo from "../components/StoryBannerVideo.jsx";
import { milestones, values } from "../data/story.js";

const display =
  "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1000px]:leading-[1.2]";
const copy =
  "font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] text-[1.302083cqw] leading-[1.2] max-[1000px]:text-base max-[1000px]:leading-[1.55]";

function HistoryTimeline() {
  const timeline = useRef(null);

  useEffect(() => connectHistoryTimeline(timeline.current), []);

  return (
    <section
      ref={timeline}
      id="our-history"
      aria-label="Babco Foods history, 2002 to 2024"
      className="history-timeline relative bg-white min-[1001px]:h-[155.78125cqw] max-[1000px]:px-6 max-[1000px]:py-14 max-[640px]:px-5"
    >
      <ol
        className="history-list relative min-[1001px]:h-full max-[1000px]:pb-1"
        style={{
          "--timeline-gradient":
            "linear-gradient(to bottom,#1d62ff 0%,#662d8f 14.2857%,#d40e8c 28.5714%,#f26f26 42.8571%,#dc1351 57.1429%,#662d8f 71.4286%,#d40e8c 85.7143%,#1d62ff 100%)",
        }}
      >
        {milestones.map(({ year, lines, color, top, marker }) => (
          <li
            key={year}
            data-milestone={year}
            className="relative min-[1001px]:absolute min-[1001px]:inset-x-0 min-[1001px]:top-(--milestone-top) min-[1001px]:grid min-[1001px]:grid-cols-[21.77448cqw_1fr] min-[1001px]:pl-[22.239583cqw] min-[1001px]:pr-[5cqw] max-[1000px]:pb-14 max-[1000px]:pl-11 max-[1000px]:last:pb-0"
            style={{
              color,
              "--milestone-top": `${top / 19.2}cqw`,
              "--marker-top": `${(marker - top - 21) / 19.2}cqw`,
            }}
          >
            <span
              aria-hidden="true"
              className="history-marker absolute left-[38.70156cqw] top-(--marker-top) size-[2.1875cqw] rounded-full border-[0.260417cqw] border-current bg-white max-[1000px]:left-[2px] max-[1000px]:top-[7px] max-[1000px]:size-5 max-[1000px]:border-[3px]"
            />
            <time
              dateTime={year}
              className={`history-year ${display} text-[3.478125cqw] leading-none max-[1000px]:block max-[1000px]:text-[34px] max-[640px]:text-[30px]`}
            >
              {year}
            </time>
            <h2 data-reveal
              className={`history-event ${display} flex flex-col gap-[1.0734375cqw] text-[1.7390625cqw] leading-none min-[1001px]:-translate-y-[0.0125cqw] max-[1000px]:mt-5 max-[1000px]:gap-1.5 max-[1000px]:text-[clamp(17px,2.8vw,25px)] max-[1000px]:leading-[1.2] max-[640px]:text-[clamp(14px,3.7vw,21px)]`}
            >
              {lines.map((line) => (
                <span key={line}>{line === "Area to 26 US States" ? <>Area to <CountUp value="26" /> US States</> : line} </span>
              ))}
            </h2>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function BabcoStory() {
  return (
    <>
      <section
        id="babco-story"
        aria-labelledby="babco-story-title"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#83938c] max-[1000px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
      >
        <StoryBannerVideo />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/5 via-black/15 to-black/45"
          aria-hidden="true"
        />
        <h1
          id="babco-story-title"
          className={`${display} absolute left-[28.44323cqw] top-[39.60667cqw] text-[4.289688cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1000px]:inset-x-4 max-[1000px]:top-auto max-[1000px]:bottom-12 max-[1000px]:text-center max-[1000px]:text-[clamp(30px,5.4vw,65px)] max-[640px]:bottom-14`}
        >
          Babco Story
        </h1>
      </section>

      <section
        id="moving-food-forward"
        aria-labelledby="moving-food-title"
        className="relative bg-[#fefefe] pb-[3.3854cqw] min-[1001px]:h-[49.635417cqw] max-[1000px]:pb-8"
      >
        <div
          className="absolute inset-x-0 top-0 grid h-1/2 grid-cols-2"
          aria-hidden="true"
        >
          <div className="bg-linear-to-r from-[#ff6420] to-[#ed4100]" />
          <div className="bg-[#ffebc7]" />
        </div>
        <div className="relative grid min-h-[19.004167cqw] grid-cols-2 max-[1000px]:grid-cols-1">
          <div className="pl-[10.43698cqw] pt-[7.191667cqw] max-[1000px]:bg-linear-to-r max-[1000px]:from-[#ff6420] max-[1000px]:to-[#ed4100] max-[1000px]:px-6 max-[1000px]:pb-8 max-[1000px]:pt-10">
            <h2 data-reveal
              id="moving-food-title"
              className={`${display} flex flex-col gap-[0.898385cqw] text-[1.900625cqw] leading-none text-white max-[1000px]:gap-2 max-[1000px]:text-[clamp(24px,4.7vw,36px)] max-[1000px]:leading-[1.2] max-[640px]:text-[clamp(19px,5.5vw,32px)]`}
            >
              <span>Moving Food</span>
              <span>Forward Since 2002</span>
            </h2>
          </div>
          <div className="pl-[2.810938cqw] pr-[3.3854cqw] pt-[5.413802cqw] max-[1000px]:bg-[#ffebc7] max-[1000px]:px-6 max-[1000px]:py-8">
            <p data-reveal
              className={`${copy} max-w-[37.5cqw] text-black max-[1000px]:max-w-none`}
            >
              Guided by a legacy of trust built over generations, we stay
              <br className="max-[1000px]:hidden" /> committed to understanding
              and fulfilling our customers’
              <br className="max-[1000px]:hidden" /> expectations. This
              unwavering focus enables us to offer
              <br className="max-[1000px]:hidden" /> products and services
              defined by quality, reliability, and
              <br className="max-[1000px]:hidden" /> enduring value for years to
              come.
            </p>
          </div>
        </div>
        <figure data-reveal className="brand-photo-hover relative ml-[3.858854cqw] mr-[3.385417cqw] h-[27.245833cqw] overflow-hidden rounded-[2.083333cqw] bg-[#918b6a] max-[1000px]:mx-6 max-[1000px]:mt-6 max-[1000px]:h-auto max-[1000px]:aspect-[16/9] max-[1000px]:rounded-[24px] max-[640px]:mx-4 max-[640px]:aspect-[4/3]">
          <img
            src="/images/babco-story/grocery-partnership.webp"
            alt="A grocery store owner helping a customer choose fresh produce"
            width="2595"
            height="1102"
            loading="lazy"
            className="absolute -left-[0.67325%] -top-[10.50237%] w-[102.19495%] max-w-none max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-cover"
          />
        </figure>
      </section>

      <section
        id="our-values"
        aria-labelledby="positive-change-title"
        className="relative grid grid-cols-2 bg-[#0f440e] min-[1001px]:h-[49.635417cqw] max-[1000px]:grid-cols-1"
      >
        <div className="bg-[#3b6420] py-[5.208333cqw] max-[1000px]:p-6 max-[640px]:p-4">
          <figure data-reveal className="brand-photo-hover relative h-[39.21875cqw] overflow-hidden max-[1000px]:h-auto max-[1000px]:aspect-[4/3] max-[1000px]:rounded-[24px]">
            <img
              src="/images/babco-story/nurturing-growth.webp"
              alt="Hands holding soil and a young green seedling"
              width="3960"
              height="2640"
              loading="lazy"
              className="absolute -left-[19.479167%] -top-[10.25365%] w-[141.9%] max-w-none max-[1000px]:inset-0 max-[1000px]:size-full max-[1000px]:object-cover"
            />
          </figure>
        </div>
        <div className="relative text-[#bfde7d] max-[1000px]:px-6 max-[1000px]:py-10">
          <h2 data-reveal
            id="positive-change-title"
            className={`${display} flex flex-col gap-[1.63151cqw] text-[3.451823cqw] leading-none min-[1001px]:absolute min-[1001px]:left-[4.093229cqw] min-[1001px]:top-[5.268125cqw] max-[1000px]:gap-2 max-[1000px]:text-[clamp(34px,6vw,58px)] max-[1000px]:leading-[1.2]`}
          >
            <span>Nurturing</span>
            <span className="text-[#8ebc29]">Positive</span>
            <span>Change</span>
          </h2>
          <p data-reveal
            className={`${copy} w-[37.5cqw] leading-[1.4] min-[1001px]:absolute min-[1001px]:left-[4.313021cqw] min-[1001px]:top-[21.617969cqw] max-[1000px]:mt-8 max-[1000px]:w-full max-[1000px]:max-w-[720px]`}
          >
            We believe meaningful growth begins with care—for people,
            <br className="max-[1000px]:hidden" /> the land, and our
            communities. From our roots in natural
            <br className="max-[1000px]:hidden" /> choices, we continue to grow
            with purpose, delivering
            <br className="max-[1000px]:hidden" /> quality-driven products and
            responsible practices that
            <br className="max-[1000px]:hidden" /> help partners thrive and
            positive change grow.
          </p>
          <h3 data-reveal
            className={`${display} text-[1.502552cqw] leading-none text-[#8ebc29] min-[1001px]:absolute min-[1001px]:left-[4.313021cqw] min-[1001px]:top-[36.419792cqw] max-[1000px]:mt-12 max-[1000px]:text-[25px]`}
          >
            Our Value
          </h3>
          <ul className="grid grid-cols-[5.833333cqw_4.791667cqw_5cqw] gap-[4.635417cqw] min-[1001px]:absolute min-[1001px]:left-[4.313021cqw] min-[1001px]:top-[41.277448cqw] max-[1000px]:mt-7 max-[1000px]:w-full max-[1000px]:max-w-[520px] max-[1000px]:grid-cols-3 max-[1000px]:gap-4">
            {values.map(({ label, icon }) => (
              <li
                key={icon}
                data-reveal
                className="flex flex-col items-center gap-[0.738333cqw] text-center max-[1000px]:gap-3"
              >
                <img
                  src={`/images/babco-story/${icon}.svg`}
                  alt=""
                  width="55"
                  height="45"
                  loading="lazy"
                  className="h-[2.314844cqw] w-[2.854167cqw] object-contain min-[1001px]:translate-x-[0.223958cqw] max-[1000px]:h-11 max-[1000px]:w-14"
                />
                <span
                  className={`${display} text-[0.422396cqw] leading-none min-[1001px]:whitespace-nowrap max-[1000px]:text-[10px] max-[1000px]:leading-[1.3] max-[640px]:text-[9px]`}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <HistoryTimeline />
    </>
  );
}
