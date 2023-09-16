const edgeChromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');


// You may want to change this if you're developing
// on a platform different from macOS.
// See https://github.com/vercel/og-image for a more resilient
// system-agnostic options for Puppeteeer.
const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

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
    // Edge executable will return an empty string locally.
    const executablePath = 
    await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE
    const browser = await puppeteer.launch({
      args: edgeChromium.args,
      executablePath,
      headless: true,
      // headless: true,
      ignoreHTTPSErrors: true,
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
    
    const desktopViewport = {
      width: 1280,
      height: 960,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true,
    };
  
    const page = await createPageWithSettings(browser, DESKTOP_USER_AGENT, desktopViewport);
  
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
  
  const mobileViewport = {
    width: 360,
    height: 640,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    isLandscape: false,
  };

  const page = await createPageWithSettings(browser, MOBILE_USER_AGENT, mobileViewport);

  await page.goto(url);
  await page.addStyleTag({ content: disableTransitionDelayCSS });

  const file = await page.screenshot({ type, quality, fullPage });
  await browser.close();
  return file;
};

module.exports = { getScreenshotDesktop, getScreenshotMobile };
