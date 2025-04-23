import { UserLayout } from "@/components/layouts/user-layout";
import { Calendar, Heart, MapPin, Plus } from "lucide-react";
import { useState } from "react";

const eventDetail = {
  name: "Jakarta Music Festival",
  date: "2023-06-01",
  location: "ICE BSD City",
  image: "/images/placeholder.svg",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi orci dui, bibendum ac sodales quis, malesuada vel metus. Praesent ac condimentum ante, sed vulputate enim. Integer a libero a sapien molestie congue. Nullam lacinia scelerisque ultricies. Vivamus rutrum turpis vel tortor tincidunt porttitor. Praesent sed lectus sit amet felis ultricies euismod. Ut et scelerisque nisi. Phasellus commodo lectus quis sapien porttitor, nec iaculis dui porttitor. \n
              Donec dapibus dolor augue, id dictum nisi fermentum eget. Curabitur fermentum cursus efficitur. Morbi fringilla ac mi eget hendrerit. Aliquam bibendum nec justo at pharetra. Ut vitae facilisis turpis. Donec lobortis ullamcorper molestie. Nullam ligula eros, commodo id nunc sed, venenatis auctor metus. Cras interdum justo ipsum, egestas suscipit metus bibendum nec. Phasellus velit urna, varius in magna non, dignissim malesuada urna. Donec turpis neque, laoreet imperdiet mollis quis, elementum a ex. In sem urna, fermentum eget tempus varius, tincidunt ac est. Etiam sed luctus purus. Cras vitae ante at tellus luctus efficitur. Vestibulum vel volutpat justo. Proin nec est nisi. Curabitur in placerat mi. Vestibulum vehicula mauris in quam egestas scelerisque.`,
  tickets: [
    {
      id: 1,
      name: "Festival",
      price: 100000,
    },
    {
      id: 2,
      name: "VIP",
      price: 200000,
    },
    {
      id: 3,
      name: "VVIP",
      price: 300000,
    },
    {
      id: 4,
      name: "VVIP Gold",
      price: 400000,
    },
    {
      id: 5,
      name: "VVIP Platinum",
      price: 500000,
    },
    {
      id: 6,
      name: "VVIP Diamond",
      price: 600000,
    },
  ],
};

export default function EventDetailUser() {
  // Inisialisasi state untuk menyimpan qty masing-masing ticket
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // Handler saat tombol Plus diklik
  const handleAdd = (ticketId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [ticketId]: (prev[ticketId] || 0) + 1,
    }));
  };

  // Hitung total harga
  const totalPrice = eventDetail.tickets.reduce((acc, ticket) => {
    const qty = quantities[ticket.id] || 0;
    return acc + ticket.price * qty;
  }, 0);

  return (
    <UserLayout>
      <div className="flex flex-col md:flex-row gap-4 mt-2 mb-4">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col bg-white border rounded-md overflow-hidden">
            <div className="relative w-full">
              <img
                src={eventDetail.image}
                alt={eventDetail.name}
                className="w-full h-72 object-cover rounded-t-md"
              />
            </div>
            <div className="px-4 py-3">
              <h2 className="text-xl font-semibold text-gray-900">
                {eventDetail.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="flex items-center text-gray-500 text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {eventDetail.date}
                </span>
                <span className="flex items-center text-gray-500 text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {eventDetail.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border rounded-md overflow-hidden px-4 py-3">
            <h2 className="text-xl font-bold text-gray-800">
              Tentang {eventDetail.name}
            </h2>
            {eventDetail.description.split("\n").map((line, idx) => (
              <p className="text-gray-600 mt-1 leading-relaxed" key={idx}>
                {line.trim()}
              </p>
            ))}
          </div>

          <div className="flex flex-col bg-white border rounded-md overflow-hidden px-4 py-3">
            <h2 className="text-xl font-bold text-gray-800">Tentang Tiket</h2>
            <p className="text-gray-600 mt-1 leading-relaxed">
              <span className="font-bold">
                Ibu hamil, Lansia, tidak diperkenankan membeli tiket Festival
                untuk kenyamanan bersama.
              </span>
              <br />
              Tiket yang telah dibeli tidak dapat dikembalikan kecuali acara
              dibatalkan oleh penyelenggara Karena Kategori Festival adalah
              kategori berdiri, Usia minimum penonton festival = 12 Tahun dengan
              didampingi oleh wali / orang tua
              <br />
              <br />
              *Harga sudah termasuk pajak
            </p>
          </div>

          <div className="flex flex-col bg-white border rounded-md overflow-hidden px-4 py-3">
            <h2 className="text-xl font-bold text-gray-800">
              Tentang Penukaran Tiket
            </h2>
            <span className="mt-1 space-y-1 text-gray-600 leading-relaxed">
              <p>
                Semua penonton wajib menukarkan tiket dengan gelang festival
                sebagai akses resmi masuk ke area acara.
              </p>
              <p>
                Penukaran gelang dapat dilakukan di lokasi yang ditentukan oleh
                panitia sebelum hari acara atau pada hari-H.
              </p>
              <p>
                Untuk proses penukaran, pembeli wajib membawa identitas diri
                asli yang masih berlaku. Jenis identitas yang diterima antara
                lain: <strong>KTP, KIA, Paspor, SIM, atau Kartu Pelajar</strong>
                .
              </p>
              <p>
                Nama pada identitas harus sesuai dengan nama yang terdaftar saat
                pembelian tiket. Jika tidak sesuai, penukaran dapat ditolak.
              </p>
              <p>
                Gelang yang sudah diterima tidak boleh dilepas, rusak, atau
                dipindahkan ke orang lain. Jika gelang rusak/hilang, penonton
                tidak akan mendapatkan pengganti dan tidak dapat masuk kembali.
              </p>
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="relative w-full rounded-md overflow-hidden">
            <img
              src="/images/placeholder.svg"
              alt="Ticket"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800">Tiket</h2>
            <div className="flex flex-col gap-2 mt-1">
              {eventDetail.tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="grid grid-cols-3 bg-white border rounded-md overflow-hidden px-4 py-3"
                >
                  <span className="text-gray-600">{ticket.name}</span>
                  <span className="text-gray-800 font-semibold">
                    {ticket.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                  <div className="flex items-center justify-end gap-4">
                    <button className="text-pink-500 cursor-pointer transform hover:scale-110 transition duration-200 ease-in-out">
                      <Heart className="w-5 h-5" fill="currentColor" />
                    </button>
                    <button
                      onClick={() => handleAdd(ticket.id)}
                      className="bg-pink-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-center cursor-pointer transform hover:scale-110 transition duration-200 ease-in-out"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white flex items-center justify-between border border-pink-500 rounded-md overflow-hidden">
            <div className="flex flex-col px-4 py-2">
              <h2 className="text-lg font-bold text-gray-800">Total</h2>
              <p className="text-gray-800 font-semibold">
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </p>
            </div>
            <button className="bg-pink-500 text-white px-6 h-full uppercase font-medium hover:bg-pink-600 transition duration-300 ease-in-out active:scale-95 text-sm">
              Lanjutkan
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
