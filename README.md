# Slide Presentation App

React + Reveal.js ベースのスライドプレゼンテーション作成ツールです。
JSON ファイルでスライド内容やテーマを定義し、ブラウザ上でプレゼンテーションとして表示します。

## セットアップ

```bash
npm install
```

## コマンド

| コマンド                   | 説明                                       |
|------------------------|------------------------------------------|
| `npm run dev`          | 開発サーバー起動（アドオンビルド + Vite HMR）             |
| `npm run build`        | プロダクションビルド（アドオンビルド + `dist/` に出力）        |
| `npm run build:addons` | アドオンのみビルド                                |
| `npm run preview`      | ビルド済みファイルのプレビュー                          |
| `npm run format`       | Prettier でコード整形（`src/**/*.{ts,tsx,css}`） |
| `npm run typecheck`    | TypeScript 型チェック                         |
| `npm run test`         | テスト実行（Vitest）                            |
| `npm run test:watch`   | テスト監視モード                                 |

## スライドの定義

`public/slides.json` を作成することで、スライドの内容をカスタマイズできます。
このファイルが存在しない場合は、組み込みのテンプレートガイドが表示されます。

### 基本構造

```json
{
  "meta": {
    "title": "プレゼンタイトル",
    "description": "概要説明",
    "author": "作成者",
    "logo": {
      "src": "/my-logo.png",
      "width": 150,
      "height": 50
    }
  },
  "slides": [
    {
      "id": "slide-1",
      "layout": "center",
      "content": {
        "title": "タイトルスライド",
        "subtitle": "サブタイトル"
      }
    }
  ]
}
```

### ロゴ設定

`meta.logo` フィールドでプレゼンテーションのロゴをカスタマイズできます。

| フィールド    | 型      | デフォルト       | 説明        |
|----------|--------|-------------|-----------|
| `src`    | string | `/logo.png` | ロゴ画像のパス   |
| `width`  | number | `120`       | ロゴの幅（px）  |
| `height` | number | `40`        | ロゴの高さ（px） |

`meta.logo` を省略した場合、ロゴは表示されません。`width` と `height` を省略した場合はそれぞれ `120`、`40`
がデフォルト値として使用されます。

### レイアウト一覧

各スライドの `layout` フィールドで、以下のレイアウトを指定できます。

| layout       | 用途          | 主なフィールド                                      |
|--------------|-------------|----------------------------------------------|
| `center`     | 表紙・タイトル・まとめ | `title`, `subtitle`, `variant`               |
| `content`    | コンテンツ表示     | `title`, `steps[]` / `tiles[]` / `component` |
| `two-column` | 左右2カラム      | `title`, `left`, `right`                     |
| `bleed`      | 2カラム全幅      | `title`, `commands[]`, `component`           |
| `custom`     | カスタムコンポーネント | `component`                                  |

`center` レイアウトは `variant` フィールドで表示を切り替えます。

| variant     | 説明                                         |
|-------------|--------------------------------------------|
| （未指定）       | TitleLayout（タイトル・サブタイトル表示）                 |
| `"section"` | SectionLayout（まとめ表示。`body`, `qrCode` 等を使用） |

`content` レイアウトは子要素のフィールドで描画内容が決まります。

| フィールド       | 描画内容            |
|-------------|-----------------|
| `steps`     | Timeline        |
| `tiles`     | FeatureTileGrid |
| `component` | カスタムコンポーネント     |

### two-column レイアウトの詳細

`left` / `right` にそれぞれ以下のフィールドを指定できます。

```json
{
  "heading": "見出し",
  "headingDescription": "見出しの補足テキスト",
  "paragraphs": [
    "段落テキスト（HTML タグ利用可）"
  ],
  "items": [
    {
      "text": "項目名",
      "description": "説明",
      "emphasis": true
    }
  ],
  "codeBlock": {
    "language": "typescript",
    "code": "const x = 1;"
  },
  "component": {
    "name": "ComponentName",
    "props": {}
  }
}
```

### スライドメタ情報

各スライドにオプションの `meta` フィールドを追加して、トランジションや背景を制御できます。

```json
{
  "id": "slide-1",
  "layout": "center",
  "content": {
    "title": "タイトル"
  },
  "meta": {
    "transition": "fade",
    "backgroundColor": "#1a1a2e",
    "backgroundImage": "url(/background.jpg)",
    "notes": "発表者ノート（文字列形式）"
  }
}
```

### 発表者ノート（notes）

`meta.notes` フィールドで発表者向けのノートを定義できます。文字列またはオブジェクトの2つの形式に対応しています。

**文字列形式（シンプル）:**

```json
{
  "meta": {
    "notes": "ここに発表者メモを記述します"
  }
}
```

**オブジェクト形式（スピーカーノート + 要点サマリー + 音声）:**

```json
{
  "meta": {
    "notes": {
      "speakerNotes": "発表者向けのメモや台本を記述します",
      "summary": [
        "要点1: このスライドの重要ポイント",
        "要点2: 聴衆に伝えたいこと"
      ],
      "voice": "/voice/slide-01.wav"
    }
  }
}
```

| フィールド          | 型        | 説明                            |
|----------------|----------|-------------------------------|
| `speakerNotes` | string   | 発表者メモ・台本                      |
| `summary`      | string[] | 要点サマリー（箇条書き）                  |
| `voice`        | string   | 音声ファイルへのパス（`public/` 配下の相対パス） |

`notes` を省略したスライドでは、発表者ビューのノート欄は空欄で表示されます。

### コンポーネントの参照

スライド内で登録済みのコンポーネントを使用できます。

```json
{
  "component": {
    "name": "TerminalAnimation",
    "props": {
      "logTextUrl": "/demo-log.txt"
    }
  }
}
```

組み込みコンポーネントの例: `TerminalAnimation`, `CodeBlockPanel`, `BulletList`, `Timeline` など

## テーマの変更

テーマは2つの方法でカスタマイズできます。

### 方法 1: slides.json 内で定義

`slides.json` に `theme` フィールドを追加します。

```json
{
  "meta": {
    "title": "..."
  },
  "theme": {
    "colors": {
      "primary": "#6c63ff",
      "background": "#0a0a1a",
      "text": "#e0e0e0"
    },
    "fonts": {
      "heading": "'Noto Sans JP', sans-serif",
      "body": "'Noto Sans JP', sans-serif",
      "code": "'Fira Code', monospace",
      "baseFontSize": 24,
      "sources": [
        {
          "family": "MyFont",
          "src": "/fonts/MyFont.woff2"
        },
        {
          "family": "Fira Code",
          "url": "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap"
        }
      ]
    },
    "customCSS": ".reveal h1 { text-shadow: none; }"
  },
  "slides": []
}
```

#### フォント設定の詳細

`theme.fonts` には以下のフィールドを指定できます。

| フィールド          | 型            | デフォルト                                 | 説明                                    |
|----------------|--------------|---------------------------------------|---------------------------------------|
| `heading`      | string       | `'Noto Sans JP', 'Inter', sans-serif` | 見出し用フォント                              |
| `body`         | string       | `'Noto Sans JP', 'Inter', sans-serif` | 本文用フォント                               |
| `code`         | string       | `'Roboto Mono', monospace`            | コードブロック用フォント                          |
| `baseFontSize` | number       | `20`                                  | 基本フォントサイズ（px）。全フォントサイズが比率で自動スケーリングされる |
| `sources`      | FontSource[] | —                                     | フォントソースの配列                            |

`baseFontSize` を変更すると、H1〜Body2 のすべてのフォントサイズが基準値からの比率で自動計算されます。

`sources` でローカルフォントや外部フォントを読み込めます。

```json
{
  "sources": [
    {
      "family": "MyFont",
      "src": "/fonts/MyFont.woff2"
    },
    {
      "family": "Fira Code",
      "url": "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap"
    }
  ]
}
```

| フィールド    | 型      | 説明                                               |
|----------|--------|--------------------------------------------------|
| `family` | string | フォント名                                            |
| `src`    | string | ローカルフォントファイルのパス（`@font-face` で登録される）             |
| `url`    | string | 外部フォント URL（`<link>` タグで読み込まれる。Google Fonts 等に対応） |

### 方法 2: theme-colors.json で色のみ変更

`public/theme-colors.json` を作成すると、色の設定だけを上書きできます。
`meta.themeColors` フィールドで、デフォルトの `/theme-colors.json` 以外のパスを指定することも可能です。

```json
{
  "meta": {
    "title": "プレゼンタイトル",
    "themeColors": "/theme/custom-colors.json"
  }
}
```

```json
{
  "primary": "#6c63ff",
  "background": "#0a0a1a",
  "backgroundAlt": "#12122a",
  "backgroundGrid": "#1a1a3e",
  "textHeading": "#ffffff",
  "textBody": "#c8c8d0",
  "textSubtitle": "#a0a0b0",
  "textMuted": "#808090",
  "border": "#2a2a4a",
  "borderLight": "#1e1e3a",
  "codeText": "#e0e0e0",
  "success": "#4caf50"
}
```

## 発表者ビュー

プレゼンテーション画面の右上にある「発表者ビュー」ボタンをクリックすると、別ウィンドウで発表者ビューが開きます。

### パネル構成

発表者ビューは以下のエリアで構成されています。

**コントロールバー（上部）:**

| 位置 | 操作                | 説明                          |
|----|-------------------|-----------------------------|
| 左側 | 前へ / 進捗 / 次へ      | スライド移動と現在位置の表示（例: `3 / 10`） |
| 右側 | 再生・自動再生・自動スライドショー | 音声制御（詳細は「音声再生」セクションを参照）     |

**メインエリア（中央）:**

```
┌──────────────────┬──────────────────┐
│                  │ 次のスライド         │
│ スピーカーノート    │ プレビュー           │
│                  ├──────────────────┤
│                  │ 前のスライド         │
│                  │ プレビュー           │
└──────────────────┴──────────────────┘
```

| パネル      | 内容                               |
|----------|----------------------------------|
| スピーカーノート | 現在のスライドの `speakerNotes`（発表者メモ）   |
| 次のスライド   | 次のスライドの縮小プレビュー                   |
| 前のスライド   | 前のスライドの縮小プレビュー                   |
| 要点サマリー   | 現在のスライドの `summary`（箇条書き、画面下部に表示） |

最初のスライドでは前スライドプレビューに「最初のスライドです」、最終スライドでは次スライドプレビューに「最後のスライドです」と表示されます。

### 双方向同期

メインウィンドウと発表者ビューは `BroadcastChannel` で双方向に同期されます。

- メインウィンドウでスライドを操作すると、発表者ビューの表示がリアルタイムで更新されます
- 発表者ビューからスライド移動や音声制御を操作すると、メインウィンドウに反映されます

### キーボード操作

発表者ビューでは以下のキーボード操作が使用できます。

| キー                | 操作      |
|-------------------|---------|
| `←`（左矢印）          | 前のスライドへ |
| `→`（右矢印）/ `Space` | 次のスライドへ |

## 音声再生

スライドの `meta.notes.voice` フィールドに音声ファイルのパスを指定すると、スライドごとの音声再生機能が有効になります。音声ファイルは
`public/` 配下に配置してください（例: `public/voice/slide-01.wav`）。

### ツールバー

`voice` が定義されたスライドでは、画面右上のツールバーに以下のボタンが表示されます。

| ボタン       | アイコン  | 機能                         |
|-----------|-------|----------------------------|
| 再生/停止     | スピーカー | 現在のスライドの音声を手動で再生・停止する      |
| 自動再生      | ▶     | スライド遷移時に音声を自動再生する ON/OFF   |
| 自動スライドショー | ▶▶    | 音声終了時に次のスライドへ自動遷移する ON/OFF |

ツールバーは通常時は薄く表示され、マウスホバーで完全に表示されます。発表者ビューのコントロールバーからも同じ操作が可能です。

### 手動再生

スピーカーアイコンをクリックすると、現在のスライドの音声を再生します。再生中にもう一度クリックすると停止します。`voice`
が定義されていないスライドではアイコンは表示されません。

### 自動再生

自動再生ボタン（▶）を ON にすると、スライドを切り替えるたびに、そのスライドに `voice` が定義されていれば自動的に音声が再生されます。

### 自動スライドショー

自動スライドショーボタン（▶▶）を ON
にすると、音声の再生が終了したタイミングで自動的に次のスライドへ遷移します。最終スライドでは自動遷移しません。自動再生と組み合わせることで、全スライドを通した自動プレゼンテーションが可能です。

## アドオンの追加

独自のコンポーネントをアドオンとして追加し、スライド内で利用できます。

### 1. アドオンのディレクトリを作成

```
addons/src/{アドオン名}/
├── entry.ts       # コンポーネント登録
└── MyComponent.tsx  # コンポーネント実装
```

### 2. コンポーネントを実装

```tsx
// addons/src/my-addon/MyComponent.tsx
const React = window.React;

export function MyComponent({ message }: { message: string }) {
  return React.createElement('div', null, message);
}
```

### 3. エントリファイルでコンポーネントを登録

```ts
// addons/src/my-addon/entry.ts
import { MyComponent } from './MyComponent';

window.__ADDON_REGISTER__([
  { name: 'MyComponent', component: MyComponent },
]);
```

### 4. ビルド

```bash
npm run build:addons
```

### 5. スライドで使用

```json
{
  "id": "custom-slide",
  "layout": "custom",
  "content": {
    "component": {
      "name": "MyComponent",
      "props": {
        "message": "Hello!"
      }
    }
  }
}
```

## 静的アセットの配置

`public/` ディレクトリに配置したファイルは、ビルド後にそのままルートパスでアクセスできます。

| ファイル                        | URL                   |
|-----------------------------|-----------------------|
| `public/slides.json`        | `/slides.json`        |
| `public/theme-colors.json`  | `/theme-colors.json`  |
| `public/images/logo.png`    | `/images/logo.png`    |
| `public/voice/slide-01.wav` | `/voice/slide-01.wav` |

## ライセンス

MIT
