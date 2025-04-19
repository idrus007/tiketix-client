import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Search } from "lucide-react";

export default function EventList() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Events</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="h-full bg-gray-100 rounded-xl flex items-center justify-center border" /> */}
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="default">All Events</Button>
              <Button variant="outline">Upcoming</Button>
              <Button variant="outline">Ongoing</Button>
              <Button variant="outline">Past</Button>
            </div>
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 max-h-[calc(100vh-135px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 pr-2">
            <div className="aspect-video rounded-xl bg-gray-100 border" />
            <div className="aspect-video rounded-xl bg-gray-100 border" />
            <div className="aspect-video rounded-xl bg-gray-100 border" />
            <div className="aspect-video rounded-xl bg-gray-100 border" />
            <div className="aspect-video rounded-xl bg-gray-100 border" />
            <div className="aspect-video rounded-xl bg-gray-100 border" />
            <div className="aspect-video rounded-xl bg-gray-100 border" />
            <div className="aspect-video rounded-xl bg-gray-100 border" />
            <div className="aspect-video rounded-xl bg-gray-100 border" />
            <div className="aspect-video rounded-xl bg-gray-100 border" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
