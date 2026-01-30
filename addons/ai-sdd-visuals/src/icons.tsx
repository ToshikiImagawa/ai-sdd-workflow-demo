import type { CSSProperties } from 'react'

type IconProps = {
  style?: CSSProperties
}

function SvgIcon({ d, style }: { d: string; style?: CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style={{ fontSize: '24px', ...style }}>
      <path d={d} />
    </svg>
  )
}

/** MUI SmartToy */
export function SmartToyIcon({ style }: IconProps) {
  return (
    <SvgIcon
      style={style}
      d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3M7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5M16 17H8v-2h8zm-.5-4c-.83 0-1.5-.67-1.5-1.5S14.67 10 15.5 10s1.5.67 1.5 1.5S16.33 13 15.5 13"
    />
  )
}

/** MUI Warning */
export function WarningIcon({ style }: IconProps) {
  return <SvgIcon style={style} d="M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z" />
}

/** MUI Balance */
export function BalanceIcon({ style }: IconProps) {
  return (
    <SvgIcon
      style={style}
      d="M13 7.83c.85-.3 1.53-.98 1.83-1.83H18l-3 7c0 1.66 1.57 3 3.5 3s3.5-1.34 3.5-3l-3-7h2V4h-6.17c-.41-1.17-1.52-2-2.83-2s-2.42.83-2.83 2H3v2h2l-3 7c0 1.66 1.57 3 3.5 3S9 14.66 9 13L6 6h3.17c.3.85.98 1.53 1.83 1.83V19H2v2h20v-2h-9zM20.37 13h-3.74l1.87-4.36zm-13 0H3.63L5.5 8.64zM12 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"
    />
  )
}

/** MUI Description */
export function DescriptionIcon({ style }: IconProps) {
  return <SvgIcon style={style} d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z" />
}

/** MUI DesignServices */
export function DesignServicesIcon({ style }: IconProps) {
  return (
    <SvgIcon
      style={style}
      d="M16.24 11.51l1.57-1.57-3.75-3.75-1.57 1.57-4.14-4.13c-.78-.78-2.05-.78-2.83 0l-1.9 1.9c-.78.78-.78 2.05 0 2.83l4.13 4.13L3.13 17.1c-.56.56-.56 1.46 0 2.02l1.75 1.75c.56.56 1.46.56 2.02 0l4.61-4.61 4.13 4.13c.95.95 2.23.6 2.83 0l1.9-1.9c.78-.78.78-2.05 0-2.83zM9.18 11.07L5.04 6.94l1.89-1.9c.01 0 .01-.01.02 0l4.13 4.13zm2.49 2.49L6.3 18.93l-1.75-1.75 5.38-5.38zm5.26 5.37l-1.9 1.9-4.13-4.13 1.57-1.57 1.39 1.39.01-.01 3.05 3.05c.01 0 .02-.01.01.37"
    />
  )
}

/** MUI PlaylistAddCheck */
export function PlaylistAddCheckIcon({ style }: IconProps) {
  return <SvgIcon style={style} d="M14 10H2v2h12zm0-4H2v2h12zM2 16h8v-2H2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3z" />
}

/** MUI Storage */
export function StorageIcon({ style }: IconProps) {
  return <SvgIcon style={style} d="M2 20h20v-4H2zm2-3h2v2H4zM2 4v4h20V4zm4 3H4V5h2zm-4 7h20v-4H2zm2-3h2v2H4z" />
}

/** MUI CheckCircle */
export function CheckCircleIcon({ style }: IconProps) {
  return <SvgIcon style={style} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z" />
}

/** MUI Terminal */
export function TerminalIcon({ style }: IconProps) {
  return <SvgIcon style={style} d="M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2m0 14H4V8h16zm-2-1h-6v-2h6zM7.5 17l-1.41-1.41L8.67 13l-2.59-2.59L7.5 9l4 4z" />
}

/** MUI ArrowDownward */
export function ArrowDownwardIcon({ style }: IconProps) {
  return <SvgIcon style={style} d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8z" />
}
