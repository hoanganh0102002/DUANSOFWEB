import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import CoreServices from '../components/CoreServices';
import BackgroundDecor from '../components/BackgroundDecor';
import { LogoCarousel } from '../components/LogoCarousel';
import { EcosystemSection } from '../components/EcosystemSection';
import { IntegrationsSection } from '../components/IntegrationsSection';
import { FAQSection } from '../components/FAQSection';
import { Footer } from '../components/FooterNextjs';


export default function Home() {
  return (
    <div className="min-h-screen font-sans overflow-clip relative" style={{ background: '#f8fbff' }}>
      {/* SVG Background – kéo dài toàn bộ trang */}
      <BackgroundDecor />

      <div className="relative z-10 flex flex-col">
        <Header />

        <Hero />
        
        <div className="-mt-12">
           <Stats />
        </div>

        <div className="-mt-8">
           <CoreServices />
        </div>

        <LogoCarousel />
        <EcosystemSection />
        <IntegrationsSection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
}