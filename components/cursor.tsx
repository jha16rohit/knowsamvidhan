"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const pathname = usePathname();

  const [enabled, setEnabled] =
    useState(false);

  useEffect(() => {
    const updateCursorState =
      () => {
        const isAdmin =
          pathname.startsWith(
            "/admin",
          );

        const userPreference =
          localStorage.getItem(
            "changeCursor",
          ) === "true";

        setEnabled(
          isAdmin || userPreference,
        );
      };

    updateCursorState();

    window.addEventListener(
      "cursor-change",
      updateCursorState,
    );

    return () => {
      window.removeEventListener(
        "cursor-change",
        updateCursorState,
      );
    };
  }, [pathname]);

  useEffect(() => {
    if (!enabled) return;

    const dot =
      document.querySelector(
        ".cursor-nib",
      ) as HTMLElement | null;

    const ring =
      document.querySelector(
        ".cursor-ring",
      ) as HTMLElement | null;

    if (!dot || !ring) return;

    const moveCursor = (
      e: MouseEvent,
    ) => {
      dot.style.left =
        e.clientX + "px";

      dot.style.top =
        e.clientY + "px";

      ring.style.left =
        e.clientX + "px";

      ring.style.top =
        e.clientY + "px";
    };

    const hover = () => {
      ring.classList.add(
        "cursor-hover",
      );
    };

    const unhover = () => {
      ring.classList.remove(
        "cursor-hover",
      );
    };

    const elements =
      document.querySelectorAll(
        "a, button, .logo",
      );

    elements.forEach((el) => {
      el.addEventListener(
        "mouseenter",
        hover,
      );

      el.addEventListener(
        "mouseleave",
        unhover,
      );
    });

    window.addEventListener(
      "mousemove",
      moveCursor,
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor,
      );

      elements.forEach((el) => {
        el.removeEventListener(
          "mouseenter",
          hover,
        );

        el.removeEventListener(
          "mouseleave",
          unhover,
        );
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        .cursor-nib {
          position: fixed;
          top: 0;
          left: 0;
          transform: translate(
            -50%,
            -50%
          );
          pointer-events: none;
          z-index: 999999;
        }

        .nib-svg {
          width: 18px;
          height: 18px;
          fill: #edc531;
          transition: transform 0.1s ease;
        }

        .cursor-ring {
          width: 35px;
          height: 35px;
          border: 2px solid #d4af37;
          border-radius: 50%;
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          transform: translate(
            -50%,
            -50%
          );
          transition: all 0.05s ease;
          z-index: 999998;
        }

        .cursor-hover {
          transform: translate(
              -50%,
              -50%
            )
            scale(1.5);

          border-color: #edc531;
        }
      `}</style>

      <div className="cursor-nib">
        <svg
          viewBox="0 0 24 24"
          className="nib-svg"
        >
          <path d="M12 2L19 21L12 17L5 21L12 2Z" />

          <circle
            cx="12"
            cy="13"
            r="1.5"
            fill="#fff"
          />
        </svg>
      </div>

      <div className="cursor-ring"></div>
    </>
  );
}