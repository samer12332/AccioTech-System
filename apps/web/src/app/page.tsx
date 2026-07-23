import { Badge, PageContainer, SectionHeader } from "@/components/ui";

export default function Home() {
  return (
    <PageContainer as="main" className="homePage">
      <div className="homeContent">
        <Badge variant="brand">From Imagination to Innovation</Badge>
        <SectionHeader level={1} title="AccioTech Operating System" />
        <p className="homeMessage">Frontend foundation is ready.</p>
      </div>
    </PageContainer>
  );
}
