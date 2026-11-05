import { useEffect } from "react";

/** One coordinated entrance, followed by one reveal per section. No continuous loops. */
export function useOrganizedMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > .section"),
    );
    let observer: IntersectionObserver | undefined;
    const reveal = (element: Element | null) => {
      if (element instanceof HTMLElement) {
        element.classList.add("is-revealed");
        observer?.unobserve(element);
      }
    };
    const sync = () => {
      observer?.disconnect();
      if (media.matches || !("IntersectionObserver" in window)) {
        sections.forEach((section) => {
          section.removeAttribute("data-motion");
          section.classList.add("is-revealed");
        });
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target);
          });
        },
        { threshold: 0.04, rootMargin: "0px 0px 35px 0px" },
      );
      sections.forEach((section) => {
        section.setAttribute("data-motion", "reveal");
        observer!.observe(section);
      });
    };
    const handleFocus = (event: FocusEvent) => {
      if (event.target instanceof Element)
        reveal(event.target.closest("[data-motion]"));
    };
    const handleHash = () => {
      const id = window.location.hash.slice(1);
      const target = document.getElementById(id);
      reveal(target?.closest("[data-motion]") ?? null);
    };
    sync();
    handleHash();
    media.addEventListener("change", sync);
    document.addEventListener("focusin", handleFocus);
    window.addEventListener("hashchange", handleHash);
    return () => {
      observer?.disconnect();
      media.removeEventListener("change", sync);
      document.removeEventListener("focusin", handleFocus);
      window.removeEventListener("hashchange", handleHash);
      sections.forEach((section) => section.removeAttribute("data-motion"));
    };
  }, []);
}
