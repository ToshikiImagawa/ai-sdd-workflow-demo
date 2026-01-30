import type { AddonDefinition } from '../types'
import { VibeCodingDemo } from './VibeCodingDemo'
import { HierarchyFlowVisual } from './HierarchyFlowVisual'
import { PersistenceVisual } from './PersistenceVisual'

export const aiSddVisualsAddon: AddonDefinition = {
  name: 'ai-sdd-visuals',
  components: [
    { name: 'VibeCodingDemo', component: VibeCodingDemo },
    { name: 'HierarchyFlowVisual', component: HierarchyFlowVisual },
    { name: 'PersistenceVisual', component: PersistenceVisual },
  ],
}
