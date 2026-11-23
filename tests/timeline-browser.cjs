// Football Timeline browser checks. Chromium; runs over file:// (no server needed).
const { chromium } = require('playwright');
const assert = require('node:assert');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const url = pathToFileURL(path.resolve(__dirname, '..', 'football-timeline', 'index.html')).href;

(async () => {
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  const errors = [];
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844], [320, 568], [844, 390]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => m.type() === 'error' && errors.push(m.text()));
    await page.goto(url);
    assert.equal(await page.textContent('#year-title'), '1970', 'default year');
    // Every year renders without horizontal overflow.
    for (let y = 1960; y <= 2026; y++) {
      await page.evaluate(year => { location.hash = '#' + year; }, y);
      await page.waitForFunction(year => document.getElementById('year-title').textContent === String(year), y);
      assert.equal(await page.locator('#podium li').count(), 3, `${y} podium`);
      assert.ok(await page.locator('#moments li').count() >= 2, `${y} moments`);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      assert.ok(over <= 0, `${width}x${height} ${y}: overflow ${over}`);
    }
    // Small targets are still at least 44px.
    const small = await page.$$eval('button', bs => bs.filter(b => { const r = b.getBoundingClientRect(); return r.width && (r.width < 44 || r.height < 44); }).map(b => b.textContent));
    assert.deepEqual(small, [], `${width}x${height} small buttons`);
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(url + '#1994');
  assert.equal(await page.getAttribute('.era-button[data-era="90s"]', 'aria-pressed'), 'true');
  assert.match(await page.textContent('#intl'), /Brazil/);
  // Mouse: era then year.
  await page.click('.era-button[data-era="00s"]');
  assert.equal(await page.textContent('#year-title'), '2000');
  await page.click('.year-button[data-year="2005"]');
  assert.equal(await page.textContent('#year-title'), '2005');
  assert.ok(page.url().endsWith('#2005'));
  // Keyboard: arrows inside the year rail, Home/End, and across eras with the step buttons.
  await page.focus('.year-button[data-year="2005"]');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.textContent('#year-title'), '2006');
  assert.equal(await page.evaluate(() => document.activeElement.dataset.year), '2006');
  await page.keyboard.press('End');
  assert.equal(await page.textContent('#year-title'), '2009');
  await page.click('#next-year');
  assert.equal(await page.textContent('#year-title'), '2010');
  assert.equal(await page.getAttribute('.era-button[data-era="10s"]', 'aria-pressed'), 'true');
  await page.focus('.era-button[data-era="10s"]');
  await page.keyboard.press('ArrowLeft');
  assert.equal(await page.getAttribute('.era-button[data-era="00s"]', 'aria-pressed'), 'true');
  // Bounds.
  await page.goto(url + '#2026');
  assert.ok(await page.isDisabled('#next-year'));
  assert.match(await page.textContent('#leagues'), /In progress/);
  await page.goto(url + '#1960');
  assert.ok(await page.isDisabled('#prev-year'));
  await page.goto('about:blank');
  await page.goto(url + '#1850');
  assert.equal(await page.textContent('#year-title'), '1970', 'invalid hash falls back');

  assert.deepEqual(errors, []);
  await browser.close();
  console.log('timeline-browser: all checks passed');
})().catch(e => { console.error(e); process.exit(1); });
