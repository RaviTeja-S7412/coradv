/* eslint-disable prettier/prettier */
const ExportData = (dbdata, keys, file) => {

    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    dbdata.forEach((item) => {
      let ctr = 0
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]
        // eslint-disable-next-line no-plusplus
        ctr++
      })
      result += lineDelimiter
    })

    const link = document.createElement('a')
    let csv = result
    if (csv == null) return
    const filename = file+'.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()

}

export default ExportData;
