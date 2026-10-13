"use client";
import { useEffect, useRef } from "react";
type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
export function EnquiryProtection({ attempt = 0 }: { attempt?: number }) {
  const container = useRef<HTMLDivElement>(null),
    widget = useRef<string | undefined>(undefined);
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!key) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let observer: ResizeObserver | undefined;
    let currentSize: string | undefined;
    const mount = () => {
      if (cancelled) return;
      if (window.turnstile && container.current) {
        const render = () => {
          if (!container.current || !window.turnstile) return;
          const size =
            container.current.clientWidth < 300 ? "compact" : "flexible";
          if (size === currentSize) return;
          if (widget.current) window.turnstile.remove(widget.current);
          currentSize = size;
          widget.current = window.turnstile.render(container.current, {
            sitekey: key,
            action: "enquiry",
            theme: "light",
            size,
          });
        };
        render();
        observer = new ResizeObserver(render);
        observer.observe(container.current);
      } else timer = setTimeout(mount, 200);
    };
    if (!document.querySelector("script[data-krish-turnstile]")) {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.dataset.krishTurnstile = "true";
      document.head.appendChild(script);
    }
    mount();
    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer?.disconnect();
      if (widget.current && window.turnstile)
        window.turnstile.remove(widget.current);
      widget.current = undefined;
    };
  }, []);
  useEffect(() => {
    if (attempt && widget.current) window.turnstile?.reset(widget.current);
  }, [attempt]);
  return (
    <>
      <div className="form-trap" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div ref={container} className="security-check" />
      <p className="form-privacy">
        We use your details to respond to this enquiry.{" "}
        <a href="/privacy/">Privacy policy</a>.
      </p>
    </>
  );
}
