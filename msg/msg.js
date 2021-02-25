const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('config.json'))

exports.notRegistered = (pushname) => {
    return `Kamu belum terdaftar di database\nketik ${prefix}register untuk melakukan pendaftaran`
}

exports.wait = () => {
    return 'Mohon tunggu sebentar...'
}

exports.menu = (pushname) => {
    return `
╠══★〘 VF BOT-WA 〙★══
║
╠☞ Nama: *${pushname}*
║
║★══★══★══★══★══★

╔══★〘 DOWNLOADER 〙★══
║
╠☞ *${prefix}igtv*
╠☞ *${prefix}play*
╠☞ *${prefix}ytmp3*
╠☞ *${prefix}ytmp4*
║
╠══★〘 STALKER 〙★══
║
╠☞ *${prefix}igstalk*
╠☞ *${prefix}twtprof*
╠☞ *${prefix}github*
║
╠══★〘 STICKER 〙★══
║
╠☞ *${prefix}sticker*
╠☞ *${prefix}stickergif*
╠☞ *${prefix}sgifwm*
╠☞ *${prefix}takestick*
╠☞ *${prefix}emot*
║
╠══★〘 FUN 〙★══
║
╠☞ *${prefix}simi*
╠☞ *${prefix}hilih*
╠☞ *${prefix}balikhuruf*
╠☞ *${prefix}hitunghuruf*
║
╠══★〘 SPAMMER 〙★══
║
╠☞ *${prefix}email*
╠☞ *${prefix}call*
║
║══★〘 VIDE FIKRI BOT 〙★══
`
}
