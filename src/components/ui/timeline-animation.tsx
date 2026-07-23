"use client";

import { motion, useInView } from "motion/react";
import React, { useRef } from "react";

type MotionTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "button" | "figure" | "section" | "aside";

interface TimelineContentProps {
  as?: MotionTag;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants: {
    hidden: any;
    visible: (i: number) => any;
  };
  [key: string]: any;
}

// Factory to create motion component for any tag
const MotionTag = motion("div");

export function TimelineContent({
  as: Tag = "div",
  children,
  className,
  style,
  animationNum,
  timelineRef,
  customVariants,
  ...props
}: TimelineContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 });

  const MotionElement = motion(Tag as React.ElementType);

  return (
    <MotionElement
      ref={ref}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionElement>
  );
}
