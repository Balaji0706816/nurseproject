import Image from "next/image";
import Head from "./components/ui/Head";
import ChevronPromoCard from "./components/ui/ChevronPromoCard";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white font-sans flex items-center justify-center px-4">
      <main className="w-full max-w-md flex flex-col items-center justify-center text-center">
        <Head />
        <ChevronPromoCard
        imageSrc="/images/diabetes.jpg"
        imageAlt="Study banner"
        title="AIDES-T2D: A SUPPORTIVE STUDY PORTAL"
        description="Participants complete daily reflections, receive supportive messages, and review progress summaries in a secure UMass Boston research portal."
        ctaText="GET STARTED"
        ctaHref="/login"
      />
      </main>
    </div>
  );
}
