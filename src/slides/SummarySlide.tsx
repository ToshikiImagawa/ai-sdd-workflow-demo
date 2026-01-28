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
                        background: '#ffffff',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '30px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://github.com/ToshikiImagawa/ai-sdd-workflow"
                        alt="GitHub Repository QR Code"
                        style={{ display: 'block', width: '200px', height: '200px' }}
                    />
                </div>

                <p style={{ marginTop: '10px', fontSize: '24px', color: '#e60012', fontFamily: "'Roboto Mono'" }}>
                    <i className="fa-brands fa-github"></i> github.com/ToshikiImagawa/ai-sdd-workflow
                </p>
            </div>
        </section>
    );
}
