import { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import { TitleSlide } from './slides/TitleSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { SolutionSlide } from './slides/SolutionSlide';
import { ConstitutionSlide } from './slides/ConstitutionSlide';
import { WorkflowSlide } from './slides/WorkflowSlide';
import { AutomationSlide } from './slides/AutomationSlide';
import { PersistenceSlide } from './slides/PersistenceSlide';
import { FeaturesSlide } from './slides/FeaturesSlide';
import { DemoSlide } from './slides/DemoSlide';
import { SummarySlide } from './slides/SummarySlide';

export function App() {
    const deckRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!deckRef.current) return;

        const deck = new Reveal(deckRef.current, {
            width: 1280,
            height: 720,
            margin: 0,
            minScale: 0.2,
            maxScale: 2.0,
            center: false,
            controls: true,
            slideNumber: 'c/t',
            hash: true,
            transition: 'slide',
            progress: true,
            keyboard: true,
            touch: true,
            navigationMode: 'linear',
        });

        deck.initialize();

        return () => {
            deck.destroy();
        };
    }, []);

    return (
        <div className="reveal" ref={deckRef}>
            <div className="slides">
                <TitleSlide />
                <ProblemSlide />
                <SolutionSlide />
                <ConstitutionSlide />
                <WorkflowSlide />
                <AutomationSlide />
                <PersistenceSlide />
                <FeaturesSlide />
                <DemoSlide />
                <SummarySlide />
            </div>
        </div>
    );
}
