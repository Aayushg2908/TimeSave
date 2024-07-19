import Navbar from "./navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen w-screen">
      <Navbar />
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default MainLayout;
