import styles from './SolutionSlide.module.css';

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
            <div className={styles['hierarchy-visual-wrapper']}>
                <div className={styles['hierarchy-flow-particle']}></div>

                <div className={`${styles['hierarchy-node']} ${styles['hierarchy-primary']}`}>
                    <i className="fa-solid fa-scale-balanced"></i> CONSTITUTION (PRD)
                </div>
                <div className={styles['hierarchy-arrow']}></div>
                <div className={`${styles['hierarchy-node']} ${styles['hierarchy-standard']}`}>
                    <i className="fa-solid fa-file-contract"></i> Specification
                </div>
                <div className={styles['hierarchy-arrow']}></div>
                <div className={`${styles['hierarchy-node']} ${styles['hierarchy-standard']}`}>
                    <i className="fa-solid fa-pen-ruler"></i> Design
                </div>
                <div className={styles['hierarchy-arrow']}></div>
                <div className={`${styles['hierarchy-node']} ${styles['hierarchy-ephemeral']}`}>
                    <i className="fa-solid fa-list-check"></i> Tasks (Temporary)
                </div>
            </div>
        </section>
    );
}
