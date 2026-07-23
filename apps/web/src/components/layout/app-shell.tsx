import type { ReactNode } from "react";
import Link from "next/link";
import { MobileNavigation } from "./mobile-navigation";
import styles from "./app-shell.module.css";

export type NavigationItem = {
  group?: string;
  href: string;
  icon?: string;
  label: string;
};

type AppShellProps = {
  activeNavigationItem?: string;
  actions?: ReactNode;
  children: ReactNode;
  navigationItems: NavigationItem[];
  pageDescription?: string;
  pageEyebrow?: string;
  pageTitle: string;
};

function NavigationLinks({
  activeNavigationItem,
  items,
}: {
  activeNavigationItem?: string;
  items: NavigationItem[];
}) {
  const groups = items.reduce<{ items: NavigationItem[]; label?: string }[]>(
    (result, item) => {
      const group = result.find((entry) => entry.label === item.group);
      if (group) group.items.push(item);
      else result.push({ items: [item], label: item.group });
      return result;
    },
    [],
  );

  return groups.map((group, index) => (
    <div className={styles.navigationGroup} key={group.label ?? index}>
      {group.label ? (
        <p className={styles.navigationGroupLabel}>{group.label}</p>
      ) : null}
      <ul className={styles.navigationList}>
        {group.items.map((item) => (
          <li key={item.href}>
            <a
              aria-current={
                item.href === activeNavigationItem ? "page" : undefined
              }
              className={styles.navigationLink}
              href={item.href}
            >
              {item.icon ? (
                <span aria-hidden="true" className={styles.navigationIcon}>
                  {item.icon}
                </span>
              ) : null}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  ));
}

export function AppShell({
  activeNavigationItem,
  actions,
  children,
  navigationItems,
  pageDescription,
  pageEyebrow,
  pageTitle,
}: AppShellProps) {
  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <aside className={styles.sidebar}>
        <Link aria-label="AccioTech home" className={styles.brand} href="/">
          <span aria-hidden="true" className={styles.brandMark} />
          <span>
            <strong>ACCIO TECH</strong>
            <small>Operating System</small>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <NavigationLinks
            activeNavigationItem={activeNavigationItem}
            items={navigationItems}
          />
        </nav>
        <div className={styles.sidebarFooter}>
          <span>Internal Workspace</span>
          <span>Foundation Preview</span>
        </div>
      </aside>
      <div className={styles.workspace}>
        <header className={styles.topBar}>
          <MobileNavigation
            activeNavigationItem={activeNavigationItem}
            items={navigationItems}
          />
          <div className={styles.topBarTitle}>
            {pageEyebrow ? (
              <p className={styles.topBarLabel}>{pageEyebrow}</p>
            ) : null}
            <h1>{pageTitle}</h1>
            {pageDescription ? (
              <p className={styles.topBarDescription}>{pageDescription}</p>
            ) : null}
          </div>
          {actions ? (
            <div className={styles.topBarActions}>{actions}</div>
          ) : null}
        </header>
        <main className={styles.main} id="main-content" tabIndex={-1}>
          <div className={styles.content}>{children}</div>
        </main>
      </div>
    </div>
  );
}
