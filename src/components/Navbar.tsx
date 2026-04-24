import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother?.kill();

    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.35,
      speed: 1.12,
      smoothTouch: 0.08,
      normalizeScroll: true,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".header ul a"));
    const onLinkClick = (e: MouseEvent) => {
      if (window.innerWidth <= 1024) {
        return;
      }

      e.preventDefault();
      const elem = e.currentTarget as HTMLAnchorElement;
      const section = elem.getAttribute("data-href");
      if (section) {
        smoother.scrollTo(section, true, "top top");
      }
    };

    links.forEach((element) => {
      element.addEventListener("click", onLinkClick);
    });

    const onResize = () => {
      ScrollTrigger.refresh(true);
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      links.forEach((element) => {
        element.removeEventListener("click", onLinkClick);
      });
      window.removeEventListener("resize", onResize);
      smoother?.kill();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          HM
        </a>
        <a
          href="https://www.linkedin.com/in/harsh-muruskar-7804ba1ab/"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/harsh-muruskar-7804ba1ab
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
