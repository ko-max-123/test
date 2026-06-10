# 他のLLMへ渡す指示書

## ゴール

このJekyllサイトをローカルで起動し、デザインを維持したまま、HTMLを直接編集せずにデータファイル・Markdownから内容を管理できるようにする。

## 前提

- GitHub Pagesで運用予定
- 特殊なJekyllプラグインは使わない
- Tailwind CDNを利用している
- ヘッダー・フッターは `_includes` に切り出し済み
- ページの外枠は `_layouts` に切り出し済み

## 触ってよい主なファイル

### サイト共通

- `_data/site.yml`
- `_data/navigation.yml`

### 研究室紹介

- `_data/lab.yml`
- `labo.html` は構造変更が必要な場合のみ触る

### 配属希望者向け

- `_data/prospective.yml`
- `prospective_students.html` は構造変更が必要な場合のみ触る

### メンバー

- `_members/*.md`：一覧カードと詳細ページの共通データ

追加・更新時は、対象メンバーのMarkdownだけを編集する。
`member_id`は研究業績の`author_ids`と一致させる。

例：

```yaml
# _members/hayashi.md
---
member_id: hayashi
name: "林 夏生"
status: current
category: students
---
```

### 研究業績

- `_data/works.yml`

人名検索ではなく `author_ids` で絞り込む。

```yaml
author_ids: ["hayashi", "uehara"]
```

メンバー詳細から研究業績に飛ぶリンクは `_layouts/member.html` 内で生成している。

```liquid
/works.html?author={{ page.member_id }}
```

`works.html` は全業績を出力し、`assets/js/works-filter.js` がURLパラメータを見て該当者の業績だけ表示する。

### ニュース

- `_news/*.md`

Markdownファイルを追加するとニュース一覧とトップページに自動反映される。

## ローカル起動

```bash
bundle install
bundle exec jekyll serve --livereload
```

## 確認すべきURL

```text
/
/labo.html
/prospective_students.html
/members.html
/members/hayashi/
/works.html
/works.html?author=hayashi
/news.html
/news/2026-03-09-new-member/
```

## 注意点

- `_site/` は生成物なので編集しない
- GitHub Pagesのプロジェクトページで公開する場合は `_config.yml` の `baseurl` をリポジトリ名にする
- 画像は `assets/images/` 配下に配置する
- 著者表記ゆれ対策として、業績の絞り込みは `authors_text` ではなく `author_ids` を使う

## 追加修正：研究業績の年度別リンク

旧HTMLの研究業績ページにあった年度別リンクは削除しない方針です。  
Jekyll版では以下の構成にしています。

- `_data/works_years.yml`：年度リンクの定義
- `_includes/works-year-nav.html`：年度リンク表示の共通パーツ
- `works.html`：最近の研究業績ページ。上部・下部に年度リンクを表示
- `works2022.html` / `works2021.html` / `works2020.html` / `works2019.html`：年度別ページ

今後年度を追加する場合は、`_data/works_years.yml` にリンクを追加し、必要に応じて `works2026.html` のようなページを追加してください。


## サイトマップページ

`sitemap.html` を追加しています。

- 主要ページは `sitemap.html` 内に明示的に記述
- 研究業績の年度別リンクは `_data/works_years.yml` から自動表示
- ニュース詳細は `_news/` コレクションから自動表示
- メンバー詳細は `_members/` コレクションから自動表示
- フッターのページ欄から `sitemap.html` に移動できます

## 共同研究者リンク

メンバー一覧ページの「教授・共同研究者」欄に、共同研究の先生への外部リンクカードを表示できます。

編集するファイル：

```text
_data/collaborators.yml
```

例：

```yaml
- id: "miyazaki"
  name: "宮崎 武"
  affiliation: "共同研究先の大学・研究室名"
  role: "共同研究者"
  research_title: "擬似乱数系列に関する共同研究"
  url: "https://example.com/"
```

表示パーツは以下です。

```text
_includes/collaborator-card.html
```

共同研究者は研究室所属メンバーとは区別し、外部リンクアイコン付きカードとして表示します。


## 研究業績ページ：著者絞り込み時の件数更新

`works.html?author=uehara` のように著者で絞り込んだ場合、表示される業績カードだけでなく、Hero右側の件数表示も絞り込み後の件数に更新されます。

主な対応ファイル：

```text
assets/js/works-filter.js
_includes/work-card.html
works.html
_layouts/works-year.html
_data/works.yml
```

`_includes/work-card.html` では、各業績カードに以下の属性を付与しています。

```html
data-work-card
data-type="international|oral|journal"
data-author-ids="uehara,hayashi"
```

`works.html` 側では、件数表示に以下の属性を付与しています。

```html
data-work-count="international"
data-work-count="oral"
data-work-count="journal"
```

これにより、著者別に絞り込んだ際に、国際会議・口頭発表・学術論文の件数も自動で再計算されます。


## メンバー詳細ページと卒業生リンク

旧HTMLからメンバー情報を抽出し、`_members/*.md` として個別詳細ページを生成しています。

卒業生も `members.html` から詳細ページへリンクします。卒業生が増えても見やすいように、卒業生セクションは `graduation_year` ごとの折り畳み表示にしています。

主な編集対象：

```text
_members/*.md
members.html
_layouts/member.html
_includes/member-card.html
```

卒業生にしたい場合は、該当メンバーのMarkdownで以下を設定します。

```yaml
status: alumni
category: alumni
graduation_year: 2023
alumni_type: 学部卒 # または 修士修了
```

現役学生に戻す場合は以下です。

```yaml
status: current
category: students
```
