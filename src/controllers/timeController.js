function getTimeStringify() {
    const now = new Date()

    const timeData = {
        fullDate: now.toLocaleDateString('es-MX'),
        hour: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
    }

    return {
        timeData,
        stringifyJson: JSON.stringify(timeData),
    }
}

function logDataTable(data) {
    console.table([data])
}

function streamTime(_req, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.flushHeaders()

    let count = 0

    const intervalId = setInterval(() => {
        const { stringifyJson, timeData } = getTimeStringify()

        res.write(`data: ${stringifyJson}\n\n`)

        logDataTable({ count, ...timeData })

        count++
    }, 10_000)

    res.on('close', () => {
        clearInterval(intervalId)
        res.end()
    })
}

module.exports = {
    streamTime,
}
