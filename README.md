# Slide Presentation App

React + Reveal.js ベースのスライドプレゼンテーション作成ツールです。
JSON ファイルでスライド内容やテーマを定義し、ブラウザ上でプレゼンテーションとして表示します。

## セットアップ

```bash
npm install
```

## コマンド

| コマンド              | 説明                      |
|-------------------|-------------------------|
| `npm run dev`     | 開発サーバー起動（ホットリロード対応）     |
| `npm run build`   | プロダクションビルド（`dist/` に出力） |
| `npm run preview` | ビルド済みファイルのプレビュー         |
| `npm run format`  | Prettier でコード整形         |

## スライド内容の変更

`public/slides.json` を作成することで、スライドの内容をカスタマイズできます。
このファイルが存在しない場合は、組み込みのテンプレートガイドが表示されます。

### 基本構造

```json
{
  "meta": {
    "title": "プレゼンタイトル",
    "description": "概要説明",
    "author": "作成者"
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

### レイアウト一覧

各スライドの `layout` フィールドで、以下のレイアウトを指定できます。

| layout       | 用途              | 主なフィールド                            |
|--------------|-----------------|--------------------------------------|
| `center`     | 表紙・タイトル・まとめ | `title`, `subtitle`, `variant`       |
| `content`    | コンテンツ表示      | `title`, `steps[]` / `tiles[]` / `component` |
| `two-column` | 左右2カラム        | `title`, `left`, `right`             |
| `bleed`      | 2カラム全幅        | `title`, `commands[]`, `component`   |
| `custom`     | カスタムコンポーネント  | `component`                          |

`center` レイアウトは `variant` フィールドで表示を切り替えます。

| variant     | 説明                                   |
|-------------|--------------------------------------|
| （未指定）      | TitleLayout（タイトル・サブタイトル表示）           |
| `"section"` | SectionLayout（まとめ表示。`body`, `qrCode` 等を使用） |

`content` レイアウトは子要素のフィールドで描画内容が決まります。

| フィールド     | 描画内容         |
|-----------|--------------|
| `steps`   | Timeline     |
| `tiles`   | FeatureTileGrid |
| `component` | カスタムコンポーネント |

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
    "notes": "発表者ノート"
  }
}
```

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
      "code": "'Fira Code', monospace"
    },
    "customCSS": ".reveal h1 { text-shadow: none; }"
  },
  "slides": []
}
```

### 方法 2: theme-colors.json で色のみ変更

`public/theme-colors.json` を作成すると、色の設定だけを上書きできます。

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

export function MyComponent({message}: { message: string }) {
    return React.createElement('div', null, message);
}
```

### 3. エントリファイルでコンポーネントを登録

```ts
// addons/src/my-addon/entry.ts
import {MyComponent} from './MyComponent';

window.__ADDON_REGISTER__([
    {name: 'MyComponent', component: MyComponent},
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

| ファイル                       | URL                  |
|----------------------------|----------------------|
| `public/slides.json`       | `/slides.json`       |
| `public/theme-colors.json` | `/theme-colors.json` |
| `public/images/logo.png`   | `/images/logo.png`   |

## ライセンス

MIT
