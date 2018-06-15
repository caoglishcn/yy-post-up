const puppeteer = require('puppeteer');
const moment = require('./includes/moment.min.js');
const _ = require('./includes/underscore-min.js');

var cliAgrv = process.argv.slice(2);
var tid = cliAgrv[0];
var logFilename = cliAgrv[1];


//const url = "http://www.yeeyi.com/bbs/forum.php?mod=viewthread&tid=4155747&page=1&extra=#pid27876695";

var tool = {
	this_url: function() {
		casper.echo(casper.getCurrentUrl());
	},
	now: function() {
		date = moment().format('[[]YYYY-MM-DD HH.mm.ss[]]');
		return date;
	}
};

// const url = "http://www.yeeyi.com/bbs/forum.php?mod=viewthread&tid="+tid+"&page=1&extra=#pid27876695";
const url = "http://www.yeeyi.com/bbs/forum.php?mod=viewthread&tid=" + tid;
logFilename = 'log/' + logFilename + tool.now() + '.png';

console.log("url:" + url);
console.log("filename:" + logFilename);


(async () => {
	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();
	await page.goto(url, {
		waitUntil: 'networkidle2'
	});

	await page.type("#ls_username", process.env.yeeyi_name);
	await page.type('#ls_password', process.env.yeeyi_pass);
	await page.click('#lsform button');
	try {
		await page.waitForSelector('#k_refresh', {
			timeout: 3000
		});
		await page.click('#k_refresh');
		await page.waitFor(2000);

		var target = await page.$("#fwin_k_refresh");
		await target.screenshot({
			path: logFilename
		});
	} catch {

	}
	//fwin_k_refresh



	// await page.pdf({path: 'hn.pdf', format: 'A4'});

	await browser.close();
})();