import Navbar from "@/components/layouts/navbar";

export default function AuthLayout({ children }: { children: React.ReactNode}) {

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}