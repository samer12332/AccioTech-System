import type { Metadata } from "next";
import { AppShell, type NavigationItem } from "@/components/layout";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  SectionHeader,
} from "@/components/ui";
import styles from "./shell-preview.module.css";

export const metadata: Metadata = {
  title: "AccioTech Application Shell",
  robots: { index: false, follow: false },
};

const navigationItems: NavigationItem[] = [
  { href: "#overview", icon: "O", label: "Overview", group: "Foundation" },
  { href: "#navigation", icon: "N", label: "Navigation", group: "Foundation" },
  { href: "#components", icon: "C", label: "Components", group: "Foundation" },
  {
    href: "#responsive-layout",
    icon: "R",
    label: "Responsive Layout",
    group: "Experience",
  },
];

export default function ShellPreviewPage() {
  return (
    <AppShell
      activeNavigationItem="#overview"
      actions={
        <Button size="sm" variant="outline">
          Example action
        </Button>
      }
      navigationItems={navigationItems}
      pageDescription="Reusable navigation and content structure for future system pages."
      pageEyebrow="Internal foundation"
      pageTitle="Application shell"
    >
      <section className={styles.intro} id="overview">
        <SectionHeader
          description="A reusable, accessible frame for future AccioTech system pages."
          level={2}
          title="A dependable starting point"
        />
        <Badge variant="brand">Shell foundation</Badge>
      </section>
      <div className={styles.grid}>
        <section id="navigation">
          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Configuration supplies clear labels and destinations to the
                shared navigation.
              </p>
            </CardContent>
          </Card>
        </section>
        <section id="components">
          <Card>
            <CardHeader>
              <CardTitle>Shared components</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Existing primitives keep page content calm, consistent, and easy
                to scan.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Example button</Button>
              <Button variant="outline">Secondary action</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
      <section id="responsive-layout">
        <SectionHeader
          description="On smaller screens, the desktop sidebar becomes a menu with an explicit close control and Escape support."
          title="Responsive layout"
        />
        <div className={styles.badges}>
          <Badge variant="brand">Reusable navigation</Badge>
          <Badge variant="info">Accessible interaction states</Badge>
        </div>
      </section>
    </AppShell>
  );
}
