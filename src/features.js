import puppeteer from "puppeteer";
import { config } from "./main.js";

const delay = (time) => {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

export class Main {
    page;

    async init() {
        const b = await puppeteer.launch({ headless: false });
        this.page = await b.newPage();
        await this.page.setViewport({
            width: 960,
            height: 1020
        });

        await this.page.goto("https://www.chakkham.info/site/signin/");
        await this.page.type("#stu_id",  config.client.schoolID);
        await this.page.type("#stu_id_card", config.client.citizenID);
        await this.page.click('input[type="submit"][name="submit"][value="LOG IN"]');

        await delay(config.configuration.evaluateDelay)
    }

    async evaluateTeacher() {
        await this.page.goto("https://www.chakkham.info/site/?feature=teacher_questionnaire&option=teacher_quiz", { waitUntil: 'domcontentloaded' });

        await delay(config.configuration.evaluateDelay);

        let elements = await this.page.$$('a[original-title="ประเมินครูผู้สอน"]');
        for (let i = 0; i < elements.length; i++) {
            config.configuration.teacher[i]
            
            await elements[i].click();
            await delay(config.configuration.evaluateDelay);

            let choice;
            let randomVal;
            for (let j = 1; j < 26; j++) {
                randomVal = Math.floor(Math.random() * 100);
        
                if (randomVal < config.configuration.teacherStatistic[i].poor_probability) choice = "c";
                else if (randomVal < config.configuration.teacherStatistic[i].poor_probability + config.configuration.teacherStatistic[i].fair_probability) choice = "b";
                else choice = "a";
        
                await this.page.$eval(`#${choice}${j}`, (input) => {
                    input.click();
                });
            }
        
            const back = await this.page.$$("#Savebtns");
            if (back[1]) await back[1].click();
        
            await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        
            await this.page.goto("https://www.chakkham.info/site/?feature=teacher_questionnaire&option=teacher_quiz", { waitUntil: 'domcontentloaded' });
        
            await this.page.waitForSelector('a[original-title="ประเมินครูผู้สอน"]');
        
            elements = await this.page.$$('a[original-title="ประเมินครูผู้สอน"]');
        
            await delay(config.configuration.evaluateDelay);
        }
    }

    async evaluateSDQ() {
        const links = await this.page.$$('a');
        for (const link of links) {
            const text = await this.page.evaluate(el => el.textContent, link);
            if (text.includes("ประเมินพฤติกรรม (SDQ)")) {
                await link.click();
                break;
            }
        }
        await delay(config.configuration.evaluateDelay);
        for (let i = 1; i <= 25; i++) {
            if ([2, 3, 5, 6, 8, 10, 12, 13, 15, 16, 18, 19, 22, 24].includes(i)) {
                await this.page.$eval(`#a${i}`, (input) => {
                    input.click();
                });
            } else if ([7, 14, 17, 23].includes(i)) {
                await this.page.$eval(`#b${i}`, (input) => {
                    input.click();
                });
            } else {
                await this.page.$eval(`#c${i}`, (input) => {
                    input.click();
                });
            }
        }

        await this.page.$eval('#problem_level1', (input) => {
            input.click();
        });

        await this.page.click('#Savebtns');
    }

    async evaluateApitude() {
        let links = await this.page.$$('a');
        for (const link of links) {
            const text = await this.page.evaluate(el => el.textContent, link);
            if (text.includes("ประเมินสมรรถนะตนเอง")) {
                await link.click();
                break;
            }
        }

        await delay(config.configuration.evaluateDelay);
        
        for (let i = 1; i <= 42; i++) {
            const selector = ([5, 6, 7, 17, 35, 36, 42].includes(i)) ? `#capacity1${i}` : `#capacity2${i}`;
            await this.page.$eval(selector, (input) => input.click());
        }
        
        await this.page.click('#Savebtns');
        await delay(config.configuration.evaluateDelay);
        
        links = await this.page.$$('a');
        for (const link of links) {
            const text = await this.page.evaluate(el => el.textContent, link);
            if (text.includes("ภาคความรู้สึก")) {
                await link.click();
                break;
            }
        }
        
        await delay(config.configuration.evaluateDelay);

        for (let i = 1; i <= 30; i++) {
            let selector = ([2, 3].includes(i)) ? `#capacity1${i}` : `#capacity5${i}`;
            if ([10, 13, 18, 20, 22].includes(i)) selector = `#capacity4${i}`;
            await this.page.$eval(selector, (input) => input.click());
        }

        await this.page.click('#Savebtns');
    }
}