(function () {
  const params = new URLSearchParams(window.location.search);
  const author = params.get('author');
  if (!author) return;

  const authorLabels = window.UEHARA_AUTHORS || {};
  const label = authorLabels[author] || author;
  const cards = document.querySelectorAll('.publication-card');
  let visibleCount = 0;

  cards.forEach((card) => {
    const authorIds = (card.dataset.authorIds || '').split(/\s+/).filter(Boolean);
    const relatedIds = (card.dataset.relatedMemberIds || '').split(/\s+/).filter(Boolean);
    const matched = authorIds.includes(author) || relatedIds.includes(author);
    card.classList.toggle('hidden', !matched);
    if (matched) visibleCount += 1;
  });

  document.querySelectorAll('[data-work-section]').forEach((section) => {
    const visibleCards = section.querySelectorAll('.publication-card:not(.hidden)');
    section.classList.toggle('hidden', visibleCards.length === 0);
  });

  const pageTitle = document.querySelector('[data-works-title]');
  if (pageTitle) pageTitle.textContent = `${label} の研究業績`;

  const pageDescription = document.querySelector('[data-works-description]');
  if (pageDescription) pageDescription.textContent = `${label} が著者または関連メンバーに含まれる研究業績のみを表示しています。`;

  const notice = document.querySelector('[data-filter-notice]');
  if (notice) {
    notice.classList.remove('hidden');
    notice.querySelector('[data-filter-label]').textContent = `${label} の研究業績を ${visibleCount} 件表示しています。`;
  }
})();
