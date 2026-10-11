"use client";

import { useEffect, useState } from "react";

const phrases = ["your wellbeing.", "your wellness.", "your energy."];

export function RotatingHeroPhrase() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrase = phrases[phraseIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timeout = window.setTimeout(
        () => setVisibleLength(phrase.length),
        0,
      );
      return () => window.clearTimeout(timeout);
    }

    let delay = 78;
    if (!isDeleting && visibleLength === phrase.length) {
      delay = 1400;
    } else if (isDeleting && visibleLength === 0) {
      delay = 260;
    } else if (isDeleting) {
      delay = 38;
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && visibleLength === phrase.length) {
        setIsDeleting(true);
      } else if (isDeleting && visibleLength === 0) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
      } else {
        setVisibleLength((current) => current + (isDeleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, phrase.length, visibleLength]);

  return (
    <span aria-hidden="true" className="hero-typed-phrase">
      {phrase.slice(0, visibleLength)}
    </span>
  );
}
