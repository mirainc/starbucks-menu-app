import Head from 'next/head';
import Error from 'next/error';
import cn from 'classnames';
import styles from '../styles/Home.module.css';
import { getRecord } from '../utils';
import MenuItem from '../components/MenuItem';
import Modifier from '../components/Modifier';
import ColdbrewMenuItems from '../components/ColdbrewMenuItem';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const espressoAndCoffeeGroupTag = 'espresso-and-coffee';
const icedColdbrewGroupTag = 'iced-cold-brew';
const menuApi = 'https://menu-api.raydiant.com/v1/groups';
const apiKey = process.env.RAYDIANT_MENU_API_KEY ?? '';

export const getServerSideProps = async (context) => {
  const {
    menu,
    footnote = '',
    espressoAndCoffeeSubheading = '',
    espressoAndCoffeeBottomText = '',
    multi: multiSeralized = '',
  } = context.query;

  console.log(multiSeralized);
  const multi = JSON.parse(multiSeralized);

  // Set the response status code to BadRequest if missing the menu query param.
  if (!menu) {
    context.res.statusCode = 400;
    return {
      props: {
        errorCode: context.res.statusCode,
        errorTitle: 'Please provide a menu',
      },
    };
  }

  // Make request to the On-Brand Menu API.
  const res = await fetch(`${menuApi}?menus=${menu}&depth=5`, {
    headers: { 'X-API-Key': apiKey },
  });
  // Forward the response status code from the On-Brand Menu API.
  if (!res.ok) {
    context.res.statusCode = res.status;
    return {
      props: {
        errorCode: context.res.statusCode,
        errorTitle: `Failed to load menu for ${menu}`,
      },
    };
  }

  const data = await res.json();

  return {
    props: {
      data,
      footnote,
      espressoAndCoffeeSubheading,
      espressoAndCoffeeBottomText,
      multi,
    },
  };
};

export default function Home({
  errorCode,
  errorTitle,
  data,
  footnote,
  espressoAndCoffeeSubheading,
  espressoAndCoffeeBottomText,
  multi,
}) {
  const router = useRouter();

  useEffect(() => {
    const refreshData = () => {
      // Strip hash from URL. The __raydiantWindowId hash is added by Raydiant to communicate
      // with the Raydiant SDK for features such as Dynamic Duration. Unfortunately, this causes
      // the browser to do a client-side navigation instead of a server-side navigation, which doesn't
      // refresh the data. To work around this, we strip the hash from the URL before refreshing.
      //
      // If you need to use the Raydiant SDK with NextJS, we recommend using a library like swr or
      // react query to handle data fetching. See this commit for an example of how to use react-query:
      // https://github.com/mirainc/starbucks-menu-app/commit/436850c337730d4174b10cd396c177446c9c5ddb
      const refreshUrl = router.asPath.split('#')[0];
      router.replace(refreshUrl);
    };

    const id = setInterval(() => {
      refreshData();
    }, 10000);

    return () => clearInterval(id);
  }, [router]);

  if (errorCode) {
    return <Error statusCode={errorCode} title={errorTitle} />;
  }

  if (!data) {
    return null;
  }

  const { groups } = data;
  if (!groups) return;

  const espressoAndCoffeeData = getRecord(groups, espressoAndCoffeeGroupTag);
  const espressoAndCoffeeItems = espressoAndCoffeeData.items;
  const espressoAndCoffeeModifiers = espressoAndCoffeeData.groups[0];

  // Column 1 content
  const minColumn1Items = 0;
  const maxColumn1Items = 4;
  const maxModifiers = 3;
  const espressoMenuColumn1Content = espressoAndCoffeeItems.slice(
    minColumn1Items,
    maxColumn1Items,
  );

  // Column 2 content
  const minColumn2Items = 4;
  const maxColumn2Items = 9;
  const espressoMenuColumn2Content = espressoAndCoffeeItems.slice(
    minColumn2Items,
    maxColumn2Items,
  );

  const icedColdbrewData = getRecord(groups, icedColdbrewGroupTag);
  const maxIcedColdbrewItems = 3;

  return (
    <div>
      <Head>
        <title>Starbucks App</title>
        <meta name="description" content="A simple custom menu app." />
        <meta name="author" content="Raydiant" />
      </Head>

      <main className={styles.mainLayout}>
        <section className={styles.espressoAndCoffeeMenuGroup}>
          <header>
            <h1>{espressoAndCoffeeData.name}</h1>
            <h2 className="h2 subheading">{espressoAndCoffeeSubheading}</h2>
          </header>
          <div className={styles.espressoAndCoffeeMenuItems}>
            <div>
              {espressoMenuColumn1Content.map((c) => (
                <MenuItem key={c.id} {...c} />
              ))}
            </div>
            <div>
              {espressoMenuColumn2Content.map((c) => (
                <MenuItem key={c.id} {...c} />
              ))}
            </div>
          </div>

          <div>
            <hr />
          </div>

          <div className={styles.espressoAndCoffeeModifiers}>
            {espressoAndCoffeeModifiers.items
              .slice(0, maxModifiers)
              .map((m) => (
                <Modifier key={m.id} {...m} />
              ))}
          </div>

          <div className={styles.espressoAndCoffeeBottomTextContainer}>
            <h2
              className={cn(
                'subheading',
                'h2',
                styles.espressoAndCoffeeBottomText,
              )}
            >
              {espressoAndCoffeeBottomText}
            </h2>
          </div>

          {/* Ensure new line characters are respected by setting white space to "pre-wrap" */}
          <footer style={{ whiteSpace: 'pre-wrap' }}>{footnote}</footer>
        </section>

        <section className={styles.coldbrewMenuGroup}>
          <header>
            <h1>{icedColdbrewData.name}</h1>
          </header>
          <div className={styles.coldbrewMenuItems}>
            {icedColdbrewData.items.slice(0, maxIcedColdbrewItems).map((i) => (
              <ColdbrewMenuItems key={i.id} {...i} />
            ))}
            {multi.map((x) => (
              <pre key={x}>
                <code>{x}</code>
              </pre>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
