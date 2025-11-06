/* eslint-disable prettier/prettier */
import { usePage } from "@/hooks/usePage";
import HeroSection from "@/components/pages/home/hero";
import AboutSection from "@/components/pages/home/about";
import ServicesSection from "@/components/pages/home/services";
import ReviewsSection from "@/components/pages/home/reviews";
import CustomDivider from "@/components/divider";
import { useServices } from "@/hooks/useServices";
import CustomLoader from "@/components/loader";

export default function HomePage() {
  const { data: pageData, isLoading: pageLoading } = usePage("main");
  const { data: services, isLoading: servicesLoading } = useServices();

  console.log(pageData);

  if (pageLoading || servicesLoading) return <CustomLoader />;

  return (
    <main className="bg-background-light text-text-primary">
      <HeroSection />

      <CustomDivider direction="up" className="mt-20" />

      <AboutSection />

      <CustomDivider />

      {services && services.length > 0 ? (
        <ServicesSection services={services} />
      ) : (
        <div className="p-6 text-center">
          Nincsenek elérhető szolgáltatások.
        </div>
      )}

      <ReviewsSection />
    </main>
  );
}
