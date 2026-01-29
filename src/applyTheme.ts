function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

const keyToCssVar: Record<string, string> = {
    primary: '--theme-primary',
    background: '--theme-background',
    backgroundAlt: '--theme-background-alt',
    backgroundGrid: '--theme-background-grid',
    textHeading: '--theme-text-heading',
    textBody: '--theme-text-body',
    textSubtitle: '--theme-text-subtitle',
    textMuted: '--theme-text-muted',
    border: '--theme-border',
    borderLight: '--theme-border-light',
    codeText: '--theme-code-text',
};

function checkLogo() {
    const img = new Image();
    img.src = '/logo.png';
    img.onerror = () => {
        document.documentElement.classList.add('no-logo');
    };
}

export async function applyTheme() {
    checkLogo();

    let theme: Record<string, string>;
    try {
        const res = await fetch('/theme-colors.json');
        if (!res.ok) return;
        theme = await res.json();
    } catch {
        return;
    }
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme)) {
        const cssVar = keyToCssVar[key];
        if (cssVar) {
            root.style.setProperty(cssVar, value);
            root.style.setProperty(`${cssVar}-rgb`, hexToRgb(value));
        }
    }
}
