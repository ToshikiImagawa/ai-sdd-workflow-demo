# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

AI-SDDワークフロープラグインのデモ用プレゼンテーション。React + Reveal.js で構築されたスライドアプリケーション。

## コマンド

```bash
npm run dev      # 開発サーバー起動（Vite HMR）
npm run build    # プロダクションビルド（dist/ に出力）
npm run preview  # ビルド済みファイルのプレビュー
npm run format   # Prettier でコード整形（src/**/*.{ts,tsx,css}）
```

## アーキテクチャ

React コンポーネントで各スライドを定義し、Reveal.js でプレゼンテーションとして描画する構成。

```
src/
├── App.tsx          # Reveal.js 初期化とスライド配置（ルート）
├── main.tsx         # エントリポイント
├── slides/          # 各スライド（独立した React コンポーネント、10枚）
├── components/      # 再利用可能な UI パーツ
├── layouts/         # スライド構造のラッパー（4種）
├── visuals/         # 複雑なアニメーション付きビジュアル
├── hooks/           # カスタムフック（useReveal）
├── styles/          # グローバル CSS（変数、アニメーション、Reveal.js オーバーライド）
├── theme.ts         # MUI テーマ設定
└── reveal.d.ts      # Reveal.js の TypeScript 型定義
```

### スライドの追加・削除

`App.tsx` の `<div className="slides">` 内でコンポーネントの追加・削除を行う。並び順がスライドの順序になる。

### コンポーネント設計パターン

- **slides/** — コンテナコンポーネント。レイアウトと共通コンポーネントを組み合わせてスライドを構成する
- **layouts/** — 構造ラッパー。`ContentLayout`（タイトル付き左寄せ）、`TitleLayout`（中央寄せ）、`SectionLayout`（セクション区切り）、`BleedLayout`（2カラム全幅）の4種
- **components/** — 再利用可能な UI パーツ（`SlideHeading`, `BulletList`, `TwoColumnGrid`, `FeatureTileGrid`, `CodeBlockPanel`, `Timeline` 等）
- **visuals/** — アニメーション付き複合ビジュアル（`HierarchyFlowVisual`, `PersistenceVisual`, `VibeCodingDemo`, `TerminalAnimation`）

### スタイリング規約

- **CSS 変数**（`src/styles/global.css`）: テーマカラー定義（`--theme-primary`, `--theme-background` 等）。全色に `-rgb` 変数もあり `rgba()` で使用可能
- **グローバル CSS**: レイアウトシステム、アニメーション（`fadeInUp`）、Reveal.js オーバーライド
- **CSS Modules**: 複雑なコンポーネント固有のスタイル（`Timeline.module.css` 等）
- **MUI `sx` prop**: インラインの微調整やレスポンシブ対応

## AI-SDD Instructions (v2.4.2)
<!-- sdd-workflow version: "2.4.2" -->

このプロジェクトはAI-SDD（AI駆動仕様駆動開発）ワークフローに従います。

### ドキュメント操作

`.sdd/` ディレクトリ配下のファイルを操作する際は、`.sdd/AI-SDD-PRINCIPLES.md` を参照して、適切なAI-SDDワークフローへの準拠を確保してください。

**トリガー条件**:

- `.sdd/` 配下のファイルの読み込みまたは変更
- 新しい仕様書、設計書、要求仕様書の作成
- `.sdd/` のドキュメントを参照する機能の実装

### ディレクトリ構造

フラット構造と階層構造の両方をサポートします。

**フラット構造（小〜中規模プロジェクト向け）**:

    .sdd/
    ├── CONSTITUTION.md               # プロジェクト原則（最上位）
    ├── PRD_TEMPLATE.md               # このプロジェクト用のPRDテンプレート
    ├── SPECIFICATION_TEMPLATE.md     # 抽象仕様書テンプレート
    ├── DESIGN_DOC_TEMPLATE.md        # 技術設計書テンプレート
    ├── requirement/                  # PRD（要求仕様書）
    │   └── {機能名}.md
    ├── specification/                # 仕様書と設計書
    │   ├── {機能名}_spec.md          # 抽象仕様書
    │   └── {機能名}_design.md        # 技術設計書
    └── task/                         # 一時的なタスクログ
        └── {チケット番号}/

**階層構造（中〜大規模プロジェクト向け）**:

    .sdd/
    ├── CONSTITUTION.md               # プロジェクト原則（最上位）
    ├── PRD_TEMPLATE.md               # このプロジェクト用のPRDテンプレート
    ├── SPECIFICATION_TEMPLATE.md     # 抽象仕様書テンプレート
    ├── DESIGN_DOC_TEMPLATE.md        # 技術設計書テンプレート
    ├── requirement/                  # PRD（要求仕様書）
    │   ├── {機能名}.md               # トップレベル機能
    │   └── {親機能名}/               # 親機能ディレクトリ
    │       ├── index.md              # 親機能の概要・要求一覧
    │       └── {子機能名}.md         # 子機能の要求仕様
    ├── specification/                # 仕様書と設計書
    │   ├── {機能名}_spec.md          # トップレベル機能
    │   ├── {機能名}_design.md
    │   └── {親機能名}/               # 親機能ディレクトリ
    │       ├── index_spec.md         # 親機能の抽象仕様書
    │       ├── index_design.md       # 親機能の技術設計書
    │       ├── {子機能名}_spec.md    # 子機能の抽象仕様書
    │       └── {子機能名}_design.md  # 子機能の技術設計書
    └── task/                         # 一時的なタスクログ
        └── {チケット番号}/

### ファイル命名規則（重要）

**⚠️ requirement と specification でサフィックスの有無が異なります。混同しないでください。**

| ディレクトリ            | ファイル種別 | 命名パターン                               | 例                                         |
|:------------------|:-------|:-------------------------------------|:------------------------------------------|
| **requirement**   | 全ファイル  | `{名前}.md`（サフィックスなし）                  | `user-login.md`, `index.md`               |
| **specification** | 抽象仕様書  | `{名前}_spec.md`（`_spec` サフィックス必須）     | `user-login_spec.md`, `index_spec.md`     |
| **specification** | 技術設計書  | `{名前}_design.md`（`_design` サフィックス必須） | `user-login_design.md`, `index_design.md` |

#### 命名パターン早見表

```
# ✅ 正しい命名
requirement/auth/index.md              # 親機能の概要（サフィックスなし）
requirement/auth/user-login.md         # 子機能の要求仕様（サフィックスなし）
specification/auth/index_spec.md       # 親機能の抽象仕様書（_spec 必須）
specification/auth/index_design.md     # 親機能の技術設計書（_design 必須）
specification/auth/user-login_spec.md  # 子機能の抽象仕様書（_spec 必須）
specification/auth/user-login_design.md # 子機能の技術設計書（_design 必須）

# ❌ 誤った命名（絶対に使用しないこと）
requirement/auth/index_spec.md         # requirement に _spec は不要
specification/auth/user-login.md       # specification には _spec/_design が必須
specification/auth/index.md            # specification には _spec/_design が必須
```

### ドキュメントリンク規約

ドキュメント内でのマークダウンリンクは以下の形式に従ってください：

| リンク先       | 形式                             | リンクテキスト   | 例                                                    |
|:-----------|:-------------------------------|:----------|:-----------------------------------------------------|
| **ファイル**   | `[ファイル名.md](パスまたはURL)`         | ファイル名を含める | `[user-login.md](../requirement/auth/user-login.md)` |
| **ディレクトリ** | `[ディレクトリ名](パスまたはURL/index.md)` | ディレクトリ名のみ | `[auth](../requirement/auth/index.md)`               |
