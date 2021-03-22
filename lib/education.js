const { fetchJson } = require('../function/fetcher.js')

const wikipedia = (query) => new Promise((resolve, reject) => {
    console.log(`Mencari Wikipedia untuk: ${query}...`)
    fetchJson(`https://videfikri.com/api/wiki/?query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const wikipediaen = (query) => new Promise((resolve, reject) => {
    console.log(`Searching Wikipedia for: ${query}...`)
    fetchJson(`https://videfikri.com/api/wikieng/?query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const kbbi = (query) => new Promise((resolve, reject) => {
    console.log(`Mencari KBBI untuk: ${query}...`)
    fetchJson(`https://videfikri.com/api/kbbi/?query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const covidindo = () => new Promise((resolve, reject) => {
    console.log(`Mencari data covidindo...`)
    fetchJson(`https://videfikri.com/api/covidindo/`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const quran = () => new Promise((resolve, reject) => {
    console.log(`Mencari data quran...`)
    fetchJson(`https://videfikri.com/api/randquran/`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const kisahnabi = (query) => new Promise((resolve, reject) => {
    console.log(`Mencari data nabi: ${query}...`)
    fetchJson(`https://videfikri.com/api/religi/kisahnabi/?nabi=${query.toLowerCase()}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
    wikipedia,
    wikipediaen,
    kbbi,
    covidindo,
    quran,
    kisahnabi
}
