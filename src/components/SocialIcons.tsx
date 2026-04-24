import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) {
      return;
    }

    const disposers: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement | null;

      if (!link) {
        return;
      }

      let rafId = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = e.clientX - rect.left - centerX;
        const offsetY = e.clientY - rect.top - centerY;

        targetX = Math.max(-10, Math.min(10, offsetX * 0.35));
        targetY = Math.max(-10, Math.min(10, offsetY * 0.35));
      };

      const onMouseLeave = () => {
        targetX = 0;
        targetY = 0;
      };

      const updatePosition = () => {
        currentX += (targetX - currentX) * 0.16;
        currentY += (targetY - currentY) * 0.16;

        link.style.setProperty("--siX", `${currentX}px`);
        link.style.setProperty("--siY", `${currentY}px`);

        rafId = requestAnimationFrame(updatePosition);
      };

      elem.addEventListener("mousemove", onMouseMove);
      elem.addEventListener("mouseleave", onMouseLeave);
      rafId = requestAnimationFrame(updatePosition);

      disposers.push(() => {
        cancelAnimationFrame(rafId);
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      disposers.forEach((dispose) => dispose());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/Harshmuruskar"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/harsh-muruskar-7804ba1ab/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://www.youtube.com/@Leftbraincoder"
            target="_blank"
            rel="noreferrer"
          >
            <FaYoutube />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/harsh_muruskar/?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Resume_Harsh (1).pdf"
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
