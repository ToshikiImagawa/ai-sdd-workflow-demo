import type {ThemeData} from './data'

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
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
}

export async function applyTheme() {
  let theme: Record<string, string>
  try {
    const res = await fetch('/theme-colors.json')
    if (!res.ok) return
    theme = await res.json()
  } catch {
    return
  }
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme)) {
    const cssVar = keyToCssVar[key]
    if (cssVar) {
      root.style.setProperty(cssVar, value)
      root.style.setProperty(`${cssVar}-rgb`, hexToRgb(value))
    }
  }
}

/** ThemeDataからCSS変数を適用する */
const themeColorToCssVar: Record<string, string> = {
  primary: '--theme-primary',
  accent: '--theme-primary',
  background: '--theme-background',
  text: '--theme-text-body',
}

const themeFontToCssVar: Record<string, string> = {
  heading: '--theme-font-heading',
  body: '--theme-font-body',
  code: '--theme-font-code',
}

export function applyThemeData(themeData: ThemeData): void {
  const root = document.documentElement

  if (themeData.colors) {
    for (const [key, value] of Object.entries(themeData.colors)) {
      if (!value) continue
      const cssVar = themeColorToCssVar[key]
      if (cssVar) {
        root.style.setProperty(cssVar, value)
        if (/^#[0-9a-fA-F]{6}$/.test(value)) {
          root.style.setProperty(`${cssVar}-rgb`, hexToRgb(value))
        }
      }
    }
  }

  if (themeData.fonts) {
    for (const [key, value] of Object.entries(themeData.fonts)) {
      if (!value) continue
      const cssVar = themeFontToCssVar[key]
      if (cssVar) {
        root.style.setProperty(cssVar, value)
      }
    }
  }

  if (themeData.customCSS) {
    const styleId = 'sdd-custom-theme-css'
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = styleId
      document.head.appendChild(styleEl)
    }
    styleEl.textContent = themeData.customCSS
  }
}
