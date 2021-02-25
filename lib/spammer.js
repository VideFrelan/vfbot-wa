const { fetchJson } = require('../function/fetcher.js')

const email = (target, subjek, pesan) => new Promise((resolve, reject) => {
    console.log(`Sending email to: ${target}\nSubjek: ${subjek}\nPesan: ${pesan}...`)
    fetchJson(`https://videfikri.com/api/spamemail/?email=${target}&subjek=${subjek}&pesan=${pesan}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const call = (query) => new Promise((resolve, reject) => {
    console.log(`Calling: ${query}...`)
    fetchJson(`https://videfikri.com/api/call/?nohp=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
        email,
        call
}
