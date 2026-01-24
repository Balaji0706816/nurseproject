import Image from "next/image";
import Head from "./components/Head";
export default function Home() {
  return (
    <div className="flex  items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen  flex-col items-center justify-between  bg-white dark:bg-black sm:items-start">
      <Head/>
      </main>
    </div>
  );
}
