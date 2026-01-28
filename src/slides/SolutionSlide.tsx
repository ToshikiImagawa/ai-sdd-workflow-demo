export function SolutionSlide() {
    return (
        <section className="slide-container bleed-image-layout" id="slide3">
            <div className="bleed-content">
                <h2>Solution: Single Source of Truth</h2>
                <p>
                    AI-SDD-Workflowは、<strong>仕様書（Specification）</strong>
                    をプロジェクトの唯一の真実と定義します。
                </p>
                <p>曖昧な「雰囲気（Vibe）」ではなく、明確なドキュメントに基づいてAIを制御します。</p>
            </div>
            <div className="hierarchy-visual-wrapper">
                <div className="hierarchy-flow-particle"></div>

                <div className="hierarchy-node hierarchy-primary">
                    <i className="fa-solid fa-scale-balanced"></i> CONSTITUTION (PRD)
                </div>
                <div className="hierarchy-arrow"></div>
                <div className="hierarchy-node hierarchy-standard">
                    <i className="fa-solid fa-file-contract"></i> Specification
                </div>
                <div className="hierarchy-arrow"></div>
                <div className="hierarchy-node hierarchy-standard">
                    <i className="fa-solid fa-pen-ruler"></i> Design
                </div>
                <div className="hierarchy-arrow"></div>
                <div className="hierarchy-node hierarchy-ephemeral">
                    <i className="fa-solid fa-list-check"></i> Tasks (Temporary)
                </div>
            </div>
        </section>
    );
}
