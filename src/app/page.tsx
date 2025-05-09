import Head from "next/head";
import Hero from "./components/Hero";
import Features from "./components/Features";
import type { NextPage } from "next";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import EndCTA from "./components/EndCTA";
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="max-w-7xl mx-auto">
          <Hero />
        </div>

        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <EndCTA />
      </main>
    </div>
  );
};

export default Home;
