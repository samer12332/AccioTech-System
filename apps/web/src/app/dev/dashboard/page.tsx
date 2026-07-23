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
import styles from "./dashboard-preview.module.css";

export const metadata: Metadata = {
  title: "AccioTech Dashboard Foundation",
  description: "Internal preview of the AccioTech dashboard layout foundation.",
  robots: { index: false, follow: false },
};
const navigationItems: NavigationItem[] = [
  {
    href: "/dev/dashboard",
    icon: "DB",
    label: "Dashboard Foundation",
    group: "Reference",
  },
  { href: "/dev/ui", icon: "UI", label: "UI Foundation", group: "Reference" },
  {
    href: "/dev/shell",
    icon: "AS",
    label: "Application Shell",
    group: "Reference",
  },
];
const metrics = [
  {
    label: "Active groups",
    value: "12",
    note: "Sample workspace grouping",
    marker: "Organized",
    icon: "GR",
  },
  {
    label: "Enrolled students",
    value: "48",
    note: "Preview capacity overview",
    marker: "Preview total",
    icon: "EN",
  },
  {
    label: "Upcoming sessions",
    value: "6",
    note: "Scheduled in the sample layout",
    marker: "Scheduled",
    icon: "SE",
  },
  {
    label: "Pending follow-ups",
    value: "5",
    note: "Items awaiting a response",
    marker: "Review",
    icon: "FU",
  },
];
const sessions = [
  {
    title: "Applied technology",
    time: "09:30",
    context: "Room-based session",
    delivery: "In person",
    status: "Upcoming",
    variant: "info" as const,
  },
  {
    title: "Systems practice",
    time: "14:00",
    context: "Guided learning session",
    delivery: "Online",
    status: "Preparing",
    variant: "brand" as const,
  },
  {
    title: "Foundation review",
    time: "16:30",
    context: "Room-based session",
    delivery: "In person",
    status: "Ready",
    variant: "info" as const,
  },
];
const attentionItems = [
  {
    title: "Capacity review",
    description: "Confirm the sample group size before scheduling.",
    severity: "Review",
    variant: "warning" as const,
    action: "Review capacity",
  },
  {
    title: "Schedule confirmation",
    description: "A sample timetable needs final confirmation.",
    severity: "Confirm",
    variant: "info" as const,
    action: "Confirm schedule",
  },
  {
    title: "Attendance follow-up",
    description: "Prepare a neutral attendance follow-up note.",
    severity: "Follow up",
    variant: "neutral" as const,
    action: "Prepare note",
  },
];
const activities = [
  {
    title: "Group schedule updated",
    description: "A sample timetable adjustment is ready for review.",
    time: "Preview • 10 min",
    status: "Updated",
  },
  {
    title: "Attendance record prepared",
    description: "A neutral placeholder record is available in this layout.",
    time: "Preview • 30 min",
    status: "Prepared",
  },
  {
    title: "Enrollment inquiry received",
    description: "A sample inquiry has been placed in the review queue.",
    time: "Preview • 1 hr",
    status: "New",
  },
];

export default function DashboardPreviewPage() {
  return (
    <AppShell
      activeNavigationItem="/dev/dashboard"
      navigationItems={navigationItems}
      pageDescription="Operational workspace foundation"
      pageEyebrow="Operating overview"
      pageTitle="Dashboard"
    >
      <section className={styles.introduction}>
        <SectionHeader
          actions={
            <div className={styles.actions}>
              <Button type="button">Create group</Button>
              <Button type="button" variant="outline">
                View schedule
              </Button>
            </div>
          }
          description="A static composition for future operational information and routines."
          eyebrow="Static workspace reference"
          level={2}
          title="A clear operational starting point"
        />
        <Badge variant="brand">Static preview</Badge>
        <div
          aria-label="Static preview context"
          className={styles.contextStrip}
        >
          <span>Preview context</span>
          <Button size="sm" type="button" variant="ghost">
            Today
          </Button>
          <Button size="sm" type="button" variant="ghost">
            All locations
          </Button>
          <Button size="sm" type="button" variant="ghost">
            All delivery types
          </Button>
        </div>
      </section>
      <section className={styles.section}>
        <SectionHeader
          description="Modest sample values demonstrate hierarchy without representing live system data."
          level={2}
          title="Summary metrics"
        />
        <div className={styles.metricGrid}>
          {metrics.map((metric) => (
            <Card key={metric.label} className={styles.metricCard}>
              <CardContent>
                <div className={styles.metricHeader}>
                  <p className={styles.metricLabel}>{metric.label}</p>
                  <span aria-hidden="true" className={styles.metricMonogram}>
                    {metric.icon}
                  </span>
                </div>
                <p className={styles.metricValue}>{metric.value}</p>
                <p className={styles.metricNote}>{metric.note}</p>
                <Badge variant="neutral">{metric.marker}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <div className={styles.operationalGrid}>
        <div>
          <section className={styles.section}>
            <SectionHeader
              description="The strongest operational panel demonstrates structured session rows."
              level={2}
              title="Today's sessions"
            />
            <Card className={styles.sessionsCard}>
              <CardHeader>
                <CardTitle>Session schedule</CardTitle>
                <Button size="sm" type="button" variant="ghost">
                  View schedule
                </Button>
              </CardHeader>
              <CardContent>
                <ul className={styles.sessionList}>
                  {sessions.map((session) => (
                    <li key={session.title}>
                      <time>{session.time}</time>
                      <div>
                        <strong>{session.title}</strong>
                        <span>{session.context}</span>
                      </div>
                      <div className={styles.sessionBadges}>
                        <Badge variant={session.variant}>
                          {session.delivery}
                        </Badge>
                        <Badge variant="neutral">{session.status}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
          <section className={styles.section}>
            <SectionHeader
              description="Sample events show the intended activity-list hierarchy."
              level={2}
              title="Recent activity"
            />
            <Card className={styles.activityCard}>
              <CardContent>
                <ul className={styles.activityList}>
                  {activities.map((activity) => (
                    <li key={activity.title}>
                      <span
                        aria-hidden="true"
                        className={styles.activityMarker}
                      />
                      <div>
                        <strong>{activity.title}</strong>
                        <p>{activity.description}</p>
                        <small>{activity.time}</small>
                      </div>
                      <Badge variant="neutral">{activity.status}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
        <aside className={styles.secondaryColumn}>
          <section className={styles.section}>
            <SectionHeader
              description="A concise sample attention queue."
              level={2}
              title="Groups requiring attention"
            />
            <Card>
              <CardContent>
                <ul className={styles.attentionList}>
                  {attentionItems.map((item) => (
                    <li key={item.title}>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                        <Badge variant={item.variant}>{item.severity}</Badge>
                      </div>
                      <Button size="sm" type="button" variant="ghost">
                        {item.action}
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
          <section className={styles.section}>
            <SectionHeader
              description="A compact static preview breakdown without charts."
              level={2}
              title="Enrollment pipeline"
            />
            <Card>
              <CardContent>
                <p className={styles.previewNote}>Static preview breakdown</p>
                <dl className={styles.pipeline}>
                  <div>
                    <dt>New inquiries</dt>
                    <dd>4 · Sample queue</dd>
                  </div>
                  <div>
                    <dt>Awaiting response</dt>
                    <dd>3 · Review stage</dd>
                  </div>
                  <div>
                    <dt>Ready for booking</dt>
                    <dd>2 · Next step</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </section>
          <section className={styles.section}>
            <SectionHeader
              description="Preview-only controls indicate focused operational actions."
              level={2}
              title="Next actions"
            />
            <Card>
              <CardContent>
                <div className={styles.nextActions}>
                  {[
                    [
                      "Review upcoming sessions",
                      "Confirm the static schedule layout.",
                      "Review",
                    ],
                    [
                      "Follow up on enrollment inquiries",
                      "Review the sample inquiry queue.",
                      "Follow up",
                    ],
                    [
                      "Prepare attendance lists",
                      "Set up the preview attendance pattern.",
                      "Prepare",
                    ],
                  ].map(([title, description, action]) => (
                    <div key={title}>
                      <div>
                        <strong>{title}</strong>
                        <span>{description}</span>
                      </div>
                      <Button
                        disabled
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        {action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <small>Controls are disabled in this static preview.</small>
              </CardFooter>
            </Card>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
