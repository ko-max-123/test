# Uehara Lab Jekyll Site

上原研究室サイトを Jekyll 化したサンプル一式です。

## 目的

- ヘッダー、フッター、カードなどの共通パーツを `_includes` に分離
- ページの外枠を `_layouts` に分離
- 研究室概要、メンバー、研究業績などの中身を `_data/*.yml` や Markdown に分離
- GitHub Pages で公開できる構成にする

## ディレクトリ構成

```text
.
├── _config.yml
├── Gemfile
├── index.html
├── labo.html
├── prospective_students.html
├── members.html
├── works.html
├── news.html
├── access/
│   └── index.html
├── _includes/
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   ├── mobile-menu-script.html
│   ├── member-card.html
│   ├── news-card.html
│   └── work-card.html
├── _layouts/
│   ├── default.html
│   ├── page.html
│   ├── member.html
│   └── news.html
├── _data/
│   ├── site.yml
│   ├── navigation.yml
│   ├── lab.yml
│   ├── works.yml
│   └── prospective.yml
├── _members/
│   ├── hayashi.md
│   ├── fujiki.md
│   ├── kuwahara.md
│   ├── maekawa.md
│   └── uehara.md
├── _news/
│   ├── 2026-03-09-new-member.md
│   └── 2026-02-18-presentation.md
└── assets/
    ├── css/site.css
    ├── js/works-filter.js
    └── images/
```

## ローカル起動

詳しくは `LOCAL_SETUP.md` を見てください。

```bash
bundle install
bundle exec jekyll serve --livereload
```

ブラウザで以下を開きます。

```text
http://127.0.0.1:4000/
```

## 更新方法

### トップページのニュース

ニュースは `_news/*.md` に追加します。

```yaml
---
title: "ニュースタイトル"
date: 2026-04-01
category: "お知らせ"
summary: "一覧に出す短い説明"
image: "/assets/images/news/sample.svg"
---
本文を Markdown で書きます。
```

### メンバー追加

`_members/xxx.md`を追加します。一覧表示と詳細ページは、このMarkdownのフロントマターから自動生成されます。

`member_id`は研究業績の`author_ids`と一致させてください。

### 研究業績追加

`_data/works.yml` に追加します。

重要なのは `author_ids` です。

```yaml
- id: "work-2026-001"
  year: 2026
  type: "oral"
  type_label: "口頭発表"
  title: "研究タイトル"
  authors_text: "林 夏生、上原 聡"
  author_ids: ["hayashi", "uehara"]
  venue: "発表会名"
  details: "pp. 1-4, 2026年4月."
```

`author_ids` が `_members/*.md` の `member_id` と一致していれば、メンバー詳細ページから `works.html?author=hayashi` に移動したとき、その人の業績だけが表示されます。

## 画像の置き場所

```text
assets/images/members/
assets/images/news/
assets/images/lab/
```

現在はサンプル用に画像パスだけ設定しています。実画像を置く場合は、YAML/Markdown内のパスと一致させてください。

## 研究業績の年度別リンク

研究業績ページの年度別リンクは、`_data/works_years.yml` で管理します。

```yaml
- key: recent
  label: "最近"
  href: "/works.html"

- key: 2022
  label: "2022年"
  href: "/works2022.html"
```

表示部分は `_includes/works-year-nav.html` に切り出しており、`works.html` と年度別ページの上部・下部で共通利用しています。

年度別ページは `works2022.html`、`works2021.html`、`works2020.html`、`works2019.html` を用意しています。  
古い年度の業績を移行する場合は、`_data/works.yml` に `year: 2021` のように年度を入れて追加してください。


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
  research_title: "疑似乱数系列に関する共同研究"
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
