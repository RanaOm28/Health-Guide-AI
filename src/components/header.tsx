"use client";

import { Icon } from "@/components/icon";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("healthguide-theme");
    const prefersLight = savedTheme === "light" || (!savedTheme && window.matchMedia("(prefers-color-scheme: light)").matches);
    setIsLightMode(prefersLight);
    document.documentElement.classList.toggle("light-mode", prefersLight);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light-mode", isLightMode);
    window.localStorage.setItem("healthguide-theme", isLightMode ? "light" : "dark");
  }, [isLightMode]);

  return (
    <header className="site-header">
      <div className="site-shell site-header-inner">
        <Link aria-label="HealthGuide AI home" className="brand" href="/">
          <span className="brand-mark">
            <svg aria-hidden="true" fill="none" viewBox="0 0 32 32">
              <path
                d="M16 27.5s-11-5.7-11-14.1V7.8l11-4.1 11 4.1v5.6c0 8.4-11 14.1-11 14.1Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M9.5 15.3h4l2-4.2 3.1 9.1 2-4.9h2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </span>
          <span>
            HealthGuide <span className="brand-ai ">AI</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="main-nav">
          <a className="nav-link" href="/platform">
            Platform <Icon name="chevron" />
          </a>
          <Link className="nav-link" href="/#features">
            Features <Icon name="chevron" />
          </Link>
          <Link className="nav-link" href="/#health-check">
            Insights <Icon name="chevron" />
          </Link>
          <Link className="nav-link" href="/#about">
            About
          </Link>
        </nav>

        <div className="header-actions">
          <button
            aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
            className="theme-toggle"
            onClick={() => setIsLightMode((current) => !current)}
            type="button"
          >
            <Icon name={isLightMode ? "moon" : "sun"} />
          </button>
          <a className="sign-in" href="/login">
            Sign in
          </a>
          <a className="button button-primary" href="/register">
            Get started <Icon name="arrow" />
          </a>
        </div>
      </div>
    </header>
  );
}
