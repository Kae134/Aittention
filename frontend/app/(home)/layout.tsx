import Footer from "@/components/layouts/footer";
import HomeNavbar from "@/components/layouts/home-navbar";
//import HomeHeadband from "@/components/ui/home-headband";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <HomeHeadband isVisible /> */}
      <HomeNavbar />
      <main className="container mx-auto py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
