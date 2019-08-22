class Rule {

    /**
     * Create rule to handle response
     * @param {Object} options - condition and handlers for interceptor
     */
    constructor(options) {
        for (let prop in options) {
            this[prop] = options[prop]
        }
    }

}

module.exports = Rule;
