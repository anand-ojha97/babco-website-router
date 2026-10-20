import { useState } from "react";
import CountUp from "./CountUp.jsx";
import { MapPin, X } from "lucide-react";
import { locations } from "../data/navigation.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Locations() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <section
      id="locations"
      className="relative px-[3.65cqw] pb-[2.5cqw] pt-[2.725cqw] min-[1001px]:h-[49.6354cqw] text-babco-orange max-[640px]:px-[22px] max-[640px]:pb-[30px] max-[640px]:pt-8"
    >
      <SectionHeading className="reveal-detail mb-[1.2cqw] text-[3.3844cqw] max-[640px]:mb-4 max-[640px]:text-[10.5cqw]">
        Our location
      </SectionHeading>
      <p className="font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] text-[1.66667cqw] leading-[1.35] max-[640px]:text-[15px] max-[640px]:leading-[1.45]">
        Our in-house distribution expanded to cover <CountUp value="46" /> states of the <CountUp value="50" /> US
        states with <CountUp value="5" /> Babco Foods distribution
        <br className="hidden min-[1001px]:block" /> centers located
        strategically across the US.
      </p>
      <div className="relative mx-auto mt-[2.1cqw] w-[73.25%] min-[1001px]:absolute min-[1001px]:left-[16.1333%] min-[1001px]:top-[13.5cqw] min-[1001px]:m-0 min-[1001px]:w-[67.7333%] max-[640px]:mt-[26px] max-[640px]:w-full">
        <img
          className="block w-full"
          src="/images/distribution-map.webp"
          alt="Map of the United States showing BABCO distribution locations in San Francisco, Chicago, South Plainfield, Dallas, and Atlanta"
          width="4096"
          height="2063"
          loading="lazy"
        />
        {locations.map((location, index) => (
          <button
            key={location.name}
            className={`absolute aspect-square w-[4.2%] -translate-x-1/2 -translate-y-1/2 rounded-full outline-babco-orange outline-offset-2 hover:bg-babco-orange/10 hover:outline-3 focus-visible:bg-babco-orange/10 focus-visible:outline-3 max-[640px]:w-[7%] ${selectedLocation === index ? "bg-babco-orange/10 outline-3" : ""}`}
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            aria-label={`View ${location.name} distribution location`}
            aria-pressed={selectedLocation === index}
            onClick={() =>
              setSelectedLocation(selectedLocation === index ? null : index)
            }
          >
            <span className="sr-only">{location.name}</span>
          </button>
        ))}
        {selectedLocation !== null && (
          <div
            className="absolute left-1/2 top-0 z-10 min-w-[220px] -translate-x-1/2 rounded-xl border border-orange-100 bg-white px-4 py-3 text-sm shadow-lg max-[640px]:-top-5 max-[640px]:min-w-[180px] max-[640px]:p-2.5 max-[640px]:text-xs"
            role="status"
          >
            <button
              className="float-right ml-5 text-[#666]"
              aria-label="Close location details"
              onClick={() => setSelectedLocation(null)}
            >
              <X size={16} />
            </button>
            <span className="flex items-center gap-2 font-semibold">
              <MapPin size={17} />
              {locations[selectedLocation].name}
            </span>
            {selectedLocation === 2 && (
              <p className="mt-2 text-xs text-[#555]">
                238 Saint Nicholas Ave
                <br />
                South Plainfield, New Jersey 07080, USA
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
