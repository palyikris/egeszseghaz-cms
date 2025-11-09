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

export default function HomePage() {
  const { data: pageData, isLoading: pageLoading } = usePage("home");
  const { data: services, isLoading: servicesLoading } = useServices();
  const hero = pageData?.hero;
  const about = pageData?.about;
  const reviews = pageData?.reviews;
  const servicesTemplate = pageData?.services;
  const navbar = pageData?.navbar;
  const footer = pageData?.footer;

  if (pageLoading || servicesLoading) return <CustomLoader />;

  return (
    <main className="bg-background-light text-text-primary">
      <EditToolbar />
      <EditSidebar />

      <Navbar navbar={navbar} />

      <EditableWrapper id="hero">
        <HeroSection hero={hero} />
      </EditableWrapper>

      <CustomDivider direction="up" className="mt-20" />

      <AboutSection about={about} />

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

      <ReviewsSection reviewsTemplate={reviews} />

      <Footer footer={footer} />
    </main>
  );
}
