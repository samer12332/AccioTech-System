import type { Metadata } from "next";
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
  PageContainer,
  SectionHeader,
  Select,
  Textarea,
} from "@/components/ui";
import styles from "./ui-showcase.module.css";

export const metadata: Metadata = {
  title: "AccioTech UI Foundation",
  description: "Internal reference for AccioTech interface primitives.",
  robots: { index: false, follow: false },
};
const colors = [
  "primary",
  "accent",
  "gold-500",
  "background",
  "surface",
  "success",
  "warning",
  "danger",
  "information",
];
export default function UiShowcase() {
  return (
    <PageContainer as="main" className={styles.page}>
      <SectionHeader
        eyebrow="Internal UI reference"
        level={1}
        title="AccioTech UI Foundation"
        description="Reusable design tokens and interface primitives for the operating system."
      />
      <section>
        <h2>Colors</h2>
        <div className={styles.swatches}>
          {colors.map((color) => (
            <div className={styles.swatch} key={color}>
              <span style={{ backgroundColor: `var(--color-${color})` }} />
              <small>{color.replace("-", " ")}</small>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.grid}>
        <div>
          <h2>Typography</h2>
          <h3>Section heading</h3>
          <p>Normal body copy establishes comfortable reading.</p>
          <p className={styles.muted}>Muted supporting copy.</p>
          <small>Small label text</small>
        </div>
        <div>
          <h2>Buttons</h2>
          <div className={styles.row}>
            {(
              ["primary", "secondary", "outline", "ghost", "danger"] as const
            ).map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
          <div className={styles.row}>
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </section>
      <section className={styles.grid}>
        <div>
          <h2>Form controls</h2>
          <label htmlFor="reference-email">
            Email
            <Input id="reference-email" placeholder="name@example.com" />
          </label>
          <label htmlFor="reference-disabled">
            Disabled
            <Input
              disabled
              id="reference-disabled"
              value="Unavailable"
              readOnly
            />
          </label>
          <label htmlFor="reference-invalid">
            Invalid
            <Input
              aria-invalid="true"
              id="reference-invalid"
              value="Needs attention"
              readOnly
            />
          </label>
          <label htmlFor="reference-notes">
            Notes
            <Textarea id="reference-notes" placeholder="Add a note" />
          </label>
          <label htmlFor="reference-select">
            Select
            <Select id="reference-select">
              <option>Choose an option</option>
            </Select>
          </label>
        </div>
        <div>
          <h2>Badges</h2>
          <div className={styles.row}>
            {(
              [
                "neutral",
                "brand",
                "info",
                "success",
                "warning",
                "danger",
              ] as const
            ).map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>
          <h2>Alerts</h2>
          <div className={styles.stack}>
            <Alert>Information is available.</Alert>
            <Alert variant="success">Changes were saved.</Alert>
            <Alert variant="warning">Review this setting.</Alert>
            <Alert variant="danger">Unable to complete the action.</Alert>
          </div>
        </div>
      </section>
      <section className={styles.grid}>
        <Card>
          <CardHeader>
            <CardTitle>Composable card</CardTitle>
            <CardDescription>
              A quiet foundation for grouped interface content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Cards use a restrained surface, border, and shadow.</p>
          </CardContent>
          <CardFooter>
            <Button>Primary action</Button>
            <Button variant="outline">Secondary action</Button>
          </CardFooter>
        </Card>
        <div className={styles.stack}>
          <EmptyState
            visual="○"
            title="Nothing here yet"
            description="This space is ready when content becomes available."
            action={<Button variant="outline">Add item</Button>}
          />
          <LoadingState message="Loading interface examples" />
        </div>
      </section>
      <section>
        <SectionHeader
          title="Layout examples"
          description="This heading has no actions."
        />
        <SectionHeader
          actions={<Button size="sm">Example action</Button>}
          title="Actions align on larger screens"
        />
      </section>
    </PageContainer>
  );
}
