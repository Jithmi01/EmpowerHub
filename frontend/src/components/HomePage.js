import HeroCarousel from './HeroCarousel';
import DonationSection from './DonationSection';
import ImpactSection from './ImpactSection';
import Navbar from './Navbar';
import Footer from './Footer';
const HomePage = () => {
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroCarousel />
        <DonationSection />
        <ImpactSection />
      </main>
      <Footer />
    </div>;
};
export default HomePage;