import Head from 'next/head';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import type { NextPage } from 'next';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import EndCTA from './components/EndCTA';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>ChiBuzz - Never Miss an Event Again</title>
        <meta name="description" content="Get weekly event notifications straight to your phone!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <div className='max-w-7xl mx-auto'>
          <Hero />
        </div>
        
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <EndCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Home;