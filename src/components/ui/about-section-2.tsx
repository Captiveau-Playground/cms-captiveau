"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { Zap } from "lucide-react";
import { useRef } from "react";

export default function AboutSection2() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 1.5,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };
  const textVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };
  return (
    <section className="py-32 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto" ref={heroRef}>
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="flex-1">
            <TimelineContent
              as="h1"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="sm:text-4xl text-2xl md:text-5xl !leading-[110%] font-semibold text-foreground mb-8"
            >
              Kami{" "}
              <TimelineContent
                as="span"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-primary border-2 border-primary inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                membangun
              </TimelineContent>{" "}
              produk digital yang tidak hanya indah, tetapi juga{" "}
              <TimelineContent
                as="span"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-accent border-2 border-accent inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                berdampak
              </TimelineContent>{" "}
              dan{" "}
              <TimelineContent
                as="span"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-green-600 border-2 border-green-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                berkelanjutan.
              </TimelineContent>
            </TimelineContent>

            <div className="mt-12 flex gap-2 justify-between">
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="mb-4 sm:text-xl text-xs"
              >
                <div className="font-medium text-foreground mb-1 capitalize">
                  Kami adalah Captiveau dan kami akan
                </div>
                <div className="text-muted-foreground font-semibold uppercase">
                  membawa Anda lebih jauh
                </div>
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="bg-primary gap-2 font-medium shadow-lg shadow-primary/20 text-white h-12 px-4 rounded-full text-sm inline-flex items-center cursor-pointer"
              >
                <a href="/services" className="flex items-center gap-2 text-white">
                  <Zap fill="white" size={16} />
                  Lihat Layanan
                </a>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
