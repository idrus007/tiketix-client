import { Ticket } from "lucide-react";

export function Hero() {
  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/75"></div>

      <div className="flex flex-col gap-6 justify-start items-start relative z-10 px-6 md:px-10">
        <h2 className="text-xl md:text-5xl text-white font-semibold max-w-xl">
          Hidupin Momenmu. Rasain Pengalaman Terbaik!
        </h2>
        <p className="text-base md:text-xl text-gray-300 max-w-xl">
          Pesan tiket konser lokal sampai internasional dengan sekali klik.
          Gampang, cepat, dan 100% aman!
        </p>
        <button
          onClick={() => {
            const section = document.getElementById("target-section");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-4 flex items-center px-4 py-3 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold rounded-sm shadow-xl transition-all duration-300 cursor-pointer"
        >
          <Ticket className="inline mr-2" />
          Pesan Tiket Sekarang
        </button>
      </div>
    </div>
  );
}
