import Head from "next/head";
import Image from "next/image";
import cn from "classnames";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Starbucks App</title>
        <meta name="description" content="A simple custom menu app." />
        <meta name="author" content="Raydiant" />
      </Head>

      <main className={styles.mainLayout}>
        <section className={styles.espressoAndCoffeeMenuGroup}>
          <header>
            <h1>Test</h1>
            <h2 className="h2 subheading">Test</h2>
          </header>
          <div className={styles.espressoAndCoffeeMenuItems}>
            <div>Column A</div>
            <div>Column B</div>
          </div>

          <div>
            <hr />
          </div>

          <div className={styles.espressoAndCoffeeModifiers}>
            Modifiers here
          </div>

          <div className={styles.espressoAndCoffeeBottomTextContainer}>
            <h2
              className={cn(
                "subheading",
                "h2",
                styles.espressoAndCoffeeBottomText
              )}
            >
              Heading here
            </h2>
          </div>
        </section>

        <section className={styles.coldbrewMenuGroup}>
          <header>
            <h1>Heading here</h1>
          </header>
          <div className={styles.coldbrewMenuItems}>Items here</div>
        </section>
      </main>
    </div>
  );
}
