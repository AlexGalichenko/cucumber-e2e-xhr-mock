function xhrClientScript(args) {
    var responseGet = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "response").get;
    Object.defineProperty(XMLHttpRequest.prototype, "response", {
        get: function () {
            for (var i = 0; i < args.length; i++) {
                var conditionFunction = eval("(" + args[i]["condition"] + ")");
                var handlerFunction = eval("(" + args[i]["handler"] + ")");
                if (conditionFunction(this)) {
                    return handlerFunction(responseGet.apply(this))
                }
            }
            return responseGet.apply(this)
        },
    });
    Object.defineProperty(XMLHttpRequest.prototype, "responseText", {
        get: function () {
            for (var i = 0; i < args.length; i++) {
                var conditionFunction = eval("(" + args[i]["condition"] + ")");
                var handlerFunction = eval("(" + args[i]["handler"] + ")");
                if (conditionFunction(this)) {
                    return handlerFunction(responseGet.apply(this))
                }
            }
            return responseGet.apply(this).toString()
        },
    })
}

module.exports = xhrClientScript;
