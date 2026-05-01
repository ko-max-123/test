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



---

### 4.2 研究室紹介



---

### 4.3 配属を希望する学生の方へ



---

## 5. 研究業績ページ設計

### 5.1 研究業績全体



### 5.2 年度別リンク



---

## 6. メンバー詳細から研究業績へ飛ぶ設計

### 6.1 基本方針



---

### 6.2 メンバー側データ



---

### 6.3 研究業績側データ



---

### 6.4 表示制御


---

## 7. メンバー一覧・詳細ページ設計

### 7.1 メンバー一覧

| 項目 | 内容 |
|---|---|
| URL | `/members.html` |
| 主な役割 | 教員・学生・卒業生の一覧 |
| データ元 | `_members/`, `_data/members.yml` |
| 表示形式 | カード形式、卒業生は表形式 |
| 主な遷移先 | 各メンバー詳細ページ |

### 7.2 メンバー詳細



---

## 8. ニュースページ設計

### 8.1 ニュース一覧



### 8.2 ニュース詳細



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
| `_data/members.yml` | メンバー一覧の補助情報 |
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
│   ├── members.yml
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



### 12.2 研究室紹介からの導線



### 12.3 メンバー詳細からの導線



### 12.4 研究業績ページからの導線



---

## 13. 更新作業ルール

### 13.1 ニュースを追加する場合



---

### 13.2 メンバーを追加する場合



---

### 13.4 年度別リンクを追加する場合


---

## 14. 今後の拡張候補


---

## 15. 設計上の注意点

### 15.1 URLはできるだけ変えない


### 15.2 表示名と内部IDを分ける


### 15.3 共通部分はHTMLに直書きしない


---

## 16. 完成イメージ



この設計にすると、研究室サイトの更新作業は「HTMLを直接編集する」のではなく、MarkdownまたはYAMLを編集する運用にできます。
