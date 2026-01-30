export type {
  PresentationData,
  PresentationMeta,
  SlideData,
  SlideContent,
  ContentItem,
  ComponentReference,
  SlideMeta,
  ThemeData,
  ColorPalette,
  FontDefinition,
  ValidationError,
} from './types'

export { loadPresentationData, validatePresentationData, getValidationErrors, defaultPresentationData } from './loader'
