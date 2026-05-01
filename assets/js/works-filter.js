/**
 * works-filter.js
 *
 * 著者別の研究業績絞り込みと、件数表示の再計算を行う。
 *
 * URL例:
 *   /works.html
 *   /works.html?author=uehara
 *   /works.html?author=hayashi
 *
 * 必要な属性:
 *   data-work-card
 *   data-type="international|oral|journal"
 *   data-author-ids="uehara,hayashi"
 *   data-work-count="international|oral|journal|total"
 *   data-work-section="international|oral|journal"
 *   data-section-count="international|oral|journal"
 */

(() => {
  const FALLBACK_AUTHOR_LABELS = {
    uehara: '上原 聡',
    hayashi: '林 夏生',
    fujii: '藤井 博希',
    fujiki: '藤木 弘也',
    kuwahara: '桒原 大雅',
    maekawa: '前川 翔哉',
    miyazaki: '宮崎 武',
    araki: '荒木 俊輔',
    nogami: '野上 保之',
    satoh: '佐藤',
    inoue: '井上 凌',
    tsuruta: '鶴田 拓矢',
    kakizaki: '硴崎 賢一',
    fujimoto: '藤本',
    zheng: 'J. Zheng',
    noguchi: '野口 亮祐',
    takaichi: '高市 康平',
    gan: '顔 綿柱',
    moriwaki: '森脇 圭祐',
    kusaka: '日下 卓也',
    eguchi: '江口 颯太',
    kawase: '川瀬 航平',
    kodera: '小寺',
    takahashi_k: '高橋',
    takahashi_n: '高橋',
    osunoa: '小薗 元',
    osonoa: '小薗 元',
    taniguchi: '谷口 巧実',
    kakui: '角井 敦志',
    nakano: '中野',
    ogaki: '大垣 翔矢',
    ali: 'Md. Arshad ALI',
    khandaker: 'M.A. Khandaker',
    morelos_zaragoza: 'R.H. Morelos-Zaragoza',
    tatara: '多田羅',
    taketa: '武田',
    tanida: '谷田',
  };

  function getAuthorLabels() {
    return {
      ...FALLBACK_AUTHOR_LABELS,
      ...(window.UEHARA_AUTHORS || {}),
    };
  }

  function getSelectedAuthor() {
    return new URLSearchParams(window.location.search).get('author');
  }

  function parseList(value) {
    return String(value || '')
      .split(/[,\s]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function getWorkCards() {
    return Array.from(document.querySelectorAll('[data-work-card]'));
  }

  function isMatched(card, selectedAuthor) {
    if (!selectedAuthor) return true;

    const authorIds = parseList(card.dataset.authorIds);
    const relatedMemberIds = parseList(card.dataset.relatedMemberIds);

    return authorIds.includes(selectedAuthor) || relatedMemberIds.includes(selectedAuthor);
  }

  function updateCardVisibility(cards, selectedAuthor) {
    cards.forEach((card) => {
      const matched = isMatched(card, selectedAuthor);
      card.classList.toggle('hidden', !matched);
      card.setAttribute('aria-hidden', String(!matched));
    });
  }

  function getVisibleCards(cards) {
    return cards.filter((card) => !card.classList.contains('hidden'));
  }

  function countByType(cards) {
    const counts = {
      total: cards.length,
      international: 0,
      oral: 0,
      journal: 0,
    };

    cards.forEach((card) => {
      const type = card.dataset.type || card.dataset.workType;
      if (!type) return;
      counts[type] = (counts[type] || 0) + 1;
    });

    return counts;
  }

  function updateHeroCounts(counts) {
    document.querySelectorAll('[data-work-count]').forEach((element) => {
      const key = element.dataset.workCount;
      element.textContent = String(counts[key] ?? 0);
    });
  }

  function updateSectionCounts(counts) {
    document.querySelectorAll('[data-section-count]').forEach((element) => {
      const key = element.dataset.sectionCount;
      element.textContent = `${counts[key] ?? 0}件`;
    });
  }

  function updateSectionVisibility(counts) {
    document.querySelectorAll('[data-work-section]').forEach((section) => {
      const type = section.dataset.workSection;
      const count = counts[type] ?? 0;
      section.classList.toggle('hidden', count === 0);
      section.setAttribute('aria-hidden', String(count === 0));
    });
  }

  function updateCategoryAnchors(counts) {
    document.querySelectorAll('[data-category-anchor]').forEach((anchor) => {
      const type = anchor.dataset.categoryAnchor;
      const count = counts[type] ?? 0;
      anchor.classList.toggle('hidden', count === 0);
      anchor.setAttribute('aria-hidden', String(count === 0));
    });
  }

  function updateFilterNotice(selectedAuthor, counts) {
    const notice = document.querySelector('[data-filter-notice]');
    const label = document.querySelector('[data-filter-label]');
    if (!notice || !label) return;

    if (!selectedAuthor) {
      notice.classList.add('hidden');
      label.textContent = '';
      return;
    }

    const authorLabel = getAuthorLabels()[selectedAuthor] || selectedAuthor;
    notice.classList.remove('hidden');
    label.textContent = `${authorLabel} の研究業績を ${counts.total} 件表示しています。`;
  }

  function updatePageText(selectedAuthor) {
    if (!selectedAuthor) return;

    const authorLabel = getAuthorLabels()[selectedAuthor] || selectedAuthor;

    const title =
      document.querySelector('[data-works-page-title]') ||
      document.querySelector('[data-works-title]');

    if (title) {
      title.textContent = `${authorLabel} の研究業績`;
    }

    const description =
      document.querySelector('[data-works-page-description]') ||
      document.querySelector('[data-works-description]');

    if (description) {
      description.textContent = `${authorLabel} が著者または関連メンバーに含まれる研究業績のみを表示しています。`;
    }
  }

  function updateEmptyMessage(counts) {
    const emptyMessage = document.querySelector('[data-empty-message]');
    if (!emptyMessage) return;
    emptyMessage.classList.toggle('hidden', counts.total !== 0);
  }

  function init() {
    const cards = getWorkCards();
    if (cards.length === 0) return;

    const selectedAuthor = getSelectedAuthor();

    updateCardVisibility(cards, selectedAuthor);

    const visibleCards = getVisibleCards(cards);
    const counts = countByType(visibleCards);

    updateHeroCounts(counts);
    updateSectionCounts(counts);
    updateSectionVisibility(counts);
    updateCategoryAnchors(counts);
    updateFilterNotice(selectedAuthor, counts);
    updatePageText(selectedAuthor);
    updateEmptyMessage(counts);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
