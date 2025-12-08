/* eslint-disable prettier/prettier */
import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { DefaultServiceDetailTemplate } from "@/templates/service_detail/service_detail_template";

export default function SeedServiceDetailPage() {
  const [status, setStatus] = useState<string | null>(null);

  const seed = async () => {
    setStatus("Seeding...");

    try {
      const ref = doc(db, "template", "serviceDetail");
      await setDoc(ref, DefaultServiceDetailTemplate, { merge: true });

      setStatus("Seeded successfully.");
    } catch (err: any) {
      console.error(err);
      setStatus("Error: " + (err?.message ?? String(err)));
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seed serviceDetail template</h1>
      <p className="mb-4">This page will write the default `serviceDetail` template to Firestore at `template/serviceDetail`.</p>

      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-accent text-primary-dark rounded"
          onClick={seed}
        >
          Seed Firestore
        </button>
        <button
          className="px-4 py-2 border rounded"
          onClick={() => navigator.clipboard?.writeText(JSON.stringify(DefaultServiceDetailTemplate, null, 2))}
        >
          Copy template JSON
        </button>
      </div>

      {status && <pre className="mt-4 p-3 bg-surface rounded">{status}</pre>}
    </main>
  );
}
