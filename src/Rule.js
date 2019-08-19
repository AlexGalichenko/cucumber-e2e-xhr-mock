class Rule {

    /**
     * Create rule to handle response
     * @param {Function} condition - function contains condition
     * @param {Function} handler - modifier to request
     */
    constructor(condition, handler) {
        this.condition = condition;
        this.handler = handler;
    }

}

module.exports = Rule;
