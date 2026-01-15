import { useRef, useEffect, useMemo } from 'react'
import type { CyberEvent } from '@/model/CyberEvent'
import CyberpeaceLogo from './../assets/CPTracer_LOGO_white.Dh9olv4P_Z2ipO78.svg'



export const TimelineComp = ({ data }: { data: CyberEvent[] }) => {
  const scrollBottom = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const aDate = a.event?.startDate ?? "";
      const bDate = b.event?.startDate ?? "";
      return aDate.localeCompare(bDate);
    });
  }, [data]);

  useEffect(() => {
    scrollBottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [sorted]);


  return (
    <div className="timelineComp">
      <a href="https://cyberpeacetracer.ngo/" target="_blank" rel="">
        <img  alt={"logo"} className="cyberpeaceLogo" src={CyberpeaceLogo.src} />
      </a>
      <div className="timelineScroll">
        {sorted.map((item, index) => (
          <div key={item.id ?? index} className="Scroller">
            <p>
              {item.event?.primaryLocation} : {item.event?.startDate}
              <br />
              <strong>{item.attack?.type}</strong> : {item.event?.name}
            </p>
          </div>
        ))}

        <div ref={scrollBottom} />
      </div>
    </div>
  );
};
