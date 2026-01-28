export function AutomationSlide() {
    return (
        <section className="slide-container" id="slide6">
            <h2 className="slide-title">Powerful Automation</h2>
            <div className="content-area">
                <div className="tiled-content">
                    <div className="tile">
                        <div className="icon">
                            <i className="fa-solid fa-file-contract"></i>
                        </div>
                        <h3>Auto Review</h3>
                        <p>ドキュメント生成後、即座にAIレビュアーが起動。人間の介入前に品質を担保します。</p>
                    </div>
                    <div className="tile">
                        <div className="icon">
                            <i className="fa-solid fa-list-check"></i>
                        </div>
                        <h3>Task Breakdown</h3>
                        <p>
                            設計書から実装タスクを自動分解。TDDベースの小さなステップで確実な実装を支援。
                        </p>
                    </div>
                    <div className="tile">
                        <div className="icon">
                            <i className="fa-solid fa-traffic-light"></i>
                        </div>
                        <h3>Vibe Detector</h3>
                        <p>
                            ユーザーの指示の曖昧さを3段階（赤/黄/緑）で自動判定し、リスクを警告。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
