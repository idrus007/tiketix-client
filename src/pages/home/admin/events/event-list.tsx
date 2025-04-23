import { Event, fetchEvents } from "@/api/event";
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
import { AxiosError } from "axios";
import { Calendar, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await fetchEvents();
        setEvents(response);
        console.log("Events:", response);
      } catch (err) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(axiosError.response?.data?.message || axiosError.message);
      } finally {
        setLoading(false);
      }
    };

    getAllEvents();
  }, []);

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loading ? (
              Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-md overflow-hidden w-full animate-pulse"
                >
                  <div className="w-full h-44 bg-gray-200" />
                  <div className="px-4 py-2 space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-2/3" />
                    <div className="h-4 bg-gray-300 rounded w-1/2" />
                    <div className="h-4 bg-gray-300 rounded w-1/3" />
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                Terjadi kesalahan: {error}
              </div>
            ) : events.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                Tidak ada event. Silakan tambahkan event baru.
                <Button
                  variant="link"
                  onClick={() => navigate("/admin/events/create")}
                >
                  Tambah Event
                </Button>
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border rounded-md overflow-hidden w-full"
                >
                  <img
                    src={`http://localhost:5000/uploads/${event.image}`}
                    alt={event.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="px-4 py-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {event.name}
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex items-center text-gray-500 text-sm font-medium">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {new Date(event.date).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center text-gray-500 text-sm font-medium">
                        <MapPin className="w-4 h-4 mr-1.5" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
