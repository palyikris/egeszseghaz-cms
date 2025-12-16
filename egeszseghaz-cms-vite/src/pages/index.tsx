/* eslint-disable prettier/prettier */
import { usePage } from "@/hooks/pages/usePage";
import HeroSection from "@/components/pages/home/hero";
import AboutSection from "@/components/pages/home/about";
import ServicesSection from "@/components/pages/home/services";
import ReviewsSection from "@/components/pages/home/reviews";
import CustomDivider from "@/components/divider";
import { useServices } from "@/hooks/service/useServices";
import CustomLoader from "@/components/loader";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { EditToolbar } from "@/components/edit/EditToolBar";
import { EditSidebar } from "@/components/edit/EditSidebar";
import { EditableWrapper } from "@/components/edit/EditableWrapper";
import { Announcement } from "@/components/banners/announcement";
import { NewServiceSection } from "@/components/banners/new_service";
import { useNewService } from "@/hooks/banner/useNewService";
import { useAnnouncement } from "@/hooks/banner/useAnnouncement";
import WeeklyServicesCalendar from "@/components/pages/home/calendar";

export default function HomePage() {
  const { data: pageData, isLoading: pageLoading } = usePage("home");
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: newService, isLoading: newServiceLoading } = useNewService();
  const { data: announcement, isLoading: announcementLoading } =
    useAnnouncement();
  const hero = pageData?.hero;
  const about = pageData?.about;
  const reviews = pageData?.reviews;
  const servicesTemplate = pageData?.services;
  const navbar = pageData?.navbar;
  const footer = pageData?.footer;

  if (
    pageLoading ||
    servicesLoading ||
    newServiceLoading ||
    announcementLoading
  )
    return <CustomLoader />;

  return (
    <main className="bg-background-light text-text-primary flex flex-col min-h-screen justify-start">
      <EditToolbar />
      <EditSidebar />

      <EditableWrapper id="navbar">
        <Navbar navbar={navbar} />
      </EditableWrapper>

      <EditableWrapper id="hero">
        <HeroSection hero={hero} />
      </EditableWrapper>

      <div className="calendar-shell">
        <WeeklyServicesCalendar />
      </div>

      {announcement && announcement.isDisplayed ? (
        <Announcement data={announcement} />
      ) : null}
      {newService && newService.isDisplayed ? (
        <NewServiceSection data={newService} />
      ) : null}

      <CustomDivider direction="up" className="mt-10" />

      <EditableWrapper id="about">
        <AboutSection about={about} />
      </EditableWrapper>

      <CustomDivider />

      {services && services.length > 0 ? (
        <ServicesSection
          services={services}
          servicesTemplate={servicesTemplate}
        />
      ) : (
        <div className="p-6 text-center">
          Nincsenek elérhető szolgáltatások.
        </div>
      )}

      <EditableWrapper id="reviews">
        <ReviewsSection reviewsTemplate={reviews} />
      </EditableWrapper>

      <EditableWrapper id="footer">
        <Footer footer={footer} />
      </EditableWrapper>
    </main>
  );
}
