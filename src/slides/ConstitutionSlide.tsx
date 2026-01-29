export function ConstitutionSlide() {
    return (
        <section className="slide-container" id="slide4">
            <h2 className="slide-title">CONSTITUTION.md: プロジェクト原則</h2>
            <div className="content-area">
                <div className="two-column">
                    <div>
                        <p>
                            プロジェクトのルートに配置される「非交渉の原則」。全ての開発プロセスはこのファイルに従います。
                        </p>
                        <div
                            style={{
                                background: 'var(--theme-background-alt)',
                                padding: '20px',
                                borderRadius: '8px',
                                border: '1px solid var(--theme-border)',
                                marginTop: '20px',
                            }}
                        >
                            <code style={{display: 'block', color: 'var(--theme-primary)', marginBottom: '10px'}}>
                                &gt; Hierarchy of Truth
                            </code>
                            <ul style={{margin: 0, paddingLeft: '20px', color: 'var(--theme-text-heading)'}}>
                                <li>
                                    1. <strong>PRD</strong> (Why &amp; What)
                                </li>
                                <li>
                                    2. <strong>Specification</strong> (How structured)
                                </li>
                                <li>
                                    3. <strong>Design</strong> (Implementation details)
                                </li>
                                <li>
                                    4. <strong>Tasks</strong> (Actionable steps)
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3>厳格な依存関係</h3>
                        <ul>
                            <li>下位ドキュメントは上位ドキュメントに矛盾してはならない</li>
                            <li>実装（Task）は必ず設計（Design）に基づく</li>
                            <li>「なんとなく実装」を許さないガードレール</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
