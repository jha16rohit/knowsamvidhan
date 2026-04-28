
import Navbar from "@/components/Navbar";
// import FooterSection from "@/components/Footersection";
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      
    </>
    
    
  );
}