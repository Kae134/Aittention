import HomeNavbar from "@/components/layouts/home-navbar";

export default function AuthLayout({ children }: { children: React.ReactNode}) {

    return (
        <>
            <HomeNavbar />
            <main className="container mx-auto">
                {children}
            </main>
        </>
    );
}