import { Menu, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { InputSearch } from "../elements/input-search";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 flex items-center justify-between gap-2 px-4 lg:px-10 py-2.5 transition-colors duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="hidden sm:flex w-full items-center justify-between">
        <Link to="/" className="hidden sm:block text-3xl font-bold text-white">
          𝔗𝔦𝔨𝔢𝔱𝔦𝔵
        </Link>
      </div>

      <InputSearch />

      <div className="hidden sm:flex items-center gap-2">
        <Button
          onClick={() => navigate("/auth/sign-in")}
          variant="secondary"
          className="cursor-pointer"
        >
          <User2 />
          Login
        </Button>
      </div>

      <div className="block sm:hidden">
        <Button variant="ghost" className="text-white">
          <Menu />
        </Button>
      </div>
    </header>
  );
}
