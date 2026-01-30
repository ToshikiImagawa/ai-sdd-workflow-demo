import { VibeCodingDemo } from './VibeCodingDemo'
import { HierarchyFlowVisual } from './HierarchyFlowVisual'
import { PersistenceVisual } from './PersistenceVisual'

declare global {
  interface Window {
    __ADDON_REGISTER__?: (addonName: string, components: Array<{ name: string; component: React.ComponentType<Record<string, unknown>> }>) => void
  }
}

const register = window.__ADDON_REGISTER__
if (register) {
  register('ai-sdd-visuals', [
    { name: 'VibeCodingDemo', component: VibeCodingDemo },
    { name: 'HierarchyFlowVisual', component: HierarchyFlowVisual },
    { name: 'PersistenceVisual', component: PersistenceVisual },
  ])
}
