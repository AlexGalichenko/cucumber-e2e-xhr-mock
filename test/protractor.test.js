const { XMLHttpRequestMock, Rule } = require("../index");
const { browser, element, by } = require("protractor");

describe("protractor tests", () => {
    beforeAll(async () => {
        browser.waitForAngularEnabled(false);
        await browser.get("http://localhost:3000/testPage.html");
        const mock = new XMLHttpRequestMock([
            new Rule(
                function (xhr) {
                    return xhr.responseURL.includes("time")
                },
                function (xhr) {
                    console.log(xhr);
                    return "mocked data"
                }
            )
        ]);
        await mock.mock(browser);
    });

    it("mock result via responseText", async () => {
        const buttonTime = element(by.css("#buttonTime"));
        await buttonTime.click();
        const resultField = element(by.css("#time"));
        expect(await resultField.getText()).toBe("mocked data");
    });

    it("mock result via response", async () => {
        const buttonTime = element(by.css("#buttonTime"));
        await buttonTime.click();
        const resultField = element(by.css("#timeResponse"));
        expect(await resultField.getText()).toBe("mocked data");
    });

});
