import { useEffect } from "react";

export function useSectionReveals(path: string) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = [...document.querySelectorAll<HTMLElement>(".reveal")];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -5% 0px" },
    );
    for (const element of elements) {
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.dataset.reveal = "pending";
        observer.observe(element);
      }
    }
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.removeAttribute("data-reveal"));
    };
  }, [path]);
}
