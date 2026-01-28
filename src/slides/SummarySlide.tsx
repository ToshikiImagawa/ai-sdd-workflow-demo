export function SummarySlide() {
    return (
        <section className="slide-container" id="slide10">
            <div className="section-title-layout">
                <h2>Start SDD Today</h2>
                <hr />
                <p style={{ fontSize: '24px', maxWidth: '800px', marginBottom: '40px' }}>
                    AI開発に「確実性」と「持続可能性」を。
                    <br />
                    最新の導入手順とドキュメントはGitHubをご覧ください。
                </p>

                {/* QR Code Container */}
                <div
                    style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '30px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://github.com/ToshikiImagawa/ai-sdd-workflow"
                        alt="GitHub Repository QR Code"
                        style={{ display: 'block', width: '200px', height: '200px' }}
                    />
                </div>

                <p style={{ marginTop: '10px', fontSize: '24px', color: '#38bdf8', fontFamily: "'Roboto Mono'" }}>
                    <i className="fa-brands fa-github"></i> github.com/ToshikiImagawa/ai-sdd-workflow
                </p>
            </div>
        </section>
    );
}
