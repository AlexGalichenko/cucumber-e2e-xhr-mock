function xhrClientScript(args) {
    XMLHttpRequest.prototype.responseURL = "";
    XMLHttpRequest.prototype.originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        this.method = arguments[0];
        this.responseURL = arguments[1];
        XMLHttpRequest.prototype.originalOpen.apply(this, arguments)
    };
    for (let i = 0; i < args.length; i++) {
        const rule = args[i];
        const keys = Object.keys(args[i]);
        for (let propIndex = 1; propIndex < keys.length; propIndex++) {
            const prop = keys[propIndex];
            if (prop !== "condition") {
                const getter = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, prop).get;
                Object.defineProperty(XMLHttpRequest.prototype, prop, {
                    get: function () {
                        const conditionFunction = eval("(" + rule["condition"] + ")");
                        const handlerFunction = eval("(" + rule[prop] + ")");
                        if (conditionFunction(this)) {
                            return handlerFunction(getter.apply(this))
                        }
                        return getter.apply(this)
                    },
                });
            }
        }
    }
}

module.exports = xhrClientScript;
