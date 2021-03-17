const { create } = require('@open-wa/wa-automate')
const { color, options } = require('./function')
//const fs = require('fs-extra')
const videfikri = require('./videfikri.js')
const config = require('./config.json')
const ownerNumber = config.owner

const start = async (vf = new vf()) => {
    console.log(color(figlet.textSync('vfbot-wa', '3D Diagonal'), 'magenta'))
    console.log(color('[VF BOT]', 'magenta'), color('VF BOT is now online!', 'aqua'))
    
    vf.onStateChanged((state) => {
        console.log(color('-> [STATE]'), state)
        if (state === 'CONFLICT') vf.forceRefocus()
        if (state === 'UNPAIRED') vf.forceRefocus()
    })

    vf.onAddedToGroup(async (chat) => {
        await vf.sendText(chat.groupMetadata.id, 'Maaf, bot ini tidak tersedia untuk grup!')
        await vf.leaveGroup(chat.groupMetada.id)
    })

    vf.onMessage((message) => {
        videfikri(vf, message)
    })

    vf.onIncomingCall(async (call) => {
        await vf.sendText(call.peerJid, `Kamu telah menelpon BOT\nMaaf kamu akan diblockir!\nChat owner: wa.me/${ownerNumber} agar dibuka blok-nya!`)
        await vf.contactBlock(call.peerJid)
            .then(() => console.log(`Seseorang menelpon BOT, dan telah diblokir. ID: ${call.peerJid}`))
    })
}
create(options(start))
    .then((vf) => start(vf))
    .catch((err) => console.error(err))
