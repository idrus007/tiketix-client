import { Hero } from "@/components/containers/hero";
import { Navbar } from "@/components/containers/navbar";

export default function Welcome() {
  return (
    <>
      <Navbar />
      <Hero />
      <div
        id="target-section"
        className="h-screen flex items-center justify-center text-center"
      >
        <h2 className="text-3xl font-bold">Welcome Page</h2>
      </div>
    </>
  );
}
