const xhrClientScript = require("./client_scripts/xhrClientScript");
const xdomainClientScript = require("./client_scripts/xdomainClientScript");

class XMLHttpRequestMock {

    constructor(rules) {
        this.rules = rules;
    }

    /**
     * Inject mocks
     * @param browser - reference to protractor browser
     * @return {Promise<void>}
     */
    mock(browser) {
        return browser.executeScript(xhrClientScript, this.rules);
    }

    /**
     * Inject mocks for xdomain realization
     * @param browser
     * @return {*}
     */
    mockXdomain(browser) {
        return browser.executeScript(xdomainClientScript, this.rules);
    }

}

module.exports = XMLHttpRequestMock;
