(function () {
  'use strict';
  var data = window.FOOTBALL;
  var $ = function (id) { return document.getElementById(id); };
  var DEFAULT_YEAR = 1970;
  var current = null;

  function eraOf(year) {
    for (var i = 0; i < data.eras.length; i++) if (year >= data.eras[i].from && year <= data.eras[i].to) return data.eras[i];
    return data.eras[0];
  }
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function clamp(year) { return Math.min(data.last, Math.max(data.first, year)); }
  function yearFromHash() {
    var match = /^#(\d{4})$/.exec(location.hash);
    var year = match ? Number(match[1]) : NaN;
    return year >= data.first && year <= data.last ? year : null;
  }

  // Arrow keys move between buttons in a group; one tab stop per group.
  function roving(container, onPick) {
    container.addEventListener('keydown', function (event) {
      var buttons = Array.prototype.slice.call(container.querySelectorAll('button'));
      var index = buttons.indexOf(document.activeElement);
      if (index < 0) return;
      var next = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: buttons.length - 1 }[event.key];
      if (next == null) return;
      event.preventDefault();
      next = Math.max(0, Math.min(buttons.length - 1, next));
      onPick(buttons[next]);
      var target = container.querySelectorAll('button')[next];
      if (target) target.focus();
    });
  }

  function renderEras(era) {
    var rail = $('era-rail');
    if (!rail.children.length) {
      data.eras.forEach(function (e) {
        var button = el('button', 'era-button');
        button.type = 'button';
        button.dataset.era = e.id;
        button.style.setProperty('--era', e.accent);
        button.append(el('span', 'era-id', e.id), el('span', 'era-label', e.name));
        button.setAttribute('aria-label', e.from + '–' + e.to + ': ' + e.name);
        button.addEventListener('click', function () {
          select(current >= e.from && current <= e.to ? current : (e.from <= DEFAULT_YEAR && DEFAULT_YEAR <= e.to ? DEFAULT_YEAR : e.from));
        });
        rail.append(button);
      });
      roving(rail, function (button) { button.click(); });
    }
    Array.prototype.forEach.call(rail.children, function (button) {
      var on = button.dataset.era === era.id;
      button.setAttribute('aria-pressed', String(on));
      button.tabIndex = on ? 0 : -1;
    });
    document.body.style.setProperty('--era', era.accent);
    $('era-range').textContent = era.from + '–' + era.to;
    $('era-name').textContent = era.name;
    $('era-blurb').textContent = era.blurb;
    var keys = $('era-keys');
    keys.replaceChildren.apply(keys, era.keys.map(function (k) { return el('li', '', k); }));
  }

  function renderYears(era, year) {
    var rail = $('year-rail');
    if (rail.dataset.era !== era.id) {
      rail.dataset.era = era.id;
      rail.replaceChildren();
      for (var y = era.from; y <= era.to; y++) {
        var li = el('li');
        var button = el('button', 'year-button');
        button.type = 'button';
        button.dataset.year = y;
        var wc = data.worldCupYears.indexOf(y) >= 0;
        if (wc) button.classList.add('is-world-cup');
        button.setAttribute('aria-label', y + (wc ? ', World Cup year' : ''));
        button.append(el('span', 'year-dot'), el('span', 'year-num', String(y)));
        button.addEventListener('click', function () { select(Number(this.dataset.year)); });
        li.append(button);
        rail.append(li);
      }
    }
    Array.prototype.forEach.call(rail.querySelectorAll('button'), function (button) {
      var on = Number(button.dataset.year) === year;
      if (on) button.setAttribute('aria-current', 'true'); else button.removeAttribute('aria-current');
      button.tabIndex = on ? 0 : -1;
    });
  }

  function trophyItem(t) {
    var li = el('li', 'trophy' + (t.pending ? ' is-pending' : ''));
    li.append(el('span', 'trophy-label', t.label), el('strong', 'trophy-winner', t.winner));
    var detail = t.detail || '';
    if (t.host) detail += (detail ? ' · ' : '') + 'Hosted by ' + t.host;
    if (detail) li.append(el('span', 'trophy-detail', detail));
    return li;
  }

  function renderYear(info) {
    $('year-title').textContent = String(info.year);
    $('year-headline').textContent = info.headline;
    $('prev-year').disabled = info.year <= data.first;
    $('next-year').disabled = info.year >= data.last;
    $('year-note').hidden = !info.note;
    $('year-note').textContent = info.note;

    $('podium-label').textContent = info.podiumLabel;
    var podium = $('podium');
    podium.replaceChildren.apply(podium, info.podium.map(function (p, i) {
      var li = el('li', 'step-' + (i + 1));
      var card = el('div', 'podium-card');
      card.append(el('span', 'podium-name', p.name), el('span', 'podium-meta', p.club + ' · ' + p.nation));
      var block = el('div', 'podium-block-shape');
      block.append(el('span', 'podium-rank', String(i + 1)));
      block.setAttribute('aria-hidden', 'true');
      li.append(el('span', 'sr-only', ['First', 'Second', 'Third'][i] + ': '), card, block);
      return li;
    }));
    $('podium-note').hidden = !info.podiumNote;
    $('podium-note').textContent = info.podiumNote;
    var wb = $('womens-ballon');
    wb.hidden = !info.womensBallon;
    if (info.womensBallon) {
      wb.replaceChildren(el('span', 'trophy-label', 'Women’s Ballon d’Or'), el('strong', '', info.womensBallon.name),
        el('span', 'trophy-detail', info.womensBallon.club + ' · ' + info.womensBallon.nation));
    }

    var moments = $('moments');
    moments.replaceChildren.apply(moments, info.moments.map(function (m) {
      var li = el('li', 'moment');
      li.append(el('h4', '', m.title), el('p', '', m.text));
      return li;
    }));

    var intl = $('intl');
    if (info.international.length) intl.replaceChildren.apply(intl, info.international.map(trophyItem));
    else intl.replaceChildren(el('li', 'trophy is-empty', 'No major tournament this year.'));
    var clubs = $('clubs');
    clubs.replaceChildren.apply(clubs, info.clubs.map(trophyItem));
    var leagues = $('leagues');
    leagues.replaceChildren.apply(leagues, info.leagues.map(function (l) {
      var li = el('li', 'league' + (l.pending ? ' is-pending' : ''));
      var code = el('span', 'league-code', l.id.toUpperCase());
      code.title = l.country + ' · ' + l.name;
      code.setAttribute('aria-hidden', 'true');
      li.append(code, el('span', 'sr-only', l.country + ': '), el('span', 'league-winner', l.winner));
      return li;
    }));
  }

  function select(year, options) {
    year = clamp(year);
    options = options || {};
    var era = eraOf(year);
    current = year;
    renderEras(era);
    renderYears(era, year);
    renderYear(data.years[year]);
    document.title = year + ' · Football Timeline — OpenGames';
    if (!options.fromHash && location.hash !== '#' + year) {
      try { history.replaceState(null, '', '#' + year); } catch (e) { /* file:// in some browsers */ }
    }
  }

  function init() {
    if (!data) return;
    $('prev-year').addEventListener('click', function () { select(current - 1); });
    $('next-year').addEventListener('click', function () { select(current + 1); });
    roving($('year-rail'), function (button) { button.click(); });
    window.addEventListener('hashchange', function () {
      var year = yearFromHash();
      if (year && year !== current) select(year, { fromHash: true });
    });
    select(yearFromHash() || DEFAULT_YEAR, { fromHash: true });
  }

  init();
})();
