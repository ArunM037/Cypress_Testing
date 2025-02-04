const ExcelJs = require('exceljs')

async function ExcelTest(searchText, replaceText, Change, filepath) {

    const workbook = new ExcelJs.Workbook()
    await workbook.xlsx.readFile(filepath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcel(worksheet, searchText)
    const cell = worksheet.getCell(output.row, output.column + Change.column)
    cell.value = replaceText
    await workbook.xlsx.writeFile(filepath)
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

// update Mango price to 350
ExcelTest('Mango', 350, Change = { row: 0, column: 2 }, 'G:/ExcelJs Utilis/download.xlsx')
