/* Mindfluence — light scroll-reveal motion (vanilla JS, no dependencies).
   Adds .js to <html> so the CSS reveal states only apply when this
   script actually runs. Content stays fully visible if JS is disabled,
   fails, or the browser lacks IntersectionObserver support. */
(function () {
  'use strict';
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var targets = document.querySelectorAll(
    '.article-card, .key-facts, .callout, .table-wrap, figure, .related, .disclaimer-box'
  );
  if (!targets.length) return;

  document.documentElement.classList.add('js');
  targets.forEach(function (el) { el.classList.add('reveal'); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();
