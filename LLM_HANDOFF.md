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

- `_data/members.yml`：一覧カード用
- `_members/*.md`：詳細ページ用

追加時は `id` と `member_id` を必ず一致させる。

例：

```yaml
# _data/members.yml
- id: "hayashi"
  name: "林 夏生"
```

```yaml
# _members/hayashi.md
---
member_id: hayashi
name: "林 夏生"
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
  research_title: "系列生成・擬似乱数生成に関する共同研究"
  url: "https://example.com/"
```

表示パーツは以下です。

```text
_includes/collaborator-card.html
```

共同研究者は研究室所属メンバーとは区別し、外部リンクアイコン付きカードとして表示します。
