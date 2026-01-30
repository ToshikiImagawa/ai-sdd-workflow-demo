import { registerComponent } from '../components/ComponentRegistry'
import { addons } from './index'

/** 全アドオンのコンポーネントを ComponentRegistry に登録する */
export function registerAddons(): void {
  for (const addon of addons) {
    for (const { name, component } of addon.components) {
      registerComponent(name, component)
    }
  }
}
