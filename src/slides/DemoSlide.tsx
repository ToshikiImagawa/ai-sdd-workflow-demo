import type { SyntheticEvent } from 'react';

function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://placehold.co/600x720/1e293b/4ade80?text=Terminal+Demo';
}

export function DemoSlide() {
    return (
        <section className="slide-container bleed-image-layout" id="slide9">
            <div className="bleed-content">
                <h2>Demo Flow</h2>
                <p>わずか数コマンドで、要件定義から実装準備まで完了します。</p>
                <ul style={{ marginTop: '20px', fontFamily: "'Roboto Mono'", fontSize: '18px' }}>
                    <li style={{ color: '#f1f5f9', marginBottom: '10px' }}>$ /sdd_init</li>
                    <li style={{ color: '#f1f5f9', marginBottom: '10px' }}>$ /generate_prd "To-Do App"</li>
                    <li style={{ color: '#f1f5f9', marginBottom: '10px' }}>$ /generate_spec</li>
                    <li style={{ color: '#38bdf8', marginBottom: '10px' }}>$ /task_breakdown</li>
                    <li style={{ color: '#4ade80' }}>$ /implement</li>
                </ul>
            </div>
            <img
                className="bleed-image"
                src="http://googleusercontent.com/image_collection/image_retrieval/9800985785940806365"
                alt="Terminal command line interface"
                onError={handleImageError}
            />
        </section>
    );
}
