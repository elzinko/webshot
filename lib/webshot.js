const etag = require('etag');
const { parse } = require('url');
const { getScreenshotDesktop, getScreenshotMobile } = require('./browser');
const { isValidUrl } = require('./validator');

const DEFAULT_DEVICE = 'desktop';
const API_BASE = '/';

async function getScreenshot(request, response) {
  try {
    const { pathname = '/', query = {} } = parse(request.url, true);
    const { type = 'png', quality = undefined, fullPage } = query;
    const device = query.device || DEFAULT_DEVICE;
    const target = pathname.replace(API_BASE, '');
    const url = 'https://' + target;
    let file = undefined;
    const filename = 'webshot_' + target + `.${type}`;
    console.log('PATHNAME : ' + pathname);
    console.log('URL : ' + url);
    console.log('DEVICE : ' + device);
    console.log('QUALITY : ' + quality);
    console.log('TYPE : ' + type);
    console.log('FILENAME : ' + filename);
    if (isValidUrl(url)) {
      switch (device) {
        case 'desktop': {
          file = await getScreenshotDesktop(url, type, quality, fullPage);
          break;
        }
        case 'mobile': {
          file = await getScreenshotMobile(url, type, quality, fullPage);
          break;
        }
        default: {
          response.statusCode = 400;
          response.setHeader('Cache-Control', 'public, max-age=5');
        }
      }
    } else {
      response.statusCode = 400;
      response.setHeader('Cache-Control', 'public, max-age=5');
    }
    
    response.statusCode = 200;
    response.setHeader('Content-Disposition', `filename="` + filename + `"`);
    response.setHeader('Content-Type', `image/${type}`);
    response.setHeader('Cache-Control', 'public, max-age=2678400, immutable'); // 1 month CDN cache to save resources
    response.setHeader('ETag', etag(file));
    response.end(file);
  } catch (e) {
    response.statusCode = 500;
    response.setHeader('Cache-Control', 'public, max-age=5');
    console.error(e.message);
  }
}

exports.getScreenshot = getScreenshot;