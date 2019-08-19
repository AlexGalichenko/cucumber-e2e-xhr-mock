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
        return browser.executeScript(function(args) {
            var responseGet = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "response").get;
            Object.defineProperty(XMLHttpRequest.prototype, "response", {
                get: function() {
                    for (let i = 0; i < args.length; i++) {
                        eval("var conditionFunction = " + args[i]["conditionFunction"]);
                        eval("var handlerFunction = " + args[i]["handler"]);
                        if (conditionFunction(this)) {
                            return handlerFunction(responseGet.apply(this))
                        }
                    }
                    return responseGet.apply(this)
                },
            });
        }, this.rules);
    }

    /**
     * Inject mocks for xdomain realization
     * @param browser
     * @return {*}
     */
    mockXdomain(browser) {
        return browser.executeScript(function(args) {
            var XDomainXMLHTTPRequest = XMLHttpRequest;
            XMLHttpRequest = function() {
                var xdomain = new XDomainXMLHTTPRequest();
                xdomain.openOriginal = xdomain.open;
                xdomain.open = function (...params) {
                    xdomain.responseURL = params[1];
                    xdomain.openOriginal(...params);
                };
                xdomain.sendOriginal = xdomain.send;
                xdomain.send = function(...params) {
                    Object.defineProperty(this, "response", {
                        get: function() {
                            for (let i = 0; i < args.length; i++) {
                                eval("var conditionFunction = " + args[i]["conditionFunction"]);
                                eval("var handlerFunction = " + args[i]["handler"]);
                                console.log(conditionFunction(this));
                                if (conditionFunction(this)) {
                                    return handlerFunction(this._response)
                                }
                            }
                            return this._response
                        },
                        set: function(response) {
                            this._response = response;
                        }
                    });
                    xdomain.sendOriginal(...params);
                };
                return xdomain
            };
        }, this.rules);
    }

}

module.exports = XMLHttpRequestMock;
