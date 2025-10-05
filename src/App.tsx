import '@/App.scss';
import HeroSection from '@/components/hero-section';
import { HeroHeader } from './components/header';
import Features from './components/features-1';
import CallToAction from './components/call-to-action';
import FooterSection from './components/footer';

function App() {
    return (
        <main>
            <HeroHeader />
            <HeroSection />
            <Features />
            <CallToAction />
            <FooterSection />
        </main>
    );
}

export default App;
