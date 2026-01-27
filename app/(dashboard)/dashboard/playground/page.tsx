import DashboardShell from "@/app/components/dashboard/DashboardShell";
import ChatNavbar from "@/app/components/dashboard/ChatNavbar";
import ChatMiniFooter from "@/app/components/dashboard/ChatMiniFooter";

export default function PlaygroundPage() {
  return (
   <div className="">
    <ChatNavbar/>
     <div className="justify-center items-center bg-slate-50 text-slate-200 ">
      <DashboardShell />
    </div>
    <ChatMiniFooter />
   </div>
  );
}
