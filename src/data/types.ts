/** プレゼンテーション全体のデータ */
export interface PresentationData {
  meta: PresentationMeta
  theme?: ThemeData
  slides: SlideData[]
}

/** プレゼンテーションのメタ情報 */
export interface PresentationMeta {
  title: string
  description?: string
  author?: string
  logo?: LogoConfig
}

/** ロゴ設定 */
export interface LogoConfig {
  src: string
  width?: number
  height?: number
}

/** 個別スライドのデータ */
export interface SlideData {
  id: string
  layout: string
  content: SlideContent
  meta?: SlideMeta
}

/** スライドのコンテンツ */
export interface SlideContent {
  title?: string
  subtitle?: string
  body?: string
  items?: ContentItem[]
  component?: ComponentReference
  [key: string]: unknown
}

/** リスト等のコンテンツ項目 */
export interface ContentItem {
  text: string
  emphasis?: boolean
  fragment?: boolean
  fragmentIndex?: number
  items?: ContentItem[]
}

/** カスタムコンポーネントへの参照 */
export interface ComponentReference {
  name: string
  props?: Record<string, unknown>
  style?: Record<string, string | number>
}

/** スライドのノート情報 */
export interface SlideNotes {
  /** スピーカーノート（発表者メモ・台本） */
  speakerNotes?: string
  /** 要点サマリー（箇条書き用の配列） */
  summary?: string[]
  /** 音声ファイルへの相対パス */
  voice?: string
}

/** 音声再生の状態 */
export type AudioPlaybackState = 'idle' | 'playing' | 'paused'

/** スライドのメタ情報 */
export interface SlideMeta {
  transition?: string
  notes?: string | SlideNotes
  backgroundImage?: string
  backgroundColor?: string
}

/** 発表者ビューに同期されるスライド状態 */
export interface PresenterSlideState {
  currentIndex: number
  currentSlide: SlideData
  nextSlide: SlideData | null
  totalSlides: number
}

/** BroadcastChannel で送受信するメッセージ */
export type PresenterViewMessage = { type: 'slideChanged'; payload: { currentIndex: number; slides: SlideData[] } } | { type: 'presenterViewReady' } | { type: 'presenterViewClosed' }

/** テーマデータ */
export interface ThemeData {
  colors?: ColorPalette
  fonts?: FontDefinition
  customCSS?: string
}

/** カラーパレット */
export interface ColorPalette {
  primary?: string
  accent?: string
  background?: string
  text?: string
  [key: string]: string | undefined
}

/** フォントソース定義 */
export interface FontSource {
  family: string
  /** ローカルフォントファイルパス（@font-face で登録） */
  src?: string
  /** 外部フォント URL（<link> タグで読み込み） */
  url?: string
}

/** フォント定義 */
export interface FontDefinition {
  heading?: string
  body?: string
  code?: string
  /** 基本フォントサイズ（px）。デフォルト 20px。全サイズをこの値を基準に比率で算出 */
  baseFontSize?: number
  /** フォントソースの配列 */
  sources?: FontSource[]
}

/** バリデーションエラー */
export interface ValidationError {
  path: string
  message: string
  expected: string
  actual: string
}
