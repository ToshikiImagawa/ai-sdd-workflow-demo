import logText from '../../assets/demo-log.txt?raw';
import styles from './DemoSlide.module.css';

function getLineClassName(line: string): string {
    if (line.startsWith('$')) return styles['line-command'];
    if (line.startsWith('\u2713')) return styles['line-success'];
    if (line.startsWith('\u26A0')) return styles['line-warning'];
    if (line.startsWith('\u2717')) return styles['line-error'];
    if (line.startsWith('>')) return styles['line-accent'];
    return styles['line-default'];
}

export function DemoSlide() {
    const lines = logText.split('\n');

    return (
        <section className="slide-container bleed-image-layout" id="slide9">
            <div className="bleed-content">
                <h2>Demo Flow</h2>
                <p>わずか数コマンドで、要件定義から実装準備まで完了します。</p>
                <ul style={{ marginTop: '20px', fontFamily: "'Roboto Mono'", fontSize: '18px' }}>
                    <li style={{ color: '#1a1a1a', marginBottom: '10px' }}>$ /sdd_init</li>
                    <li style={{ color: '#1a1a1a', marginBottom: '10px' }}>$ /generate_prd "To-Do App"</li>
                    <li style={{ color: '#1a1a1a', marginBottom: '10px' }}>$ /generate_spec</li>
                    <li style={{ color: '#e60012', marginBottom: '10px' }}>$ /task_breakdown</li>
                    <li style={{ color: '#1a1a1a' }}>$ /implement</li>
                </ul>
            </div>
            <div className={styles['terminal-window']}>
                <div className={styles['terminal-titlebar']}>
                    <span className={`${styles['terminal-dot']} ${styles['terminal-dot-red']}`} />
                    <span className={`${styles['terminal-dot']} ${styles['terminal-dot-yellow']}`} />
                    <span className={`${styles['terminal-dot']} ${styles['terminal-dot-green']}`} />
                    <span className={styles['terminal-title']}>Terminal</span>
                </div>
                <div className={styles['terminal-body']}>
                    {lines.map((line, i) => (
                        <div key={i} className={`${styles['terminal-line']} ${getLineClassName(line)}`}>
                            {line || '\u00A0'}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
