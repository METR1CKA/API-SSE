const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/', (_req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    let count = 0

    setInterval(() => {
        const time = new Date()
        console.log(`[${count}] Creating time:`, time)

        const timeData = {
            fullDate: time.toLocaleDateString('es-MX'),
            hour: time.getHours(),
            minutes: time.getMinutes(),
            seconds: time.getSeconds(),
        }
        console.log(`[${count}] Time data:`, timeData)

        const parseJson = JSON.stringify(timeData)
        console.log(`[${count}]  Parsing JSON:`, parseJson)

        res.write(`data: ${parseJson}\n\n`)

        console.log(`[${count}] Sending time\n`)

        count++
    }, 3000)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
