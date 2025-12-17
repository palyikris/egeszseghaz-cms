import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.title}>
          Egészségház CMS – Felhasználói dokumentáció
        </Heading>

        <p className={styles.subtitle}>
          Ez az oldal bemutatja, hogyan használhatod az Egészségház
          tartalomkezelő rendszerét szolgáltatások, időpontok és tartalmak
          kezelésére.
        </p>

        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/intro">
            Dokumentáció megnyitása
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Felhasználói dokumentáció"
      description="Egészségház CMS – felhasználói útmutató"
    >
      <HomepageHeader />
    </Layout>
  );
}
