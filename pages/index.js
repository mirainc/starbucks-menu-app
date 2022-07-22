import Head from "next/head";
import Error from "next/error";
import Image from "next/image";
import cn from "classnames";
import styles from "../styles/Home.module.css";
import { getRecord } from "../utils";

const espressoAndCoffeeGroupTag = "espresso-and-coffee";
const icedColdbrewGroupTag = "iced-cold-brew";
const menuApi = "https://menu-api.raydiant.com/v1/groups";
const apiKey = process.env.RAYDIANT_MENU_API_KEY ?? "";

export const getServerSideProps = async (context) => {
  const { menu, footnote } = context.query;

  // Set the response status code to BadRequest if missing the menu query param.
  if (!menu) {
    context.res.statusCode = 400;
    return {
      props: {
        errorCode: context.res.statusCode,
        errorTitle: "Please provide a menu",
      },
    };
  }

  // Make request to the On-Brand Menu API.
  const res = await fetch(`${menuApi}?menus=${menu}&depth=4`, {
    headers: { "X-API-Key": apiKey },
  });
  // Forward the response status code from the On-Brand Menu API.
  if (!res.ok) {
    context.res.statusCode = res.status;
    return {
      props: {
        errorCode: context.res.statusCode,
        errorTitle: `Failed to load Starbucks menu for ${menu}`,
      },
    };
  }

  const data = await res.json();
  const starbucksData = data.groups[0];

  return {
    props: {
      data: starbucksData,
      footnote: footnote || "",
    },
  };
};

export default function Home({ errorCode, errorTitle, data, footnote }) {
  console.log({ errorCode, errorTitle, data, footnote });

  if (errorCode) {
    return <Error statusCode={errorCode} title={errorTitle} />;
  }

  if (!data) {
    return null;
  }

  const { groups } = data;
  if (!groups) return;

  const espressoAndCoffeeData = getRecord(groups, espressoAndCoffeeGroupTag);
  console.log(espressoAndCoffeeData);

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
