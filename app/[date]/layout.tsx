import Navbar from "./navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full w-full">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
