import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { CreditCard, Heart, Home, Search, UserRound } from "lucide-react";
import { AvatarDropdown } from "../elements/avatar-dropdwon";

export function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <header className="w-full fixed top-0 left-0 z-50 flex items-center justify-between gap-2 px-4 lg:px-16 py-2.5 bg-white border-b">
        <div className="hidden sm:flex w-full max-w-[400px] items-center justify-between">
          <Link
            to="/dashboard"
            className="hidden sm:block text-3xl font-bold text-black"
          >
            𝔗𝔦𝔨𝔢𝔱𝔦𝔵
          </Link>
        </div>

        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari event seru di sini..."
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <Button variant="outline" className="text-black">
            <Heart />
          </Button>
          <Button variant="outline" className="text-black">
            <CreditCard />
          </Button>
          <AvatarDropdown />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pt-16 px-4 lg:px-16 overflow-y-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t pb-14 sm:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Tiketix. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-pink-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t sm:hidden">
        <div className="flex items-center justify-around py-2">
          <Button variant="ghost" className="text-black">
            <Home />
          </Button>
          <Button variant="ghost" className="text-black">
            <Heart />
          </Button>
          <Button variant="ghost" className="text-black">
            <CreditCard />
          </Button>
          <Button variant="ghost" className="text-black">
            <UserRound />
          </Button>
        </div>
      </nav>
    </div>
  );
}
