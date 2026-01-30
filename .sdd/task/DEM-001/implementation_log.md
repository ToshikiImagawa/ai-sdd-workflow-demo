# 実装進捗ログ: DEM-001

## 実装サマリー

**機能名**: スライドコンテンツカスタマイズ
**アプローチ**: 完全データ駆動化（全10枚のスライドをJSON化、SlideRendererで統一レンダリング）

## 設計判断

### 1. レイアウト実装方式
- **選択**: SlideRenderer集約方式
- **理由**: 既存の4レイアウト（Title/Content/Bleed/Section）をSlideRenderer内で活用し、レイアウト種別ごとのレンダリングロジックをSlideRenderer.tsxに集約。個別レイアウトファイルを新規作成するよりも、既存レイアウトの再利用が効率的
- **代替案**: 各レイアウト種別に個別ファイルを作成 → 不要な抽象化になると判断

### 2. アイコン解決方式
- **選択**: 名前ベースレジストリ（`Icon:` プレフィックス）
- **理由**: JSONから文字列でアイコンを指定可能にするため。`registerDefaultComponents`でMUIアイコンを名前登録
- **代替案**: コンポーネント直接指定 → JSONで表現不可

### 3. TerminalAnimationのデフォルトlogText注入
- **選択**: registerDefaults.tsxでラッパーコンポーネントを作成
- **理由**: TerminalAnimationはlogText propsが必須。デフォルトデータからはコンポーネント参照のみでpropsを渡さないため、`?raw`インポートしたlogTextを事前注入するラッパーが必要

### 4. HTMLコンテンツの処理
- **選択**: `dangerouslySetInnerHTML`で`<strong>`等のHTMLタグを含む文字列をレンダリング
- **理由**: 既存スライドで使用されている`<strong>`, `<code>`, `<br>`タグをJSON文字列から復元するため。コンテンツはすべてアプリ内部のJSON定義であり、外部入力ではないためXSSリスクなし

### 5. IntersectionObserverのテストモック
- **選択**: test-setup.tsでグローバルモックを設定
- **理由**: jsdom環境にIntersectionObserverが存在しないため、TerminalAnimationコンポーネントを含むSlideRendererテストで必要

## テスト結果

| テストファイル | テスト数 | 結果 |
|:---|:---|:---|
| loader.test.ts | 18 | 全パス |
| ComponentRegistry.test.tsx | 7 | 全パス |
| SlideRenderer.test.tsx | 9 | 全パス |
| **合計** | **34** | **全パス** |

## 作成/変更ファイル一覧

### 新規作成

| ファイル | 内容 |
|:---|:---|
| `src/data/types.ts` | 型定義（11型） |
| `src/data/loader.ts` | バリデーション + データローダー |
| `src/data/default-slides.json` | デフォルトスライドデータ（10枚） |
| `src/data/index.ts` | re-export |
| `src/components/ComponentRegistry.tsx` | コンポーネントレジストリ |
| `src/components/SlideRenderer.tsx` | データ駆動型スライドレンダラー |
| `src/components/registerDefaults.tsx` | デフォルトコンポーネント登録 |
| `src/test-setup.ts` | テスト環境セットアップ |
| `src/data/__tests__/loader.test.ts` | loaderユニットテスト |
| `src/components/__tests__/ComponentRegistry.test.tsx` | レジストリユニットテスト |
| `src/components/__tests__/SlideRenderer.test.tsx` | SlideRenderer統合テスト |

### 変更

| ファイル | 変更内容 |
|:---|:---|
| `src/App.tsx` | データ駆動型に改修 |
| `src/applyTheme.ts` | `applyThemeData(ThemeData)` 関数追加 |
| `src/layouts/TitleLayout.tsx` | meta props追加 |
| `src/layouts/ContentLayout.tsx` | meta props追加 |
| `src/layouts/BleedLayout.tsx` | meta props追加 |
| `src/layouts/SectionLayout.tsx` | meta props追加 |
| `src/styles/global.css` | フォントCSS変数フォールバック追加 |
| `vite.config.ts` | テスト設定（setupFiles）追加 |
| `package.json` | test scripts, devDependencies追加 |
| `.prettierrc` | bracketSpacing: true |

## 未完了項目（要目視確認）

- [ ] デフォルトデータでのプレゼンテーション表示確認
- [ ] 10枚すべてのスライドの見た目が変更前と一致することの目視確認
- [ ] Reveal.jsナビゲーション動作確認
- [ ] フラグメント表示確認
- [ ] トランジションアニメーション確認
- [ ] ViteのHMRでJSONデータ変更の即時反映確認
