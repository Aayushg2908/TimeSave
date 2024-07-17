import DotPattern from "@/components/magic-ui/grid-pattern";
import Navbar from "./navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />
      <main className="relative h-full w-full flex flex-col overflow-scroll rounded-lg border bg-background md:shadow-xl bg-green-50">
        <main className="z-10">{children}</main>
        <DotPattern />
      </main>
    </div>
  );
};

export default LandingLayout;
