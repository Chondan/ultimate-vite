import '@/App.scss';
import HeroSection from '@/components/blocks/HeroSection';
import { HeroHeader } from './components/blocks/HeroHeader';
import Features from './components/blocks/FeaturesSection';
import CallToAction from './components/blocks/CallToAction';
import FooterSection from './components/blocks/FooterSection';

function App() {
    return (
        <>
            <HeroHeader />
            <HeroSection />
            <Features />
            <CallToAction />
            <FooterSection />
        </>
    );
}

export default App;
