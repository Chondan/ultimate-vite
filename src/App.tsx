import '@/App.scss';
import HeroSection from '@/components/hero-section';
import { HeroHeader } from './components/header';
import Features from './components/features-1';
import CallToAction from './components/call-to-action';
import FooterSection from './components/footer';
import { ThemeProvider } from './components/theme-provider';

function App() {
    return (
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
            <main>
                <HeroHeader />
                <HeroSection />
                <Features />
                <CallToAction />
                <FooterSection />
            </main>
        </ThemeProvider>
    );
}

export default App;
