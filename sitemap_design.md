# 上原研究室Webサイト サイトマップ設計書

---

## 1. この設計書の目的

この設計書は、上原研究室WebサイトをJekyllで運用するにあたり、以下を確認しやすくするためのものです。

- どのページが存在するか
- 各ページがどのページへ遷移するか
- 一覧ページと詳細ページの関係
- Jekyllでどのテンプレート・データファイルを使うか
- 今後ニュース、メンバー、研究業績を追加するときに、どこを編集すればよいか

---

## 2. サイト全体構成

```text
上原研究室Webサイト
├── ホーム
│   ├── ニュース詳細
│   ├── ニュース一覧
│   ├── 研究室紹介
│   ├── 研究業績
│   └── メンバー一覧
│
├── 研究室紹介
│   └── 配属を希望する学生の方へ
│
├── 研究業績
│   ├── 最近の研究業績
│   ├── 2022年の研究業績
│   ├── 2021年の研究業績
│   ├── 2020年の研究業績
│   └── 2019年の研究業績
│
├── メンバー一覧
│   ├── メンバー詳細：XXXXX
│   ├── メンバー詳細：XXXXX
│
├── ニュース一覧
│   ├── ニュース詳細：写真あり
│   └── ニュース詳細：文字のみ
│
├── アクセス
└── サイトマップ
```

---

## 3. ページ一覧

| No. | ページ名 | URL | 種別 | 役割 |
|---:|---|---|---|---|
| 1 | ホーム | `/index.html` | 固定ページ | サイト入口。ニュース、研究室概要、活動、メンバー導線を表示 |
| 2 | 研究室紹介 | `/labo.html` | 固定ページ | 研究室の目的、研究テーマ、研究の進め方を表示 |
| 3 | 配属希望者向け案内 | `/prospective_students.html` | 固定ページ | 配属を希望する学生向けの説明ページ |
| 4 | 研究業績 | `/works.html` | 一覧ページ | 最近の研究業績一覧を表示 |
| 5 | 2022年研究業績 | `/works2022.html` | 年度別ページ | 2022年の研究業績一覧を表示 |
| 6 | 2021年研究業績 | `/works2021.html` | 年度別ページ | 2021年の研究業績一覧を表示 |
| 7 | 2020年研究業績 | `/works2020.html` | 年度別ページ | 2020年の研究業績一覧を表示 |
| 8 | 2019年研究業績 | `/works2019.html` | 年度別ページ | 2019年の研究業績一覧を表示 |
| 9 | メンバー一覧 | `/members.html` | 一覧ページ | 教員、学生、卒業生を一覧表示 |
| 10 | メンバー詳細 | `/_members/{slug}/` | 詳細ページ | 各メンバーのプロフィールを表示 |
| 11 | ニュース一覧 | `/news.html` | 一覧ページ | ニュース記事を一覧表示 |
| 12 | ニュース詳細 | `/_news/{slug}/` | 詳細ページ | 各ニュース記事を表示 |
| 13 | アクセス | `/access/index.html` | 固定ページ | 所在地・アクセス情報を表示 |
| 14 | サイトマップ | `/sitemap.html` | 固定ページ | サイト全体のリンク一覧を表示 |

---

## 4. 主要ページの役割

### 4.1 ホーム

| 項目 | 内容 |
|---|---|
| URL | `/index.html` |
| 主な役割 | サイト全体の入口 |
| 表示内容 | Hero、ニュース、研究室概要、活動紹介、メンバー導線 |
| 主な遷移先 | ニュース詳細、ニュース一覧、研究室紹介、メンバー一覧 |
| 編集対象 | `_data/site.yml`, `_data/lab.yml`, `_news/` |

ホームは、研究室サイトを訪れた人が最初に見るページです。  
ニュースは最新数件のみを表示し、詳細はニュース詳細ページに遷移します。

---

### 4.2 研究室紹介

| 項目 | 内容 |
|---|---|
| URL | `/labo.html` |
| 主な役割 | 研究室の方向性・研究テーマの説明 |
| 表示内容 | 研究室の目的、研究テーマ、研究の進め方、配属希望者向け導線 |
| 主な遷移先 | 配属希望者向けページ、研究業績、アクセス |
| 編集対象 | `_data/lab.yml` |

研究室の説明を集約するページです。  
AIや画像処理を前面に出しすぎず、情報代数・擬似乱数系列・誤り訂正符号・情報セキュリティを中心に説明します。

---

### 4.3 配属を希望する学生の方へ

| 項目 | 内容 |
|---|---|
| URL | `/prospective_students.html` |
| 主な役割 | 配属前の学生向け説明 |
| 表示内容 | 向いている人、研究テーマ例、研究の進め方、事前準備、見学相談、FAQ |
| 主な遷移先 | アクセス、メンバー一覧、研究室紹介 |
| 編集対象 | `_data/prospective.yml` |

研究室紹介ページの「配属を希望する学生の方へ」から遷移するページです。  
学生が配属前に確認する情報をまとめます。

---

## 5. 研究業績ページ設計

### 5.1 研究業績全体

| 項目 | 内容 |
|---|---|
| URL | `/works.html` |
| 主な役割 | 最近の研究業績一覧 |
| 表示内容 | 国際会議、口頭発表、年度別リンク |
| データ元 | `_data/works.yml`, `_data/works_years.yml` |
| レイアウト | 通常ページ + `work-card.html` |
| 補助JS | `assets/js/works-filter.js` |

研究業績ページでは、国際会議と口頭発表をカード形式で表示します。  
元のデザインにあった年度別リンクは維持します。

### 5.2 年度別リンク

```text
研究業績
├── 最近     /works.html
├── 2022年   /works2022.html
├── 2021年   /works2021.html
├── 2020年   /works2020.html
└── 2019年   /works2019.html
```

年度リンクは以下のファイルで管理します。

```text
_data/works_years.yml
```

例：

```yaml
- key: recent
  label: "最近"
  href: "/works.html"

- key: 2022
  label: "2022年"
  href: "/works2022.html"
```

年度別リンクの表示部分は共通パーツ化します。

```text
_includes/works-year-nav.html
```

この部品を `works.html` と年度別ページの上部・下部に配置します。

---

## 6. メンバー詳細から研究業績へ飛ぶ設計

### 6.1 基本方針

メンバー詳細ページから研究業績へ飛ぶ場合、URLパラメータで著者IDを渡します。

```text
/members/hayashi/ → /works.html?author=hayashi
```

研究業績ページでは、URLの `author` を読み取り、該当する著者IDを含む業績だけを表示します。

---

### 6.2 メンバー側データ

メンバー詳細ページでは、各メンバーに `member_id` を持たせます。

```yaml
# _members/hayashi.md
---
layout: member
title: "林 夏生"
name: "林 夏生"
kana: "ハヤシ ナツオ"
member_id: "hayashi"
grade: "博士3年"
research_title: "画像分析攻撃に耐性のある画像認証方式の提案"
---
```

メンバー詳細ページでは、以下のようなリンクを生成します。

```html
<a href="/works.html?author=hayashi">林 夏生の研究業績を見る</a>
```

---

### 6.3 研究業績側データ

研究業績データでは、表示用の著者名と、絞り込み用の著者IDを分けます。

```yaml
# _data/works.yml
- id: "icce-tw-2023-hayashi"
  year: 2023
  type: "international"
  type_label: "国際会議（査読あり）"
  title: "A study on robustness evaluation of weave filters against reverse image search attacks on CAPTCHA"
  authors_text: "N. Hayashi, T. Satoh and S. Uehara"
  author_ids:
    - hayashi
    - satoh
    - uehara
  venue: "Proc. of 2023 International Conference on Consumer Electronics - Beitou (ICCE-TW)"
  pages: "E8-5, pp. 1-2"
  place: "Taipei"
  date_text: "Jul. 17-19, 2023"
```

重要なのは以下です。

```yaml
authors_text: "N. Hayashi, T. Satoh and S. Uehara"
author_ids:
  - hayashi
  - satoh
  - uehara
```

| 項目 | 用途 |
|---|---|
| `authors_text` | 画面表示用 |
| `author_ids` | 絞り込み・検索用 |

人名は日本語・英語・イニシャルなど表記揺れが起きるため、絞り込みは文字列検索ではなく `author_ids` で行います。

---

### 6.4 表示制御

`works.html?author=hayashi` にアクセスした場合、JavaScriptで次のように絞り込みます。

```javascript
const params = new URLSearchParams(window.location.search);
const author = params.get("author");

const cards = document.querySelectorAll("[data-author-ids]");

cards.forEach((card) => {
  const authorIds = card.dataset.authorIds.split(",");
  const isMatch = authorIds.includes(author);

  card.hidden = author && !isMatch;
});
```

業績カード側には次のような属性を出力します。

```html
<article class="publication-card" data-author-ids="hayashi,satoh,uehara">
  ...
</article>
```

---

## 7. メンバー一覧・詳細ページ設計

### 7.1 メンバー一覧

| 項目 | 内容 |
|---|---|
| URL | `/members.html` |
| 主な役割 | 教員・学生・卒業生の一覧 |
| データ元 | `_members/` |
| 表示形式 | カード形式、卒業生は表形式 |
| 主な遷移先 | 各メンバー詳細ページ |

### 7.2 メンバー詳細

| 項目 | 内容 |
|---|---|
| URL | `/_members/{slug}/` |
| 主な役割 | 個別プロフィール表示 |
| データ元 | `_members/*.md`, `_data/works.yml` |
| 表示内容 | 氏名、学年、専門分野、趣味、一言、関連業績 |
| 主な遷移先 | メンバー一覧、研究業績ページ |

メンバー詳細では、ページ下部に関連業績を出すこともできます。  
その場合は `_data/works.yml` の `author_ids` に `member_id` が含まれるものを抽出します。

---

## 8. ニュースページ設計

### 8.1 ニュース一覧

| 項目 | 内容 |
|---|---|
| URL | `/news.html` |
| 主な役割 | ニュース記事の一覧 |
| データ元 | `_news/*.md` |
| 表示内容 | 日付、カテゴリ、タイトル、概要、サムネイル |
| 主な遷移先 | ニュース詳細 |

### 8.2 ニュース詳細

| 項目 | 内容 |
|---|---|
| URL | `/_news/{slug}/` |
| 主な役割 | ニュース本文の表示 |
| データ元 | `_news/*.md` |
| レイアウト | `_layouts/news.html` |
| パターン | 文字のみ、写真付き |

ニュースはMarkdownで管理します。

```yaml
---
layout: news
title: "上原研究室に新メンバーが加わりました"
date: 2026-03-09
category: "メンバー紹介"
thumbnail: "/assets/images/news/new-member.jpg"
summary: "新年度に向けて、上原研究室に新しいメンバーが加わりました。"
---

本文をここに書きます。
```

写真がある場合は `thumbnail` を設定します。  
写真がない場合は `thumbnail` を空にします。

---

## 9. 共通パーツ設計

### 9.1 共通パーツ一覧

| ファイル | 役割 |
|---|---|
| `_includes/head.html` | meta、CSS、フォント、Tailwind設定 |
| `_includes/header.html` | 共通ヘッダー、ナビゲーション |
| `_includes/footer.html` | 共通フッター |
| `_includes/member-card.html` | メンバー一覧カード |
| `_includes/news-card.html` | ニュース一覧カード |
| `_includes/work-card.html` | 研究業績カード |
| `_includes/works-year-nav.html` | 研究業績の年度別リンク |

### 9.2 レイアウト一覧

| ファイル | 役割 |
|---|---|
| `_layouts/default.html` | 全ページ共通の外枠 |
| `_layouts/page.html` | 通常ページ用 |
| `_layouts/member.html` | メンバー詳細用 |
| `_layouts/news.html` | ニュース詳細用 |
| `_layouts/works-year.html` | 年度別研究業績ページ用 |

---

## 10. データファイル設計

| ファイル | 内容 |
|---|---|
| `_data/site.yml` | サイト名、大学名、説明文、著作権表記 |
| `_data/navigation.yml` | ヘッダーナビゲーション |
| `_data/lab.yml` | 研究室紹介ページの内容 |
| `_data/prospective.yml` | 配属希望者向けページの内容 |
| `_data/works.yml` | 研究業績一覧 |
| `_data/works_years.yml` | 年度別リンク |

---

## 11. ファイル構成

```text
uehara-lab-jekyll/
├── _config.yml
├── Gemfile
├── index.html
├── labo.html
├── prospective_students.html
├── members.html
├── works.html
├── works2022.html
├── works2021.html
├── works2020.html
├── works2019.html
├── news.html
├── sitemap.html
│
├── _includes/
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   ├── member-card.html
│   ├── news-card.html
│   ├── work-card.html
│   └── works-year-nav.html
│
├── _layouts/
│   ├── default.html
│   ├── page.html
│   ├── member.html
│   ├── news.html
│   └── works-year.html
│
├── _data/
│   ├── site.yml
│   ├── navigation.yml
│   ├── lab.yml
│   ├── prospective.yml
│   ├── works.yml
│   └── works_years.yml
│
├── _members/
│   ├── uehara.md
│   ├── hayashi.md
│   ├── fujiki.md
│   ├── kuwahara.md
│   └── maekawa.md
│
├── _news/
│   ├── 2026-03-09-new-member.md
│   └── 2026-02-18-presentation.md
│
├── assets/
│   ├── css/
│   │   └── site.css
│   ├── js/
│   │   └── works-filter.js
│   └── images/
│       ├── members/
│       ├── news/
│       └── lab/
│
├── README.md
├── LOCAL_SETUP.md
└── LLM_HANDOFF.md
```

---

## 12. 遷移設計

### 12.1 トップページからの導線

```text
ホーム
├── ニュースタイトル → ニュース詳細
├── View More → ニュース一覧
├── Learn More → 研究室紹介
├── メンバー紹介 → メンバー一覧
└── 研究業績 → 研究業績一覧
```

### 12.2 研究室紹介からの導線

```text
研究室紹介
├── 関連する研究業績を見る → 研究業績一覧
├── 配属を希望する学生の方へ → 配属希望者向け案内
└── 見学・相談について → アクセス
```

### 12.3 メンバー詳細からの導線

```text
メンバー詳細
├── メンバー一覧へ戻る → メンバー一覧
├── 研究業績を見る → /works.html?author={member_id}
└── 関連業績カード → 研究業績一覧
```

### 12.4 研究業績ページからの導線

```text
研究業績
├── 最近 → /works.html
├── 2022年 → /works2022.html
├── 2021年 → /works2021.html
├── 2020年 → /works2020.html
├── 2019年 → /works2019.html
├── 国際会議 → #international
└── 口頭発表 → #oral
```

---

## 13. 更新作業ルール

### 13.1 ニュースを追加する場合

編集する場所：

```text
_news/YYYY-MM-DD-title.md
```

作業内容：

1. `_news/` にMarkdownファイルを追加
2. front matterに日付、カテゴリ、タイトル、概要を記入
3. 本文を書く
4. 画像がある場合は `assets/images/news/` に配置
5. `thumbnail` に画像パスを記入

---

### 13.2 メンバーを追加する場合

編集する場所：

```text
_members/member-name.md
```

作業内容：

1. `_members/` にMarkdownファイルを追加
2. `member_id` を決める
3. 氏名、学年、専門分野、趣味、一言を記入
4. 画像がある場合は `assets/images/members/` に配置
5. メンバー一覧・サイトマップに自動反映される

---

### 13.3 研究業績を追加する場合

編集する場所：

```text
_data/works.yml
```

作業内容：

1. 業績を1件追加
2. `year` を記入
3. `type` を `international` または `oral` にする
4. `authors_text` に表示用著者名を入れる
5. `author_ids` に著者IDを入れる
6. メンバー別業績表示に自動反映される

---

### 13.4 年度別リンクを追加する場合

編集する場所：

```text
_data/works_years.yml
```

追加例：

```yaml
- key: 2026
  label: "2026年"
  href: "/works2026.html"
  description: "2026年の研究業績"
```

あわせて以下のページを作成します。

```text
works2026.html
```

中身：

```yaml
---
layout: works-year
title: "2026年 研究業績"
active_nav: works
work_year: 2026
works_nav_current: 2026
---
```

---

## 14. 今後の拡張候補

| 拡張内容 | 対応方法 |
|---|---|
| 研究業績のキーワード検索 | `works-filter.js` に検索欄処理を追加 |
| メンバーの年度別表示 | `_members/*.md` に `year` や `status` を追加 |
| 卒業生詳細ページ | `_members/` に卒業生も登録し、`status: alumni` で分類 |
| ニュースカテゴリ別ページ | `category` でフィルタする一覧ページを追加 |
| Google検索用XMLサイトマップ | `jekyll-sitemap` プラグインを追加 |
| OGP画像対応 | `_includes/head.html` に `og:image` を追加 |

---

## 15. 設計上の注意点

### 15.1 URLはできるだけ変えない

GitHub Pagesで公開後にURLを変更すると、外部からのリンクが切れる可能性があります。  
特に以下は固定するのが望ましいです。

```text
/works.html
/members.html
/news.html
/labo.html
```

### 15.2 表示名と内部IDを分ける

人名や著者名は表記揺れが起きやすいため、以下のように分けます。

| 種別 | 例 | 用途 |
|---|---|---|
| 表示名 | 林 夏生 / N. Hayashi | 画面表示 |
| 内部ID | `hayashi` | 絞り込み・紐づけ |

### 15.3 共通部分はHTMLに直書きしない

ヘッダー、フッター、カード、年度リンクは `_includes/` に分離します。  
ページごとに同じHTMLをコピーしない方針です。

---

## 16. 完成イメージ

```text
更新者が触る場所
├── ニュース追加       → _news/
├── メンバー追加       → _members/
├── 研究業績追加       → _data/works.yml
├── 年度リンク追加     → _data/works_years.yml
└── 共通デザイン修正   → _includes/ または assets/css/site.css

基本的に触らない場所
├── _layouts/
├── _includes/header.html
├── _includes/footer.html
└── 各固定ページのHTML構造
```

この設計にすると、研究室サイトの更新作業は「HTMLを直接編集する」のではなく、MarkdownまたはYAMLを編集する運用にできます。
