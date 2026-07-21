/* ==========================================================
   個別指導塾 free LP スクリプト
   すべて「JSが動かなくてもページが読める」作りです。
   このファイルには文言・料金などのデータは置いていません。
   ========================================================== */

// JSが動いた印。CSSはこのクラスがあるときだけ表示を切り替えます
document.documentElement.classList.add('js');

/* ---------- 学年タブ(料金表の切り替え) ---------- */
(function () {
  var tabs = document.getElementById('grade-tabs');
  if (!tabs) return;
  tabs.hidden = false;

  var buttons = tabs.querySelectorAll('button[data-grade]');

  function select(grade) {
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-selected', btn.dataset.grade === grade ? 'true' : 'false');
    });
    document.querySelectorAll('.price-panel').forEach(function (panel) {
      panel.classList.toggle('active', panel.classList.contains('grade-' + grade));
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () { select(btn.dataset.grade); });
  });

  // 初期表示は「中学生」(メインターゲット)
  select('chu');
})();

/* ---------- スクロールで、ふわっと表示 ---------- */
(function () {
  if (!('IntersectionObserver' in window)) return; // 未対応ブラウザは常時表示
  document.documentElement.classList.add('anim');

  var fired = false; // 検知が一度でも動いたか
  var observer = new IntersectionObserver(function (entries) {
    fired = true;
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-item').forEach(function (el) {
    observer.observe(el);
  });

  // 安全弁:2秒たっても検知が一度も動かない環境では、アニメーションをやめて全文表示する
  setTimeout(function () {
    if (!fired) document.documentElement.classList.remove('anim');
  }, 2000);
})();

/* ---------- 固定CTAバー(ファーストビューのボタンが見えている間は隠す) ---------- */
(function () {
  var bar = document.getElementById('cta-bar');
  var heroCta = document.querySelector('.hero-cta .btn');
  if (!bar || !heroCta || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      bar.classList.toggle('is-hidden', entry.isIntersecting);
    });
  }, { threshold: 0 });

  observer.observe(heroCta);
})();

/* ---------- 地図:タップしてから操作できるようにする(誤スクロール防止) ---------- */
(function () {
  var cover = document.getElementById('map-cover');
  if (!cover) return;
  cover.addEventListener('click', function () {
    cover.remove();
  });
})();
