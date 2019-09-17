const os = require('os')
const fs = require('fs')

const { getRAMInGB, getCPUUsage, getTimeFromSeconds } = require('./utils')
const { homedir } = os.userInfo()
const INTERVAL_TIME = 1000 * 60 * 60


setInterval(() => getCPUUsage(usage => {
    const DATE_TIME = new Date().toLocaleString().replace(',', ' -')
    const TOTAL_RAM = getRAMInGB(os.totalmem())
    const FREE_RAM = getRAMInGB(os.freemem())
    const USED_RAM = TOTAL_RAM - FREE_RAM
    const UPTIME = getTimeFromSeconds(os.uptime())
    
    const csvRow = `\n${DATE_TIME},${UPTIME},${TOTAL_RAM},${USED_RAM},${FREE_RAM},${usage}`
    const text = `*************************\nDate: ${DATE_TIME}\nUptime: ${UPTIME}\nTotal Memory RAM: ${TOTAL_RAM}GB\nUsed Memory RAM: ${USED_RAM}GB\nFree Memory RAM: ${FREE_RAM}GB\nCPU Usage: ${usage}%\n`
    
    fs.writeFileSync(`${homedir}/.system-logger.csv`, csvRow, { flag: 'a' })
    fs.writeFileSync(`${homedir}/.system-logger.log`, text, { flag: 'a' })
}), INTERVAL_TIME)
