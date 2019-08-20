const server = require("./server.js");

exports.config = {
    directConnect: true,
    specs: ['protractor.test.js'],
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: ["--headless"]
        }
    },

    beforeLaunch: function () {
        server.listen(3000, function () {});
    }
};
