import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-core'

export const maxDuration = 300;


function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

const disableTransitionDelayCSS = `
  *, ::after, ::before {
    transition-delay: 0s !important;
    transition-duration: 0s !important;
    animation-delay: -0.1ms !important;
    animation-duration: 0s !important;
    animation-play-state: paused !important;
    caret-color: transparent !important;
    color-adjust: exact !important;
    opacity: 1 !important;
  }
`;

const desktopViewport = {
  width: 1280,
  height: 960,
  deviceScaleFactor: 1,
  isMobile: false,
  hasTouch: false,
  isLandscape: true,
};

const mobileViewport = {
  width: 360,
  height: 640,
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
  isLandscape: false,
};

const DESKTOP_USER_AGENT = 'Mozilla/5.0 (Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Webshot/1.0 (+https://github.com/elzinko/webshot/)';
const MOBILE_USER_AGENT = 'Mozilla/5.0 (Linux Android 5.0 SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36 Webshot-Mobile/1.0 (+https://github.com/elzinko/webshot/)';


type Json = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Json | Buffer>
) {
  const { searchParams } = new URL(
    req.url as string,
    `http://${req.headers.host}`
  )
  const url = searchParams.get('url')
  if (!url) {
    return res.status(400).json({ message: `A ?url query-parameter is required` })
  }
  if (!isValidUrl(url)) {
    return res.status(400).json({ message: `The url provided is not valid` })
  }
  const fullpage = searchParams.has('fullpage');
  const device = searchParams.get('device')
  const type = searchParams.get('type') || 'png'
  const selectorId = searchParams.get('selectorId')
  const selector = selectorId ? `#${selectorId}` : null
  const filename = `${url.replace(/(^\w+:|^)\/\//, '').replace(/\//g, '_')}${selectorId ? `_${selectorId}` : ''}${device ? `_${device}` : ''}.${type}`

  const viewPort = device === 'mobile' ? mobileViewport : desktopViewport
  const userAgent = device === 'mobile' ? MOBILE_USER_AGENT : DESKTOP_USER_AGENT

  console.log(`🚀 BLESS_TOKEN : `, process.env.BLESS_TOKEN)
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
  })

  try {
    const page = await browser.newPage()
    await page.setViewport(viewPort)
    await page.setUserAgent(userAgent);
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' })
    await page.addStyleTag({ content: disableTransitionDelayCSS })

    let file = null
    if (selector) {
      await page.waitForSelector(selector)
      const element = await page.$(selector)
      if (!element) {
        throw new Error(`No element found for selector: ${selector}`)
      }
      const box = await element.boundingBox()
      if (!box) {
        throw new Error(`No bounding box found for selector: ${selector}`)
      }
      const { x, y, width, height } = box
      await page.hover(selector);
      file = await page.screenshot({ type: type as 'png' | 'jpeg' | 'webp' | undefined, clip: { x, y, width, height }, fullPage: fullpage })
    } else {
      file = await page.screenshot({ type: type as 'png' | 'jpeg' | 'webp' | undefined, fullPage: fullpage })
    }
    await browser.close();

    res.setHeader('Content-Disposition', `filename="${filename}"`)
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, max-age=2678400, immutable') // 1 month CDN cache
    return res.status(200).send(file)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    await browser.close();
  }
}
