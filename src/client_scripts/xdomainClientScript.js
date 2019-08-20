//TODO create unit test and continue to work
function xdomainClientScript(args) {
    var XDomainXMLHTTPRequest = XMLHttpRequest;
    XMLHttpRequest = function () {
        var xdomain = new XDomainXMLHTTPRequest();
        xdomain.openOriginal = xdomain.open;
        xdomain.open = function () {
            xdomain.responseURL = arguments[1];
            xdomain.openOriginal(arguments);
        };
        xdomain.sendOriginal = xdomain.send;
        xdomain.send = function () {
            Object.defineProperty(this, "response", {
                get: function () {
                    for (var i = 0; i < args.length; i++) {
                        var conditionFunction = eval("(" + args[i]["condition"] + ")");
                        var handlerFunction = eval("(" + args[i]["handler"] + ")");
                        if (conditionFunction(this)) {
                            return handlerFunction(this._response)
                        }
                    }
                    return this._response
                },
                set: function (response) {
                    this._response = response;
                }
            });
            xdomain.sendOriginal(arguments);
        };
        return xdomain
    };
}

module.exports = xdomainClientScript;
