import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main lang="en">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
