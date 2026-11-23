// Data integrity for the Football Timeline (node --test tests/timeline.test.cjs).
const test = require('node:test');
const assert = require('node:assert');
const F = require('../football-timeline/data.js');

test('every year from first to last has a full entry', () => {
  for (let y = F.first; y <= F.last; y++) {
    const d = F.years[y];
    assert.ok(d, `missing ${y}`);
    assert.ok(d.headline, `${y} headline`);
    assert.equal(d.podium.length, 3, `${y} podium`);
    d.podium.forEach(p => assert.ok(p.name && p.club && p.nation, `${y} podium entry`));
    assert.equal(d.ballon.length, 3, `${y} Ballon d'Or podium`);
    assert.equal(new Set(d.podium.map(p => p.name)).size, 3, `${y} duplicate pick`);
    assert.ok(d.moments.length >= 2, `${y} moments`);
    d.moments.forEach(m => assert.ok(m.title && m.text, `${y} moment`));
    assert.ok(d.clubs.length >= 2 && d.clubs.every(c => c.label && c.winner), `${y} clubs`);
    assert.equal(d.leagues.length, 6, `${y} leagues`);
  }
});

test('league tables cover every year exactly once', () => {
  F.leagues.forEach(l => assert.equal(l.champions.length, F.last - F.first + 1, l.id));
});

test('eras cover the whole range without gaps or overlaps', () => {
  let next = F.first;
  F.eras.forEach(e => { assert.equal(e.from, next, e.id); assert.ok(e.to >= e.from); next = e.to + 1; });
  assert.equal(next, F.last + 1);
});

test('known anchors', () => {
  assert.equal(F.years[1970].international[0].winner, 'Brazil');
  assert.equal(F.years[2005].clubs[0].winner, 'Liverpool');
  assert.equal(F.years[2016].leagues[0].winner, 'Leicester City');
  assert.equal(F.years[2019].leagues[5].winner, 'Flamengo');
  assert.equal(F.years[2008].ballon[0].name, 'Cristiano Ronaldo');
  // Picks include players the Ballon d'Or excluded before 1995.
  assert.equal(F.years[1970].podium[0].name, 'Pelé');
  assert.equal(F.years[1986].podium[0].name, 'Diego Maradona');
  assert.ok(F.years[1994].podium.some(p => p.name === 'Romário'));
  assert.equal(F.years[2026].international[0].winner, 'Spain');
  assert.deepEqual(F.worldCupYears.filter(y => y % 4 !== 2), []);
});
