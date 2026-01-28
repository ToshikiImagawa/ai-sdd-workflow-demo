export function WorkflowSlide() {
    return (
        <section className="slide-container" id="slide5">
            <h2 className="slide-title">SDD Workflow Cycle</h2>
            <div className="content-area">
                <div className="timeline-layout">
                    <div className="timeline-line"></div>

                    <div className="timeline-item">
                        <div className="timeline-dot">1</div>
                        <h3>Specify</h3>
                        <p>
                            PRD &amp; 仕様策定
                            <br />
                            <code>/generate_prd</code>
                        </p>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot">2</div>
                        <h3>Plan</h3>
                        <p>
                            設計詳細化
                            <br />
                            <code>/generate_spec</code>
                        </p>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot">3</div>
                        <h3>Task</h3>
                        <p>
                            タスク分解
                            <br />
                            <code>/task_breakdown</code>
                        </p>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot">4</div>
                        <h3>Implement</h3>
                        <p>
                            実装 &amp; レビュー
                            <br />
                            <code>/implement</code>
                        </p>
                    </div>
                </div>
                <p style={{ textAlign: 'center', marginTop: '40px', fontStyle: 'italic' }}>
                    AIとの対話を通じて、仕様を段階的に「育てて」いくフロー
                </p>
            </div>
        </section>
    );
}
