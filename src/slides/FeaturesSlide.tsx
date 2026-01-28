export function FeaturesSlide() {
    return (
        <section className="slide-container" id="slide8">
            <h2 className="slide-title">Advanced Features</h2>
            <div className="content-area">
                <div className="two-column tiled-content">
                    <div className="tile">
                        <div className="icon">
                            <i className="fa-solid fa-microchip"></i>
                        </div>
                        <h3>Context Efficiency</h3>
                        <p>
                            レビュー処理を独立したサブエージェントに隔離。メインコンテキストのトークン消費を抑え、長期間の開発でも軽快な動作を維持。
                        </p>
                    </div>
                    <div className="tile">
                        <div className="icon">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <h3>Clarification</h3>
                        <p>
                            <code>/clarify</code>{' '}
                            コマンドが仕様の穴を9つのカテゴリで自動スキャン。質問と回答を自動的に仕様書へ統合し、手戻りを防ぎます。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
