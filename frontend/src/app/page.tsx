import Hero from "@/sections/Hero";
import HomeAbout from "@/components/home/HomeAbout";
import HomeActivities from "@/components/home/HomeActivities";
import EventsCalendar from "@/components/shared/EventsCalendar";
import HomeCTA from "@/components/home/HomeCTA";

export default function Home() {
  return (
    <main>

      <HomeAbout />
      <HomeActivities />
      <EventsCalendar />
      <HomeCTA />
    </main>
  );
}
