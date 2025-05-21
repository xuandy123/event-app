import Head from "next/head";
import Hero from "./components/Hero";
import type { NextPage } from "next";
import { APP_NAME } from "./constants";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>{APP_NAME} - Never Miss an Event Again</title>
        <meta
          name="description"
          content="Get weekly event notifications straight to your phone!"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="w-full px-4 lg:px-32">
          <Hero />
      </main>
    </div>
  );
};

export default Home;
