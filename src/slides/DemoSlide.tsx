import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import logText from '../../assets/demo-log.txt?raw';
import styles from './DemoSlide.module.css';
import {BleedLayout} from '../layouts';

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

const commands = [
    {text: '$ /sdd_init', color: 'var(--theme-text-heading)'},
    {text: '$ /generate_prd "To-Do App"', color: 'var(--theme-text-heading)'},
    {text: '$ /generate_spec', color: 'var(--theme-text-heading)'},
    {text: '$ /task_breakdown', color: 'var(--theme-primary)'},
    {text: '$ /implement', color: 'var(--theme-text-heading)'},
];

export function DemoSlide() {
    const lines = logText.split('\n');
    const sectionRef = useRef<HTMLElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [lineIndex]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            {threshold: 0.5},
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) {
            setLineIndex(0);
            setCharIndex(0);
        }
    }, [visible]);

    useEffect(() => {
        if (!visible) return;

        if (lineIndex >= lines.length) {
            const timer = setTimeout(() => {
                setLineIndex(0);
                setCharIndex(0);
            }, RESTART_DELAY);
            return () => clearTimeout(timer);
        }

        const currentLine = lines[lineIndex];

        if (isCommandLine(currentLine)) {
            if (charIndex < currentLine.length) {
                const timer = setTimeout(() => setCharIndex((c) => c + 1), TYPING_SPEED);
                return () => clearTimeout(timer);
            }
            const timer = setTimeout(() => {
                setLineIndex((l) => l + 1);
                setCharIndex(0);
            }, COMMAND_DONE_PAUSE);
            return () => clearTimeout(timer);
        }

        const delay = currentLine.trim() === '' ? EMPTY_LINE_INTERVAL : OUTPUT_LINE_INTERVAL;
        const timer = setTimeout(() => {
            setLineIndex((l) => l + 1);
            setCharIndex(0);
        }, delay);
        return () => clearTimeout(timer);
    }, [visible, lineIndex, charIndex, lines]);

    return (
        <BleedLayout
            id="slide9"
            sectionRef={sectionRef}
            left={
                <>
                    <Typography variant="h2" sx={{mb: '20px'}}>
                        Demo Flow
                    </Typography>
                    <Typography variant="body1">
                        わずか数コマンドで、要件定義から実装準備まで完了します。
                    </Typography>
                    <List disablePadding sx={{mt: '20px', fontFamily: "'Roboto Mono'", fontSize: '18px'}}>
                        {commands.map((cmd) => (
                            <ListItem key={cmd.text} disablePadding sx={{color: cmd.color, mb: '10px'}}>
                                {cmd.text}
                            </ListItem>
                        ))}
                    </List>
                </>
            }
            right={
                <Box className={styles['terminal-window']}>
                    <Box className={styles['terminal-titlebar']}>
                        <span className={`${styles['terminal-dot']} ${styles['terminal-dot-red']}`}/>
                        <span className={`${styles['terminal-dot']} ${styles['terminal-dot-yellow']}`}/>
                        <span className={`${styles['terminal-dot']} ${styles['terminal-dot-green']}`}/>
                        <span className={styles['terminal-title']}>Terminal</span>
                    </Box>
                    <Box ref={terminalBodyRef} className={styles['terminal-body']}>
                        {lines.map((line, i) => {
                            if (i > lineIndex) {
                                return (
                                    <div key={i} className={`${styles['terminal-line']} ${styles['line-hidden']}`}>
                                        {line || '\u00A0'}
                                    </div>
                                );
                            }

                            if (i === lineIndex && isCommandLine(line)) {
                                return (
                                    <div key={i}
                                         className={`${styles['terminal-line']} ${styles['line-visible']} ${getLineClassName(line)}`}>
                                        {line.slice(0, charIndex)}
                                        <span className={styles.cursor}/>
                                    </div>
                                );
                            }

                            if (i === lineIndex) {
                                return (
                                    <div key={i} className={`${styles['terminal-line']} ${styles['line-hidden']}`}>
                                        {line || '\u00A0'}
                                    </div>
                                );
                            }

                            return (
                                <div key={i}
                                     className={`${styles['terminal-line']} ${styles['line-visible']} ${getLineClassName(line)}`}>
                                    {line || '\u00A0'}
                                </div>
                            );
                        })}
                    </Box>
                </Box>
            }
        />
    );
}
