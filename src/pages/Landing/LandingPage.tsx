import '@/App.scss';
import { HeroHeader } from './blocks/HeroHeader';
import { HeroSection } from '@/pages/Landing/blocks/HeroSection';
import { FeaturesSection } from './blocks/FeaturesSection';
import { CallToAction } from './blocks/CallToAction';
import { FooterSection } from './blocks/FooterSection';

export const LandingPage = () => {
    return (
        <>
            <HeroHeader />
            <HeroSection />
            <FeaturesSection />
            <CallToAction />
            <FooterSection />
        </>
    );
};
