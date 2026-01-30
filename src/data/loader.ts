import type { PresentationData, SlideData, ValidationError } from './types'
import defaultSlidesJson from './default-slides.json'

/** デフォルトのプレゼンテーションデータ */
export const defaultPresentationData: PresentationData = defaultSlidesJson as PresentationData

function addError(errors: ValidationError[], path: string, message: string, expected: string, actual: string): void {
  errors.push({ path, message, expected, actual })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function validateSlide(slide: unknown, index: number, errors: ValidationError[]): void {
  const prefix = `slides[${index}]`
  if (!isRecord(slide)) {
    addError(errors, prefix, 'スライドはオブジェクトである必要があります', 'object', typeof slide)
    return
  }
  if (typeof slide.id !== 'string' || slide.id === '') {
    addError(errors, `${prefix}.id`, 'idは空でない文字列である必要があります', 'string', String(typeof slide.id))
  }
  if (typeof slide.layout !== 'string' || slide.layout === '') {
    addError(
      errors,
      `${prefix}.layout`,
      'layoutは空でない文字列である必要があります',
      'string',
      String(typeof slide.layout),
    )
  }
  if (!isRecord(slide.content)) {
    addError(errors, `${prefix}.content`, 'contentはオブジェクトである必要があります', 'object', typeof slide.content)
  }
}

/** バリデーションエラーの詳細を取得する */
export function getValidationErrors(data: unknown): ValidationError[] {
  const errors: ValidationError[] = []

  if (!isRecord(data)) {
    addError(errors, '', 'データはオブジェクトである必要があります', 'object', typeof data)
    return errors
  }

  // meta チェック
  if (!isRecord(data.meta)) {
    addError(errors, 'meta', 'metaはオブジェクトである必要があります', 'object', typeof data.meta)
  } else if (typeof data.meta.title !== 'string' || data.meta.title === '') {
    addError(errors, 'meta.title', 'meta.titleは空でない文字列である必要があります', 'string', typeof data.meta.title)
  }

  // slides チェック
  if (!Array.isArray(data.slides)) {
    addError(errors, 'slides', 'slidesは配列である必要があります', 'array', typeof data.slides)
  } else {
    if (data.slides.length === 0) {
      addError(errors, 'slides', 'slidesは1つ以上のスライドを含む必要があります', 'non-empty array', 'empty array')
    }
    for (let i = 0; i < data.slides.length; i++) {
      validateSlide(data.slides[i], i, errors)
    }
  }

  return errors
}

/** スライドデータのバリデーション。型ガードとして動作する */
export function validatePresentationData(data: unknown): data is PresentationData {
  return getValidationErrors(data).length === 0
}

/** スライドデータを読み込む。未指定・バリデーション失敗時はデフォルトデータにフォールバック */
export function loadPresentationData(
  source: PresentationData | undefined,
  defaultData: PresentationData,
): PresentationData {
  if (source === undefined) {
    return defaultData
  }

  const errors = getValidationErrors(source)
  if (errors.length > 0) {
    console.error('[slide-content-customization] バリデーションエラーが検出されました:')
    for (const error of errors) {
      console.error(`  ${error.path}: ${error.message} (期待: ${error.expected}, 実際: ${error.actual})`)
    }
    console.warn('[slide-content-customization] デフォルトデータにフォールバックします')
    return defaultData
  }

  return source as PresentationData & { slides: SlideData[] }
}
