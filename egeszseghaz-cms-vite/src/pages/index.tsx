/* eslint-disable prettier/prettier */
import { usePage } from "@/hooks/usePage";
import HeroSection from "@/components/pages/home/hero";
import AboutSection from "@/components/pages/home/about";
import ServicesSection from "@/components/pages/home/services";
import ReviewsSection from "@/components/pages/home/reviews";
import CustomDivider from "@/components/divider";
import { useServices } from "@/hooks/useServices";
import CustomLoader from "@/components/loader";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { EditToolbar } from "@/components/edit/EditToolBar";
import { EditSidebar } from "@/components/edit/EditSidebar";
import { EditableWrapper } from "@/components/edit/EditableWrapper";
import { Announcement } from "@/components/banners/announcement";
import { defaultAnnouncementTemplate } from "@/templates/announcement/announcement_template";

export default function HomePage() {
  const { data: pageData, isLoading: pageLoading } = usePage("home");
  const { data: services, isLoading: servicesLoading } = useServices();
  const hero = pageData?.hero;
  const about = pageData?.about;
  const reviews = pageData?.reviews;
  const servicesTemplate = pageData?.services;
  const navbar = pageData?.navbar;
  const footer = pageData?.footer;
  const announcement = defaultAnnouncementTemplate;

  if (pageLoading || servicesLoading) return <CustomLoader />;

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

      <Announcement data={announcement} />

      <CustomDivider direction="up" className="mt-20" />

      <EditableWrapper id="about">
        <AboutSection about={about} />
      </EditableWrapper>

      <CustomDivider />

      {services && services.length > 0 ? (
        <EditableWrapper id="services">
          <ServicesSection
            services={services}
            servicesTemplate={servicesTemplate}
          />
        </EditableWrapper>
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
