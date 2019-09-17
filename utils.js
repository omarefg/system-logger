const os = require('os')

const getRAMInGB = ram => Math.round(((ram / 1024) / 1024) / 1024)

const getCPUUsage = cb => {
    let cpu0 = os.cpus()
    let timeUsed0 = 0
    let timeIdle0 = 0    
    
    setTimeout(() => {
        const cpu1 = os.cpus()
        let timeUsed1 = 0
        let timeIdle1 = 0

        for (const cpu of cpu1) {
            timeUsed1 += cpu.times.user
            timeUsed1 += cpu.times.nice
            timeUsed1 += cpu.times.sys
            timeIdle1 += cpu.times.idle
        }

        for (const cpu of cpu0) {
            timeUsed0 += cpu.times.user
            timeUsed0 += cpu.times.nice
            timeUsed0 += cpu.times.sys
            timeIdle0 += cpu.times.idle
        }

        const timeUsed = timeUsed1 - timeUsed0
        const timeIdle = timeIdle1 - timeIdle0

        const percent = Math.round((timeUsed / (timeUsed + timeIdle)) * 100)

        return cb(percent)
    }, 1000)
}

const getTimeFromSeconds = seconds => {
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds - (hours * 3600)) / 60)
    seconds = seconds - (hours * 3600) - (minutes * 60)

    if (hours < 10) { hours = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    return `${hours}:${minutes}:${seconds}`
}
  

module.exports = {
    getRAMInGB,
    getCPUUsage,
    getTimeFromSeconds
}