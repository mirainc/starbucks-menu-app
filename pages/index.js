import Head from 'next/head';
import Error from 'next/error';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import styles from '../styles/Home.module.css';
import { getRecord } from '../utils';
import MenuItem from '../components/MenuItem';
import Modifier from '../components/Modifier';
import ColdbrewMenuItems from '../components/ColdbrewMenuItem';

const espressoAndCoffeeGroupTag = 'espresso-and-coffee';
const icedColdbrewGroupTag = 'iced-cold-brew';
const menuApi = 'https://menu-api.raydiant.com/v1/groups';
const apiKey = process.env.RAYDIANT_MENU_API_KEY ?? '';

const fetchMenuData = async (apiKey, menu) => {
  return fetch(`${menuApi}?menus=${menu}&depth=5`, {
    headers: { 'X-API-Key': apiKey },
  });
};

export const getServerSideProps = async (context) => {
  const {
    menu,
    footnote = '',
    espressoAndCoffeeSubheading = '',
    espressoAndCoffeeBottomText = '',
  } = context.query;

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
  const res = await fetchMenuData(apiKey, menu);
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
      initialData: data,
      footnote,
      espressoAndCoffeeSubheading,
      espressoAndCoffeeBottomText,
      apiKey,
      menu,
    },
  };
};

export default function Home({
  errorCode,
  errorTitle,
  initialData,
  footnote,
  espressoAndCoffeeSubheading,
  espressoAndCoffeeBottomText,
  apiKey,
  menu,
}) {
  const { data } = useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      const res = await fetchMenuData(apiKey, menu).json();
      return await res.json();
    },
    refetchInterval: 1000 * 10, // Refetch every 10 seconds.
    staleTime: 1000, // Prevent fetching data on page load.
    initialData,
  });

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
          </div>
        </section>
      </main>
    </div>
  );
}
