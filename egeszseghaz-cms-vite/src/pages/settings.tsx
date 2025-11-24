/* eslint-disable prettier/prettier */
import { title } from "@/components/primitives";
import { SettingsLayout } from "@/layouts/settings";

export default function SettingsPage() {

  

  return (
    <SettingsLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Settings</h1>
        </div>
      </section>
    </SettingsLayout>
  );
}
