import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
      console.log('BROWSER LOG:', msg.text());
    });

    await page.goto('http://localhost:5173');
    await new Promise(r => setTimeout(r, 2000));

    const elements = await page.evaluate(() => {
      const bars = document.querySelectorAll('.group');
      if (bars.length === 0) {
        return { error: 'No .group elements found check if ArrayBar is rendered', html: document.body.innerHTML.substring(0, 500) };
      }
      const firstBar = bars[0];
      const innerDiv = firstBar.querySelector('div');
      const computedStyle = window.getComputedStyle(firstBar);
      const innerStyle = innerDiv ? window.getComputedStyle(innerDiv) : null;
      
      return {
        length: bars.length,
        outerHtml: firstBar.outerHTML,
        outerWidth: computedStyle.width,
        outerHeight: computedStyle.height,
        outerMinWidth: computedStyle.minWidth,
        outerDisplay: computedStyle.display,
        innerWidth: innerStyle ? innerStyle.width : 'null',
        innerHeight: innerStyle ? innerStyle.height : 'null',
      };
    });

    console.log('ELEMENT DETAILS:', JSON.stringify(elements, null, 2));

    await browser.close();
  } catch (err) {
    console.error("error", err);
  }
})();
