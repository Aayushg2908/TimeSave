import DotPattern from "@/components/magic-ui/grid-pattern";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full w-full flex items-center justify-center rounded-lg border bg-background md:shadow-xl bg-green-50">
      <main className="z-10">{children}</main>
      <DotPattern />
    </div>
  );
};

export default AuthLayout;
