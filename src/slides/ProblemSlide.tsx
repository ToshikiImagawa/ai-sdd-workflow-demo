export function ProblemSlide() {
    return (
        <section className="slide-container" id="slide2">
            <h2 className="slide-title">Introduction: The Problem</h2>
            <div className="content-area">
                <div className="two-column">
                    <div>
                        <h3>"Vibe Coding" の限界</h3>
                        <p>AIに対して「いい感じに作って」と指示していませんか？</p>
                        <ul>
                            <li>
                                <strong>曖昧な指示:</strong> AIが意図を推測する必要がある
                            </li>
                            <li>
                                <strong>認識のズレ:</strong> 推測に基づく実装は、開発者の意図と乖離しやすい
                            </li>
                            <li>
                                <strong>バグの温床:</strong> 制御不能なコードが生成される
                            </li>
                        </ul>
                    </div>
                    <div className="vibe-demo-wrapper">
                        <div className="vibe-chat-bubble">"Make a cool button!"</div>
                        <div className="vibe-ai-thinking">
                            <i className="fa-solid fa-robot"></i> Thinking...
                        </div>
                        <div className="vibe-generated-result">
                            <button className="vibe-glitch-button">Click Me?</button>
                            <div className="vibe-error-popup">
                                <i className="fa-solid fa-triangle-exclamation"></i> Style Error
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
