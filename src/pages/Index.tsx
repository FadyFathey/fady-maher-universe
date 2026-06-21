
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import About from '@/components/About';
import Technologies from '@/components/Technologies';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import MobileCtaBar from '@/components/MobileCtaBar';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <SeoHead
        title="Fady Fathey Maher | Websites That Bring You Customers"
        description={t("hero.subheading")}
        path="/"
      />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Partners />
        <Testimonials />
        <Projects />
        <Contact />
        <About />
        <Technologies />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
};

export default Index;
