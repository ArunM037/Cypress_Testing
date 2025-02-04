const { defineConfig } = require("cypress");
const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const ExcelJs = require('exceljs')


async function setupNodeEvents(on, config) {

  // config.db = {
  // userName: "",
  //   password: ",
  // server: "",
  //  options: {
  //  database: "",
  //   encrypt: true,
  //     rowCollectionOnRequestCompletion: true
  // }
  //}

  require('cypress-mochawesome-reporter/plugin')(on);
  await addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );
  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);
  on('task', {
    excelToJsonConverter(filepath) {
      const result = excelToJson({
        source: fs.readFileSync(filepath) // fs.readFileSync return a Buffer
      });
      return result
    }
  })

  on('task', {
    async ExcelTest({ searchText, replaceText, Change, filepath }) {
      const workbook = new ExcelJs.Workbook()
      await workbook.xlsx.readFile(filepath)
      const worksheet = workbook.getWorksheet('Sheet1')
      const output = await readExcel(worksheet, searchText)
      const cell = worksheet.getCell(output.row, output.column + Change.column)
      cell.value = replaceText
      // pending resolved rejected
      return workbook.xlsx.writeFile(filepath).then(() => {
        return true
      }).catch((error) => {
        return false
      })
    }
  })
  return config;
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 }
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, cellNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber
        output.column = cellNumber
      }
    })
  })
  return output
}


module.exports = defineConfig({
  env: {
    URL: "https://rahulshettyacademy.com",
  },
  retries: {
    runMode: 1,

  },
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/examples/*.js'
  },
  video: true,
  trashAssetsBeforeRuns: true
});
