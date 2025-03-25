import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Header } from "@/components/layout/Header";

const pageData = {
  name: "Dashboard",
  title: "Dashboard",
  description: "Snapshot of your endpoints and leads",
};

export default function Home() {
  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <div className="p-6 border overflow-y-scroll no-scrollbar w-full max-w-[100%] rounded-lg bg-muted/50 h-full">
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <div className="grid grid-cols-3 gap-4">asf</div>
      </div>
    </>
  );
}
