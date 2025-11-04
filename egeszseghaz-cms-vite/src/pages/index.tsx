import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";

import { usePage } from "@/hooks/usePage";

export default function HomePage() {
  const { data, isLoading } = usePage("main");

  console.log(data);

  if (isLoading) return <div className="p-6">Loading…</div>;

  return (
    <main>
      <section className="w-full h-screen relative bg-primary">
        <div className="w-100 h-100 left-1/2 absolute top-1/3 opacity-60 rounded-full bg-primary-dark z-3" />
        <div className="absolute transform left-3/5 translate-y-1/3 z-5">
          <img
            alt="Main of building"
            className="rounded-2xl shadow-lg"
            height={200}
            src="/public/main_image.png"
            width={400}
          />
        </div>
        <div className="absolute w-full h-full bg-primary-light z-1" />
        <Card className="absolute z-10 bg-transparent shadow-primary shadow-sm border border-primary max-w-lg top-1/4 left-10">
          <CardHeader>
            <h1 className="text-4xl font-bold text-primary-dark">
              Üdvözöljük oldalunkon!
            </h1>
          </CardHeader>
          <CardBody>
            <p className="text-lg text-primary-dark opacity-80">
              Ha szeretnél elkezdeni az Egészégeddel foglalkozni, akkor itt az
              alkalom. Gyere és próbáld ki az Átlós utca 17-19 alatt található
              <span className="font-bold"> Pesterzsébeti Egészségházat</span>,
              ahol az Egészségedért vagyunk.
            </p>
          </CardBody>
          <CardFooter>
            <Button color="primary" variant="ghost">
              Megnézem
            </Button>
          </CardFooter>
        </Card>
        <div className="absolute w-full left-0 bottom-0">
          <div className="flex justify-center items-center gap-4"></div>
        </div>
      </section>
      <section className="w-full h-screen bg-background-light"></section>
    </main>
  );
}
