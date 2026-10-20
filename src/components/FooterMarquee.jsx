import { headingText } from "../styles.js";
// Two identical copies make the CSS marquee loop without a gap.
export default function FooterMarquee() {
  return (
    <section
      className="slogan-marquee relative flex min-h-[14.0625cqw] items-center overflow-hidden bg-[#ffebc8] max-[640px]:min-h-[110px]"
      aria-label="Good. Authentic. Pure. Reach."
    >
      <p className="sr-only">Good. Authentic. Pure. Reach.</p>
      <div
        className="slogan-track flex w-max shrink-0 animate-[tagline-marquee_28s_linear_infinite] motion-reduce:w-full motion-reduce:animate-none"
        aria-hidden="true"
      >
        {[0, 1].map((copy) => (
          <p
            className={`${headingText} flex w-max min-w-[100cqw] justify-center shrink-0 items-center px-[max(2cqw,12px)] text-[clamp(28px,4.04cqw,78px)] whitespace-nowrap text-babco-red motion-reduce:w-full motion-reduce:justify-center motion-reduce:whitespace-normal motion-reduce:leading-[1.25] motion-reduce:px-5 motion-reduce:text-center motion-reduce:text-[clamp(20px,4.04cqw,78px)] ${copy === 1 ? "motion-reduce:hidden" : ""}`}
            key={copy}
          >
            Good. Authentic. Pure. Reach
          </p>
        ))}
      </div>

    </section>
  );
}
