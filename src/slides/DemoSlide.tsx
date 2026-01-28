import { useEffect, useRef, useState } from 'react';
import logText from '../../assets/demo-log.txt?raw';
import styles from './DemoSlide.module.css';

const TYPING_SPEED = 40;
const COMMAND_DONE_PAUSE = 400;
const OUTPUT_LINE_INTERVAL = 150;
const EMPTY_LINE_INTERVAL = 80;
const RESTART_DELAY = 2000;

function getLineClassName(line: string): string {
    if (line.startsWith('$')) return styles['line-command'];
    if (line.startsWith('\u2713')) return styles['line-success'];
    if (line.startsWith('\u26A0')) return styles['line-warning'];
    if (line.startsWith('\u2717')) return styles['line-error'];
    if (line.startsWith('>')) return styles['line-accent'];
    return styles['line-default'];
}

function isCommandLine(line: string): boolean {
    return line.startsWith('$');
}

export function DemoSlide() {
    const lines = logText.split('\n');
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    // IntersectionObserver でスライド可視性を監視
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.5 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // 非表示になったらリセット
    useEffect(() => {
        if (!visible) {
            setLineIndex(0);
            setCharIndex(0);
        }
    }, [visible]);

    // アニメーション駆動
    useEffect(() => {
        if (!visible) return;

        // 全行完了 → リスタート
        if (lineIndex >= lines.length) {
            const timer = setTimeout(() => {
                setLineIndex(0);
                setCharIndex(0);
            }, RESTART_DELAY);
            return () => clearTimeout(timer);
        }

        const currentLine = lines[lineIndex];

        if (isCommandLine(currentLine)) {
            // コマンド行: タイプライター
            if (charIndex < currentLine.length) {
                const timer = setTimeout(() => setCharIndex((c) => c + 1), TYPING_SPEED);
                return () => clearTimeout(timer);
            }
            // タイプ完了 → 次の行へ
            const timer = setTimeout(() => {
                setLineIndex((l) => l + 1);
                setCharIndex(0);
            }, COMMAND_DONE_PAUSE);
            return () => clearTimeout(timer);
        }

        // 出力行 / 空行
        const delay = currentLine.trim() === '' ? EMPTY_LINE_INTERVAL : OUTPUT_LINE_INTERVAL;
        const timer = setTimeout(() => {
            setLineIndex((l) => l + 1);
            setCharIndex(0);
        }, delay);
        return () => clearTimeout(timer);
    }, [visible, lineIndex, charIndex, lines]);

    return (
        <section ref={sectionRef} className="slide-container bleed-image-layout" id="slide9">
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
                    {lines.map((line, i) => {
                        // 未到達の行は非表示
                        if (i > lineIndex) {
                            return (
                                <div key={i} className={`${styles['terminal-line']} ${styles['line-hidden']}`}>
                                    {line || '\u00A0'}
                                </div>
                            );
                        }

                        // 現在の行（コマンド行ならタイプ中）
                        if (i === lineIndex && isCommandLine(line)) {
                            return (
                                <div key={i} className={`${styles['terminal-line']} ${styles['line-visible']} ${getLineClassName(line)}`}>
                                    {line.slice(0, charIndex)}
                                    <span className={styles.cursor} />
                                </div>
                            );
                        }

                        // 現在の行（出力行）はまだ表示前なので非表示
                        if (i === lineIndex) {
                            return (
                                <div key={i} className={`${styles['terminal-line']} ${styles['line-hidden']}`}>
                                    {line || '\u00A0'}
                                </div>
                            );
                        }

                        // 完了済みの行
                        return (
                            <div key={i} className={`${styles['terminal-line']} ${styles['line-visible']} ${getLineClassName(line)}`}>
                                {line || '\u00A0'}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
