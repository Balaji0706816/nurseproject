import Image from "next/image";
import Head from "./components/Head";
export default function Home() {
  return (
    <div className="flex  items-center justify-center bg-white font-sans ">
       <Head/>
      <main className="flex min-h-screen  flex-col items-center justify-between  bg-white sm:items-start">
     me
      </main>
    </div>
  );
}
