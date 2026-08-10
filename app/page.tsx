import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import NewDrop from "@/components/home/NewDrop";
import Benefits from "@/components/home/Benefits";
import BrandStory from "@/components/home/BrandStory";
import Community from "@/components/home/Community";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main className="bg-[#F5F5F3]">
      <AnnouncementBar />
      <Navbar />

      <Hero />

      <CategoryShowcase />

      <NewDrop />

      <Benefits />

      <BrandStory />

      <Community />

      <Newsletter />

      <Footer />
    </main>
  );
}