import { Carousel } from "@/components/containers/carousel";
import { UserLayout } from "@/components/layouts/user-layout";
import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const events = [
  {
    id: 1,
    image: "images/placeholder.svg",
    name: "Persembahan Cinta Fezt Vol.2",
    slug: "persembahan-cinta-fezt-vol-2",
    date: "12 Agustus 2023",
    location: "Jakarta International Expo",
  },
  {
    id: 2,
    image: "images/placeholder.svg",
    name: "Jakarta Music Festival",
    slug: "jakarta-music-festival",
    date: "19 Agustus 2023",
    location: "Senayan Park",
  },
  {
    id: 3,
    image: "images/placeholder.svg",
    name: "Indie Vibes Night",
    slug: "indie-vibes-night",
    date: "25 Agustus 2023",
    location: "Rooftop Kemang",
  },
  {
    id: 4,
    image: "images/placeholder.svg",
    name: "Comedy Night Special",
    slug: "comedy-night-special",
    date: "1 September 2023",
    location: "Balai Sarbini",
  },
  {
    id: 5,
    image: "images/placeholder.svg",
    name: "Festival Budaya Nusantara",
    slug: "festival-budaya-nusantara",
    date: "10 September 2023",
    location: "Taman Mini Indonesia Indah",
  },
  {
    id: 6,
    image: "images/placeholder.svg",
    name: "Jazz Under The Stars",
    slug: "jazz-under-the-stars",
    date: "16 September 2023",
    location: "Ancol Beach City",
  },
  {
    id: 7,
    image: "images/placeholder.svg",
    name: "Urban Food & Art Fair",
    slug: "urban-food-art-fair",
    date: "23 September 2023",
    location: "Kota Kasablanka Mall",
  },
  {
    id: 8,
    image: "images/placeholder.svg",
    name: "Soundscape Live",
    slug: "soundscape-live",
    date: "30 September 2023",
    location: "ICE BSD City",
  },
];

export default function UserDashboard() {
  const navigate = useNavigate();
  return (
    <UserLayout>
      <Carousel />
      <div className="flex flex-col gap-3 my-4">
        <h2 className="text-xl font-bold text-gray-800">Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.slice(0, 4).map((event) => (
            <div
              key={event.id}
              className="bg-white border rounded-md overflow-hidden w-full"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-64 object-cover"
              />
              <div className="px-4 py-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  {event.name}
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center text-gray-500 text-sm font-medium">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {event.date}
                  </span>
                  <span className="flex items-center text-gray-500 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    {event.location}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button className="w-full bg-white text-gray-700 text-xs sm:text-base px-4 py-2 font-semibold">
                  Mulai dari Rp100.000
                </button>
                <button
                  onClick={() => navigate(`/events/${event.slug}`)}
                  className="w-full bg-pink-500 text-white px-4 py-2 font-semibold cursor-pointer active:bg-pink-700 transition duration-300 ease-in-out"
                >
                  Beli Tiket
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 my-4">
          <h2 className="text-xl font-bold text-gray-800">Acara Mendatang</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white border rounded-md overflow-hidden flex flex-col"
              >
                <div className="relative h-40 w-full">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="px-4 py-2 flex-1 flex flex-col justify-between">
                  <h3 className="text-base font-semibold text-gray-900">
                    {event.name}
                  </h3>
                  <div className="mt-auto text-sm text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    {event.location}
                  </div>
                  <div className="mt-auto text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {event.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
