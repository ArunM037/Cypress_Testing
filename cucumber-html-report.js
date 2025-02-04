const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "./cypress/cucumberReports",
    reportPath: "./cypress/cucumberReports/cucumber-htmlreport.html",
    metadata: {
        browser: {
            name: "Electron",
            version: "112",
        },
        device: "Local test machine",
        platform: {
            name: "Windows",
            version: "11",
        },
    },
    customData: {
        title: "Cucumber Test info",
        data: [
            { label: "Project", value: "Ecommerce Project" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "B11221.34321" },
            { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
            { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
        ],
    },
});