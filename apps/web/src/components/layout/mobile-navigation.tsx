"use client";

import { useEffect, useState } from "react";
import type { NavigationItem } from "./app-shell";
import styles from "./app-shell.module.css";

export function MobileNavigation({
  activeNavigationItem,
  items,
}: {
  activeNavigationItem?: string;
  items: NavigationItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className={styles.mobileNavigation}>
      <button
        aria-controls="mobile-primary-navigation"
        aria-expanded={isOpen}
        aria-label="Open navigation menu"
        className={styles.menuButton}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span aria-hidden="true">Menu</span>
      </button>
      {isOpen ? (
        <>
          <button
            aria-label="Dismiss navigation menu"
            className={styles.backdrop}
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <div
            aria-labelledby="mobile-navigation-title"
            aria-modal="true"
            className={styles.mobileMenu}
            id="mobile-primary-navigation"
            role="dialog"
          >
            <div className={styles.mobileMenuHeader}>
              <span className={styles.mobileBrand} id="mobile-navigation-title">
                Navigation
              </span>
              <button
                aria-label="Close navigation menu"
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label="Primary navigation">
              <ul className={styles.navigationList}>
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      aria-current={
                        item.href === activeNavigationItem ? "page" : undefined
                      }
                      className={styles.navigationLink}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
