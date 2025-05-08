import Head from 'next/head';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SubscriptionForm from './components/SubscriptionForm';
import Footer from './components/Footer';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Head>
        <title>EventAlert - Never Miss an Event Again</title>
        <meta name="description" content="Get weekly event notifications straight to your phone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        <Hero />
        <Features />
        <SubscriptionForm />
      </main>

      <Footer />
    </div>
  );
};

export default Home;