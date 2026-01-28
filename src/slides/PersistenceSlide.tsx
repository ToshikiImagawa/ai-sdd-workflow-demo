import type { SyntheticEvent } from 'react';

function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
    const parent = e.currentTarget.parentElement;
    if (parent) {
        parent.innerHTML =
            '<div style="text-align:center;color:#64748b;"><i class="fa-solid fa-database" style="font-size:120px;"></i><br><br>Persistence Diagram</div>';
    }
}

export function PersistenceSlide() {
    return (
        <section className="slide-container" id="slide7">
            <h2 className="slide-title">知識財産の永続化</h2>
            <div className="content-area">
                <div className="two-column">
                    <div
                        className="image-wrapper"
                        style={{
                            border: 'none',
                            boxShadow: 'none',
                            background: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src="http://googleusercontent.com/image_collection/image_retrieval/22249922113068707"
                            alt="Workflow data persistence diagram"
                            style={{ objectFit: 'contain', maxHeight: '400px' }}
                            onError={handleImageError}
                        />
                    </div>
                    <div>
                        <h3>Knowledge vs Ephemeral</h3>
                        <ul>
                            <li>
                                <strong>PRD / Spec / Design:</strong>
                                <br />
                                永続的な知識資産としてリポジトリに残る。
                            </li>
                            <li>
                                <strong>Tasks / Logs:</strong>
                                <br />
                                一時的なデータ。実装完了後に設計書へ統合され、<code>/task_cleanup</code>
                                で削除される。
                            </li>
                        </ul>
                        <p style={{ marginTop: '20px', color: '#38bdf8' }}>
                            → セッションを跨いでも、コンテキストが失われない。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
