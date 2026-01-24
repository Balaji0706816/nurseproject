import Image from "next/image";
import Head from "./components/Head";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white font-sans flex items-center justify-center px-4">
      <main className="w-full max-w-md flex flex-col items-center justify-center text-center">
        <Head />
      </main>
    </div>
  );
}
