# ビジュアルコンポーネントのアドオン化 要求仕様書

## 概要

`src/visuals/` 配下のビジュアルコンポーネント（VibeCodingDemo, HierarchyFlowVisual,
PersistenceVisual）を「アドオン」として本体コードから分離し、独立したモジュールとして管理可能にする。これにより、プレゼンテーション本体の変更なしにビジュアル要素の追加・削除が可能となり、拡張性と保守性を向上させる。

## 背景・目的

### 現状の課題

ビジュアルコンポーネントは `src/visuals/` に配置され、`registerDefaults.tsx` で本体のデフォルトコンポーネントとして登録されている。これらは
AI-SDD デモ用の特化コンポーネントであり、本体の汎用コンポーネント（TerminalAnimation、MUI
アイコン等）とは性質が異なるが、同じ登録経路で管理されている。この結合により、特定のビジュアル要素の追加・削除が本体コードの変更を伴う。

### ビジネス価値

- **カスタマイズ性向上**: 特定の聴衆や用途に応じてビジュアルセットを選択可能にする
- **保守性の向上**: ビジュアル要素の変更が本体コードに影響しない
- **拡張性の向上**: 新しいビジュアルアドオンの追加が import の1行追加で完結する

---

# 1. 要求図の読み方

## 1.1. 要求タイプ

- **requirement**: 一般的な要求
- **functionalRequirement**: 機能要求
- **designConstraint**: 設計制約

## 1.2. リスクレベル

- **High**: 高リスク（ビジネスクリティカル、実装困難）
- **Medium**: 中リスク（重要だが代替可能）
- **Low**: 低リスク（Nice to have）

## 1.3. 検証方法

- **Test**: テストによる検証
- **Inspection**: インスペクション（レビュー）による検証
- **Demonstration**: デモンストレーションによる検証

## 1.4. 関係タイプ

- **contains**: 包含関係（親要求が子要求を含む）
- **derives**: 派生関係（要求から別の要求が導出される）

---

# 2. 要求一覧

## 2.1. ユースケース図（概要）

```mermaid
graph TB
    subgraph "プレゼンテーションシステム"
        Dev((開発者))
        Register[アドオン登録]
        Toggle[アドオン有効/無効切替]
        Render[ビジュアル描画]
    end

    Dev --> Register
    Dev --> Toggle
    Register --> Render
```

## 2.2. 機能一覧（テキスト形式）

- アドオン定義
    - AddonDefinition 型による構造統一
    - アドオン単位でのコンポーネントグループ化
- アドオン登録
    - ComponentRegistry の custom 側への一括登録
    - registerAddons() 関数による起動時登録
- アドオン管理
    - import の追加/削除によるアドオンの有効/無効切替
    - 有効アドオン一覧の集中管理

---

# 3. 要求図（SysML Requirements Diagram）

## 3.1. 全体要求図

```mermaid
requirementDiagram
    requirement AddonSystem {
        id: UR_001
        text: "ビジュアルコンポーネントをアドオンとして分離し独立管理できること"
        risk: medium
        verifymethod: demonstration
    }

    functionalRequirement AddonDefinitionType {
        id: FR_001
        text: "AddonDefinition型で構造を統一すること"
        risk: low
        verifymethod: test
    }

    functionalRequirement AddonRegistration {
        id: FR_002
        text: "registerComponentのcustom側で登録すること"
        risk: low
        verifymethod: test
    }

    functionalRequirement AddonToggle {
        id: FR_003
        text: "importの追加削除のみで有効無効を管理できること"
        risk: low
        verifymethod: inspection
    }

    functionalRequirement VisualMigration {
        id: FR_004
        text: "既存3ビジュアルをaddonsに移動し再構成すること"
        risk: medium
        verifymethod: test
    }

    designConstraint ExistingRegistryCompat {
        id: DC_001
        text: "ComponentRegistryの仕組みを変更しないこと"
        risk: low
        verifymethod: inspection
    }

    designConstraint NoBehaviorChange {
        id: DC_002
        text: "表示と動作に変更がないこと"
        risk: high
        verifymethod: demonstration
    }

    AddonSystem - contains -> AddonDefinitionType
    AddonSystem - contains -> AddonRegistration
    AddonSystem - contains -> AddonToggle
    AddonSystem - contains -> VisualMigration
    AddonSystem - contains -> ExistingRegistryCompat
    AddonSystem - contains -> NoBehaviorChange
    AddonRegistration - derives -> AddonDefinitionType
    VisualMigration - derives -> AddonDefinitionType
```

---

# 4. 要求の詳細説明

## 4.1. ユーザ要求

### UR-001: ビジュアルコンポーネントのアドオン化

開発者がビジュアルコンポーネントをプレゼンテーション本体から独立して管理でき、アドオンの追加・削除がシンプルな操作（import
の変更）で完結すること。

**検証方法:** デモンストレーションによる検証

## 4.2. 機能要求

### FR-001: AddonDefinition 型による構造統一

**優先度**: Must

アドオンは統一された型定義（AddonDefinition）に従い、以下の情報を持つ：

- アドオン名（name）
- 提供するコンポーネント一覧（components）— 各コンポーネントは登録名と React コンポーネントのペア

**検証方法:** テスト（型チェック）による検証

### FR-002: ComponentRegistry への登録

**優先度**: Must

アドオンが提供するコンポーネントは、既存の ComponentRegistry の `registerComponent`（custom側）を使用して登録される。これにより、アドオンのコンポーネントはデフォルトコンポーネントを上書き可能となる。

**検証方法:** テストによる検証
### FR-003: import による有効/無効管理

**優先度**: Must

`src/addons/index.ts` で有効なアドオンの一覧を配列としてエクスポートし、アドオンの有効/無効は該当する
import行の追加/削除のみで切り替え可能とする。

**検証方法:** コードレビュー（インスペクション）による検証

### FR-004: 既存ビジュアルの移動

**優先度**: Must

以下の3つのビジュアルコンポーネントを `src/visuals/` から `src/addons/ai-sdd-visuals/` に移動し、アドオンとして再構成する：

- VibeCodingDemo
- HierarchyFlowVisual
- PersistenceVisual

**検証方法:** テスト（既存テストの通過）による検証

## 4.3. 非機能要求

### NFR-001: ビルドサイズへの影響

**優先度**: Should

アドオン化によるプロダクションビルドサイズの増加は最小限（ファイル分割による overhead 程度）に抑えること。

**検証方法:** テスト（ビルド前後のサイズ比較）による検証

### NFR-002: 開発者体験

**優先度**: Must

アドオンの追加・削除は `src/addons/index.ts` の import 行の変更のみで完結し、他のファイルの修正を必要としないこと。

**検証方法:** インスペクション（コードレビュー）による検証

## 4.4. 設計制約

### DC-001: ComponentRegistry 互換性

既存の ComponentRegistry の仕組み（default/custom の二層構造、resolveComponent の優先順位）は変更しない。アドオンは
custom側の登録 API を利用する。

**検証方法:** コードレビューによる検証

### DC-002: 表示・動作の無変更

アドオン化はアーキテクチャの変更であり、プレゼンテーションの表示・動作に影響を与えてはならない。すべてのスライドが既存と同一の表示結果となること。

**検証方法:** デモンストレーション（目視確認）による検証

---

# 5. 制約事項

## 5.1. 技術的制約

- 既存の ComponentRegistry のインターフェースを維持する（A-001: コンポーネント分離）
- TypeScript strict mode での型安全性を確保する（T-001）
- Reveal.js との互換性を維持する（T-002）

## 5.2. ビジネス的制約

- プレゼンテーションの表示品質に影響を与えない（B-001）

---

# 6. 前提条件

- ComponentRegistry が default/custom の二層構造で動作していること
- 移動対象のビジュアルコンポーネントが他のコンポーネントから直接 import されていないこと（registerDefaults.tsx 経由でのみ使用）

---

# 7. スコープ外

以下は本PRDのスコープ外とします：

- TerminalAnimation のアドオン化（本体のデフォルトコンポーネントとして残す）
- MUI アイコンのアドオン化
- アドオンの動的ロード（lazy import）
- アドオン設定ファイル（JSON等）による管理

---

# 8. 用語集

| 用語                | 定義                                             |
|-------------------|------------------------------------------------|
| アドオン（Addon）       | プレゼンテーション本体から独立したコンポーネントのパッケージ単位               |
| AddonDefinition   | アドオンの構造を定義する TypeScript 型                      |
| ComponentRegistry | コンポーネント名から実コンポーネントを解決するレジストリ機構                 |
| default コンポーネント   | registerDefaults.tsx で登録される標準コンポーネント           |
| custom コンポーネント    | registerComponent で登録され、default を上書き可能なコンポーネント |
