import type { RegisteredComponent } from '../components/ComponentRegistry'

/** アドオンが提供するコンポーネント定義 */
export type AddonComponent = {
  name: string
  component: RegisteredComponent
}

/** アドオン定義 */
export type AddonDefinition = {
  name: string
  components: AddonComponent[]
}
