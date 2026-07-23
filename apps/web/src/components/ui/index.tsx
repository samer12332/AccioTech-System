import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./ui.module.css";

const titleCase = (value: string) =>
  `${value[0].toUpperCase()}${value.slice(1)}`;
type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export function Button({
  className,
  type = "button",
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button${titleCase(variant)}`],
        styles[`button${titleCase(size)}`],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(styles.field, className)} {...props} />;
}
export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(styles.field, styles.textarea, className)}
      {...props}
    />
  );
}
export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(styles.field, className)} {...props} />;
}
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.card, className)} {...props} />;
}
export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.cardHeader, className)} {...props} />;
}
export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn(styles.cardTitle, className)} {...props} />;
}
export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn(styles.cardDescription, className)} {...props} />;
}
export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.cardContent, className)} {...props} />;
}
export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.cardFooter, className)} {...props} />;
}
export function Badge({
  className,
  variant = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: "neutral" | "brand" | "info" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={cn(
        styles.badge,
        styles[`badge${titleCase(variant)}`],
        className,
      )}
      {...props}
    />
  );
}
const alertLabels = {
  info: "Information",
  success: "Success",
  warning: "Warning",
  danger: "Error",
};
export function Alert({
  children,
  className,
  title,
  variant = "info",
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  variant?: "info" | "success" | "warning" | "danger";
}) {
  const label = title ?? alertLabels[variant];
  return (
    <div
      aria-label={label}
      className={cn(
        styles.alert,
        styles[`alert${titleCase(variant)}`],
        className,
      )}
      role={variant === "danger" ? "alert" : "status"}
    >
      <span aria-hidden="true" className={styles.alertIcon}>
        {variant === "danger" ? "!" : "i"}
      </span>
      <div className={styles.alertContent}>
        {title ? <p className={styles.alertTitle}>{title}</p> : null}
        {children}
      </div>
    </div>
  );
}
export function EmptyState({
  action,
  description,
  title,
  visual,
}: {
  action?: ReactNode;
  description: string;
  title: string;
  visual?: ReactNode;
}) {
  return (
    <section className={styles.emptyState}>
      {visual ? (
        <div aria-hidden="true" className={styles.emptyVisual}>
          {visual}
        </div>
      ) : null}
      <h2 className={styles.emptyTitle}>{title}</h2>
      <p className={styles.emptyDescription}>{description}</p>
      {action}
    </section>
  );
}
export function LoadingState({ message = "Loading" }: { message?: string }) {
  return (
    <div aria-live="polite" className={styles.loading} role="status">
      <span aria-hidden="true" className={styles.spinner} />
      <span>{message}</span>
    </div>
  );
}
export function PageContainer<T extends ElementType = "div">({
  as,
  className,
  ...props
}: { as?: T; className?: string } & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "className"
>) {
  const Component = as ?? "div";
  return <Component className={cn(styles.container, className)} {...props} />;
}
export function SectionHeader({
  actions,
  description,
  eyebrow,
  level = 2,
  title,
}: {
  actions?: ReactNode;
  description?: string;
  eyebrow?: string;
  level?: 1 | 2 | 3 | 4;
  title: string;
}) {
  const Heading = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <header className={styles.sectionHeader}>
      <div className={styles.sectionHeaderCopy}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <Heading className={styles.sectionTitle}>{title}</Heading>
        {description ? (
          <p className={styles.sectionDescription}>{description}</p>
        ) : null}
      </div>
      {actions ? <div className={styles.sectionActions}>{actions}</div> : null}
    </header>
  );
}
