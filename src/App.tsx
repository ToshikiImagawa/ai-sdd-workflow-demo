import { useReveal } from './hooks/useReveal';
import {
    TitleSlide,
    ProblemSlide,
    SolutionSlide,
    ConstitutionSlide,
    WorkflowSlide,
    AutomationSlide,
    PersistenceSlide,
    FeaturesSlide,
    DemoSlide,
    SummarySlide,
} from './slides';

export function App() {
    const deckRef = useReveal();

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
