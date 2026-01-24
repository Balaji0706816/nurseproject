import Image from "next/image";
import Head from "./components/Head";
export default function Home() {
  return (
    <div className="flex w-full items-center justify-center bg-white font-sans ">
      
      <main className="flex min-h-screen  flex-col items-center justify-between  bg-white sm:items-start">
      <Head/>
      </main>
    </div>
  );
}
