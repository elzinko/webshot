const puppeteer = require('puppeteer-core');
const { executablePath } = require('puppeteer')

const DESKTOP_USER_AGENT = 'Mozilla/5.0 (Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Webshot/1.0 (+https://github.com/elzinko/webshot/)';
const MOBILE_USER_AGENT = 'Mozilla/5.0 (Linux Android 5.0 SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36 Webshot-Mobile/1.0 (+https://github.com/elzinko/webshot/)';

const disableTransitionDelayCSS = `
  *, ::after, ::before {
    transition-delay: 0s !important;
    transition-duration: 0s !important;
    animation-delay: -0.1ms !important;
    animation-duration: 0s !important;
    animation-play-state: paused !important;
    caret-color: transparent !important;
    color-adjust: exact !important;
  }
`;

// Launch a headless browser instance
const launchBrowser = async () => {
    const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      executablePath: executablePath(),
    });
    return browser;
  };

// Create a new page with specified user agent and viewport settings
const createPageWithSettings = async (browser, userAgent, viewportSettings) => {
    const page = await browser.newPage();
    await page.emulate({
      userAgent,
      viewport: viewportSettings,
    });
    return page;
  };
  

/**
 * Get desktop screenshot
 * @param {*} url URL to screenshot
 * @param {*} type image type
 * @param {*} quality image quality
 * @param {*} fullPage full page screenshot
 * @returns 
 */
// Capture a screenshot of a page in desktop view
const getScreenshotDesktop = async (url, type, quality, fullPage) => {
    const browser = await launchBrowser();
    const desktopUserAgent = 'Mozilla/5.0 (Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Webshot/1.0 (+https://github.com/elzinko/webshot/)';
  
    const desktopViewport = {
      width: 1280,
      height: 960,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true,
    };
  
    const page = await createPageWithSettings(browser, desktopUserAgent, desktopViewport);
  
    await page.goto(url);
    await page.addStyleTag({ content: disableTransitionDelayCSS });

    const file = await page.screenshot({ type, quality, fullPage });
    await browser.close();
    return file;
  };

/**
 * Get a mobile screenshot
 * @param {*} url URL to screenshot
 * @param {*} type image type
 * @param {*} quality image quality
 * @param {*} fullPage full page screenshot
 * @returns 
 */
const getScreenshotMobile = async (url, type, quality, fullPage) => {
  const browser = await launchBrowser();
  const mobileUserAgent = 'Mozilla/5.0 (Linux Android 5.0 SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36 Webshot-Mobile/1.0 (+https://github.com/elzinko/webshot/)';

  const mobileViewport = {
    width: 360,
    height: 640,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    isLandscape: false,
  };

  const page = await createPageWithSettings(browser, mobileUserAgent, mobileViewport);

  await page.goto(url);
  await page.addStyleTag({ content: disableTransitionDelayCSS });

  const file = await page.screenshot({ type, quality, fullPage });
  await browser.close();
  return file;
};

module.exports = { getScreenshotDesktop, getScreenshotMobile };
