import type { Metadata } from "next";
import { AppShell, type NavigationItem } from "@/components/layout";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  LoadingState,
  Select,
  Textarea,
} from "@/components/ui";
import styles from "./ui-showcase.module.css";

export const metadata: Metadata = {
  title: "AccioTech UI Foundation",
  description: "Internal reference for AccioTech interface primitives.",
  robots: { index: false, follow: false },
};

const navigationItems: NavigationItem[] = [
  { href: "/dev/ui", icon: "UI", label: "UI Foundation", group: "Reference" },
  {
    href: "/dev/shell",
    icon: "AS",
    label: "Application Shell",
    group: "Reference",
  },
];

const tokenGroups = [
  {
    title: "Brand",
    tokens: [
      ["Navy", "primary"],
      ["Technology Cyan", "accent"],
      ["AccioTech Gold", "gold-500"],
    ],
  },
  {
    title: "Surfaces and text",
    tokens: [
      ["Page background", "background"],
      ["Surface", "surface"],
      ["Subtle surface", "surface-subtle"],
      ["Text", "text"],
      ["Muted text", "text-muted"],
      ["Border", "border"],
    ],
  },
  {
    title: "Semantic feedback",
    tokens: [
      ["Information", "information"],
      ["Success", "success"],
      ["Warning", "warning"],
      ["Danger", "danger"],
    ],
  },
] as const;

const buttonVariants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "danger",
] as const;
const badgeVariants = [
  "neutral",
  "brand",
  "info",
  "success",
  "warning",
  "danger",
] as const;

function ShowcaseSection({
  children,
  description,
  eyebrow,
  id,
  title,
}: {
  children: React.ReactNode;
  description: string;
  eyebrow: string;
  id: string;
  title: string;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className={styles.panel} id={id}>
      <header className={styles.panelHeader}>
        <p>{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        <span>{description}</span>
      </header>
      <div className={styles.demo}>{children}</div>
    </section>
  );
}

export default function UiShowcase() {
  return (
    <AppShell
      activeNavigationItem="/dev/ui"
      navigationItems={navigationItems}
      pageDescription="Shared tokens, components, and interaction states"
      pageEyebrow="Design system"
      pageTitle="UI Foundation"
    >
      <section
        className={styles.introduction}
        aria-labelledby="showcase-introduction"
      >
        <div>
          <p className={styles.eyebrow}>Design system</p>
          <h2 id="showcase-introduction">AccioTech UI Foundation</h2>
          <p>
            Neutral, accessible building blocks for consistent internal system
            pages.
          </p>
          <Badge variant="brand">Internal reference</Badge>
        </div>
        <div
          aria-label="AccioTech visual identity"
          className={styles.identityStrip}
        >
          {[
            ["Navy", "primary"],
            ["Technology Cyan", "accent"],
            ["AccioTech Gold", "gold-500"],
          ].map(([label, token]) => (
            <div key={token}>
              <span style={{ backgroundColor: `var(--color-${token})` }} />
              <small>{label}</small>
            </div>
          ))}
        </div>
      </section>

      <nav
        aria-label="UI foundation sections"
        className={styles.sectionNavigation}
      >
        {[
          ["Foundation", "#foundation"],
          ["Actions", "#actions"],
          ["Forms", "#forms"],
          ["Status", "#status"],
          ["Surfaces", "#surfaces"],
          ["States", "#states"],
        ].map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>

      <ShowcaseSection
        description="Semantic color, typography, and scale tokens create a shared visual language."
        eyebrow="Foundation"
        id="foundation"
        title="Tokens and foundations"
      >
        <div className={styles.tokenGroups}>
          {tokenGroups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <div className={styles.swatches}>
                {group.tokens.map(([label, token]) => (
                  <div className={styles.swatch} key={token}>
                    <span
                      style={{ backgroundColor: `var(--color-${token})` }}
                    />
                    <strong>{label}</strong>
                    <code>--color-{token}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.foundationGrid}>
          <div>
            <h3>Typography</h3>
            <p className={styles.typePageHeading}>Page heading</p>
            <p className={styles.typeSectionHeading}>Section heading</p>
            <p className={styles.typeCardTitle}>Card title</p>
            <p>Body copy establishes a clear, comfortable reading rhythm.</p>
            <p className={styles.muted}>
              Muted supporting copy stays legible without competing.
            </p>
            <small>Small label text</small>
            <code>--font-size-sm</code>
          </div>
          <div>
            <h3>Shape and rhythm</h3>
            <div className={styles.tokenSamples}>
              <span className={styles.radiusSample}>Radius</span>
              <span className={styles.shadowSample}>Elevation</span>
              <span className={styles.spaceSample}>Spacing</span>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Use clear labels and native controls for deliberate, understandable actions."
        eyebrow="Actions"
        id="actions"
        title="Buttons"
      >
        <div className={styles.actionMatrix}>
          <div>
            <h3>Variants</h3>
            <div className={styles.row}>
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3>Sizes</h3>
            <div className={styles.row}>
              <Button size="sm">Small</Button>
              <Button>Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <h3>States</h3>
            <div className={styles.row}>
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Labels, helper text, and error messages make form states understandable."
        eyebrow="Forms"
        id="forms"
        title="Form controls"
      >
        <form className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <label htmlFor="reference-email">Email address</label>
            <Input
              aria-describedby="reference-email-helper"
              id="reference-email"
              placeholder="name@example.com"
            />
            <span id="reference-email-helper">
              Use a clear, work-appropriate address.
            </span>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="reference-disabled">Unavailable field</label>
            <Input
              disabled
              id="reference-disabled"
              readOnly
              value="Unavailable"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="reference-invalid">Reference name</label>
            <Input
              aria-describedby="reference-invalid-error"
              aria-invalid="true"
              id="reference-invalid"
              readOnly
              value="Needs attention"
            />
            <span className={styles.error} id="reference-invalid-error">
              Enter a descriptive reference name.
            </span>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="reference-select">Select example</label>
            <Select id="reference-select">
              <option>Choose an option</option>
            </Select>
          </div>
          <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
            <label htmlFor="reference-notes">Notes</label>
            <Textarea id="reference-notes" placeholder="Add a neutral note" />
          </div>
        </form>
      </ShowcaseSection>

      <ShowcaseSection
        description="Status components pair color with clear language so meaning is never color-only."
        eyebrow="Status"
        id="status"
        title="Badges and alerts"
      >
        <div className={styles.statusGrid}>
          <div>
            <h3>Badges</h3>
            <p className={styles.muted}>
              Compact labels communicate category or state.
            </p>
            <div className={styles.row}>
              {badgeVariants.map((variant) => (
                <Badge key={variant} variant={variant}>
                  {variant}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3>Alerts</h3>
            <p className={styles.muted}>
              Feedback messages explain the next appropriate action.
            </p>
            <div className={styles.stack}>
              <Alert>Information is available.</Alert>
              <Alert title="Saved" variant="success">
                Changes were saved.
              </Alert>
              <Alert title="Review needed" variant="warning">
                Review this setting.
              </Alert>
              <Alert title="Unable to continue" variant="danger">
                Correct the issue and try again.
              </Alert>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Surfaces group related information without turning every element into a card."
        eyebrow="Surfaces"
        id="surfaces"
        title="Content grouping"
      >
        <div className={styles.surfaceGrid}>
          <Card>
            <CardHeader>
              <CardTitle>Composed card</CardTitle>
              <CardDescription>
                A quiet foundation for grouped interface content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cards use restrained borders and elevation.</p>
            </CardContent>
            <CardFooter>
              <Button>Primary action</Button>
              <Button variant="outline">Secondary action</Button>
            </CardFooter>
          </Card>
          <div className={styles.flatSurface}>
            <h3>Flat surface</h3>
            <p>
              Use a subtle background shift to distinguish supportive
              information.
            </p>
          </div>
          <div className={styles.borderedSurface}>
            <h3>Bordered grouping</h3>
            <p>
              A simple boundary can establish structure without additional
              elevation.
            </p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Empty and loading states keep otherwise quiet areas useful and understandable."
        eyebrow="States"
        id="states"
        title="Feedback states"
      >
        <div className={styles.statesGrid}>
          <EmptyState
            action={<Button variant="outline">Add item</Button>}
            title="Nothing here yet"
            description="This space is ready when content becomes available."
            visual="○"
          />
          <div className={styles.loadingFrame}>
            <LoadingState message="Loading interface examples" />
          </div>
        </div>
      </ShowcaseSection>
    </AppShell>
  );
}
