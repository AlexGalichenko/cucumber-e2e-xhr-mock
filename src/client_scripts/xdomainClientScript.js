function xdomainClientScript(args) {
    var XDomainXMLHTTPRequest = XMLHttpRequest;
    XMLHttpRequest = function() {
        const xdomain = new XDomainXMLHTTPRequest();
        xdomain.openOriginal = xdomain.open;
        xdomain.open = function () {
            xdomain.method = arguments[0];
            xdomain.responseURL = arguments[1];
            xdomain.openOriginal.apply(this, arguments);
        };
        xdomain.sendOriginal = xdomain.send;
        xdomain.send = function() {
            for (let i = 0; i < args.length; i++) {
                const rule = args[i];
                const keys = Object.keys(args[i]);
                for (let propIndex = 0; propIndex < keys.length; propIndex++) {
                    const prop = keys[propIndex];
                    if (prop !== "condition") {
                        const privateProp = "_" + prop;
                        Object.defineProperty(this, prop, {
                            get: function () {
                                const conditionFunction = eval("(" + rule["condition"] + ")");
                                const handlerFunction = eval("(" + rule[prop] + ")");
                                if (conditionFunction(this)) {
                                    return handlerFunction(this[privateProp])
                                }
                                return this[privateProp]
                            },
                            set: function(val) {
                                this[privateProp] = val;
                            }
                        });
                    }
                }
            }
            xdomain.sendOriginal.apply(this, arguments);
        };
        return xdomain
    };
}

module.exports = xdomainClientScript;
