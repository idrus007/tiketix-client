import { createEvent } from "@/api/event";
import { AppSidebar } from "@/components/app-sidebar";
import { DatePicker } from "@/components/elements/date-picker";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormEvent {
  name: string;
  image: File | null;
  description: string;
  date: Date;
  location: string;
}

export default function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormEvent>({
    name: "",
    image: null, // Menginisialisasi image dengan null
    description: "",
    date: new Date(),
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({ ...formData, date });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, image, description, date, location } = formData;
    if (!image) {
      toast.error("Please select an image.");
      return;
    }
    const eventFormData = new FormData();
    eventFormData.append("name", name);
    eventFormData.append("image", image); // File harus File beneran
    eventFormData.append("description", description);
    eventFormData.append("date", date.toISOString()); // Pastikan string ISO
    eventFormData.append("location", location);

    try {
      setLoading(true);
      const { message } = await createEvent(eventFormData);
      toast.success(message);
      setFormData({
        name: "",
        image: null,
        description: "",
        date: new Date(),
        location: "",
      });
      setLoading(false);
      navigate("/admin/events");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        setFormData({
          name: "",
          image: null,
          description: "",
          date: new Date(),
          location: "",
        });
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin/events">
                    All Events
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create New Event</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex-1 h-full w-full px-4">
          <div className="flex flex-col bg-white border rounded-xl p-4">
            <h1 className="text-2xl font-bold">Create Event</h1>
            <p className="text-gray-500">
              Create a new event by filling out the form below.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="email">Event Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Event Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Event Description</Label>
                  <textarea
                    id="description"
                    className="w-full rounded-md border px-4 py-2 text-sm focus:outline-none"
                    placeholder="Event Description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col justify-between gap-3">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Event Date</Label>
                    <DatePicker
                      date={formData.date}
                      setDate={handleDateChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Event Location</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Ex: Jakarta International Expo"
                      required
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  variant="default"
                  disabled={loading}
                  className={loading ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
