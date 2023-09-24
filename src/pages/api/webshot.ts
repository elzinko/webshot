// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-core'
import fs from 'fs'

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
    return res
      .status(400)
      .json({ message: `A ?url query-parameter is required` })
  }

  console.log(`🚀 BLESS_TOKEN : `, process.env.BLESS_TOKEN)
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
  })

  const desktopViewport = {
    width: 1280,
    height: 960,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: true,
  };

  const page = await browser.newPage()
  await page.setViewport(desktopViewport)
  await page.goto(url)
  await page.addStyleTag({ content: disableTransitionDelayCSS })
  const file = await page.screenshot({ type: 'png' })
  await browser.close();
  res.setHeader('Content-Disposition', 'filename="screenshot.png"');
  res.setHeader('Content-Type', 'image/png}');
  res.setHeader('Cache-Control', 'public, max-age=2678400, immutable'); // 1 month CDN cache
  return res.status(200).send(file)
}
