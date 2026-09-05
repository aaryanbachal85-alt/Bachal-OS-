const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push(err.message);
  });

  await page.goto('file:///workspaces/Bachal-OS-/index.html', { waitUntil: 'networkidle' });
  
  // Wait a bit for initialization
  await page.waitForTimeout(1000);
  
  // Try clicking the radar icon
  const radarIcon = await page.$('#radarIcon');
  if (radarIcon) {
    console.log('Radar icon found');
    await radarIcon.click();
    await page.waitForTimeout(500);
    
    const radarWindow = await page.$('#radar');
    if (radarWindow) {
      const display = await radarWindow.evaluate(el => getComputedStyle(el).display);
      console.log('Radar window display:', display);
    }
  } else {
    console.log('Radar icon NOT found');
  }
  
  if (errors.length > 0) {
    console.log('\n=== ERRORS ===');
    errors.forEach(e => console.log(e));
  } else {
    console.log('\n=== NO ERRORS ===');
  }
  
  await browser.close();
})();
