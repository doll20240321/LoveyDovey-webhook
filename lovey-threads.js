const RSSParser = require('rss-parser');
const axios = require('axios');
const parser = new RSSParser();

// 你的 Discord Webhook URL
const webhookUrl = 'process.env.WEBHOOK_URL';

// 你的 RSS Feed URL（從 rss.app 拿到的）
const feedUrl = 'process.env.FEED_URL';

async function checkFeed() {
    try {
        const feed = await parser.parseURL(feedUrl);
        const latest = feed.items[0]; // 抓最新一篇
        if (latest) {
            await axios.post(webhookUrl, {
                content: `${latest.title}\n${latest.link}`
            });
            console.log('已推送最新貼文到 Discord！');
        } else {
            console.log('目前 RSS 沒有內容。');
        }
    } catch (err) {
        console.error('抓取 RSS 發生錯誤：', err.message);
    }
}

// 先測試一次
checkFeed();

// 如果要定時檢查（例如每小時一次）
setInterval(checkFeed, 60 * 60 * 1000);

