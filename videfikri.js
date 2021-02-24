/* eslint-disable no-case-declarations */
const { vf } = require('@open-wa/wa-automate')
const { color, msgFilter, processTime, isUrl} = require('./function')
const { register } = require('./data')
const { msg } = require('./msg')
const { downloader, stalker, fun } = require('./lib')
const config = require('./config.json')
const fs = require('fs-extra')
const fetch = require('node-fetch')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

// eslint-disable-next-line no-undef
         /*=_=_=_=_=_=_=_=_=_=_=_=_=_ MESSAGE HANDLER =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=*/
module.exports = handler = async (vf = new vf(), message) => {
    try {
        const { from, id, type, caption, chat, t, sender, isGroupMsg } = message
        let { body } = message
        const { owner, prefix } = config
        const { name, formattedTitle } = chat
        let { pushname, formattedName, verifiedName } = sender
        pushname = pushname || formattedName || verifiedName
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const query = args.join(' ')
        const url = args.length !== 0 ? args[0] : ''
        const now = moment(t * 1000).format('DD/MM/YYYY HH:mm:ss')
        /*=_=_=_=_=_=_=_=_=_=_=_=_=_ END OF MESSAGE HANDLER =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=*/

        /*=_=_=_=_=_=_=_=_=_=_=_=_=_ VALIDATOR =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=*/
        const _registered = JSON.parse(fs.readFileSync('./database/registered.json'))
        const ownerBot = config.owner
        const isCmd = body.startsWith(prefix)
        const isOwner = sender.id === owner
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
        /*=_=_=_=_=_=_=_=_=_=_=_=_=_ END OF VALIDATOR =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=*/

        // Anti-spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Log
        if (isCmd && !isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            await vf.sendSeen(from)
        }
        if (isCmd && isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
            await vf.sendSeen(from)
        }

        switch (command) {
            case 'register': //By: Slavyam
                if (isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query.includes('|') return await vf.reply(from, `Format salah!\ngunakan ${prefix}register Nama | umur`, id)
                const namaUser = query.substring(0, query.indexOf('|') - 1)
                const umurUser = query.substring(query.lastIndexOf('|') + 2)
                const serialUser = register.createSerial(10)
                register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
                await vf.reply(from, `*「 REGISTRATION 」*\n\nRegistrasi berhasil!\n\n=======================\n➸ *Nama*: ${namaUser}\n➸ *Umur*: ${umurUser}\n➸ *Waktu pendaftaran*: ${now}\n➸ *Serial*: ${serialUser}\n=======================`, id)
            break
            /*DOWNLOADER*/
            case 'play':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk memutar musik dari YouTube\ngunakan ${prefix}play judul_lagu\n\nContoh: ${prefix}play martin garrix`, id)
                await vf.reply(from, msg.wait(), id)
                downloader.ytPlay(query)
                .then(async ({result}) => {
                    const { title, channel, duration, id, thumbnail, views, size, url, description, published_on } = await result
                    if (Number(size.split('MB')[0]) >= 20.00) {
                        await vf.sendFileFromUrl(from, thumbnail, 'thumbnail.jpg', `➸ *Judul*: ${title}\n➸ *ID*: ${id}\n➸ *Size*: ${size}\n\nGagal, maksimal size adalah *20MB*!\nSilahkan download sendiri melalui URL dibawah:\n${url}`, id)
                    } else {
                        await vf.sendFileFromUrl(from, thumbnail, 'thumbnail.jpg', `➸ *Judul*: ${title}\n➸ *Channel*: ${channel}\n➸ *ID*: ${id}\n➸ *Views*: ${views}\n➸ *Duration*: ${duration}\n➸ *Size*: ${size}\n➸ *Published On*: ${published_on}\n➸ *Description*: ${description}`, id)
                        const downl = await fetch(url);
                        const buffer = await downl.buffer(); 
                        await fs.writeFile(`./temp/audio/${sender.id}.mp3`, buffer)
                        await vf.sendFile(from, `./temp/audio/${sender.id}.mp3`, 'audio.mp3', '', id)
                        console.log('Success sending Play MP3!')
                        fs.unlinkSync(`./temp/audio/${sender.id}.mp3`)
                    }
                })
                break
                case 'igtv':
                    if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                    if (!query) return await vf.reply(from, `Format salah!\nuntuk mendownload Instagram TV\ngunakan ${prefix}igtv link_igtv`, id)
                    await vf.reply(from, msg.wait(), id)
                    downloader.igtv(query)
                    .then(async ({result}) => {
                        const { username, thumb, full_name, video_url, duration, caption, comment, likes } = await result
                        await vf.sendFileFromUrl(from, thumb, 'thumbnail.jpg', `➸ *Username*: ${username}\n➸ *Full Name*: ${full_name}\n➸ *Duration*: ${duration}\n➸ *Caption*: ${caption}\n➸ *Comment*: ${comment}\n➸ *Likes*: ${likes}`, id)
                        await vf.sendFileFromUrl(from, video_url, 'igtv.mp4', '', id)
                    })
                break
                case 'ytmp3':
                    if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                    if (!query) return await vf.reply(from, `Format salah!\nuntuk mendownload YouTube to MP3\ngunakan ${prefix}ytmp3 link_video`, id)
                    await vf.reply(from, msg.wait(), id)
                    downloader.ytmp3(query)
                    .then(async ({result}) => {
                        const { judul, size, thumbnail, id, url, extension, source } = await result
                        if (Number(size.split(' MB')[0]) >= 20.00) {
                            await vf.sendFileFromUrl(from, thumbnail, 'thumbnail.jpg', `➸ *Judul*: ${judul}\n➸ *ID*: ${id}\n➸ *Size*: ${size}\n\nGagal, maksimal size adalah *20MB*!\nSilahkan download sendiri melalui URL dibawah:\n${url}`, id)
                        } else {
                        await vf.sendFileFromUrl(from, thumbnail, 'thumbnail.jpg', `➸ *Judul*: ${judul}\n➸ *Size*: ${size}\n➸ *ID*: ${id}\n➸ *Extensiom*: ${extension}\n➸ *Source*: ${source}\n\nSedang dikirim, sabar ya...`, id)
                        await vf.sendFileFromUrl(from, url, 'ytmp3.mp3', '', id)
                        }
                    })
                break
                case 'ytmp4':
                    if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                    if (!query) return await vf.reply(from, `Format salah!\nuntuk mendownload YouTube to MP4\ngunakan ${prefix}ytmp4 link_video`, id)
                    await vf.reply(from, msg.wait(), id)
                    downloader.ytmp4(query)
                    .then(async ({result}) => {
                        const { judul, id, source, imgUrl, urlVideo } = await result
                        await vf.sendFileFromUrl(from, imgUrl, 'thumbnail.jpg', `➸ *Judul*: ${judul}\n➸ *ID*: ${id}\n➸ *Source*: ${source}\n\nSedang dikirim, sabar ya...`, id)
                        await vf.sendFileFromUrl(from, urlVideo, 'ytmp3.mp3', '', id)
                    })
                break
                /*END OF DOWNLOADER*/

                /*STALKER*/
                case 'igstalk':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\nuntuk meng-stalk akun Instagram seseorang, gunakan ${prefix}stalkig username\n\nContoh: ${prefix}stalkig videfikri`, id)
                await vf.reply(from, msg.wait(), id)
                stalker.instagram(query)
                .then(async ({result}) => {
                    const { full_name, username, bio, followers, following, post_count, profile_hd, is_verified, is_private, external_url, fbid, show_suggested_profile } = await result
                    await vf.sendFileFromUrl(from, profile_hd, 'ProfileIgStalker.jpg', `➸ *Username*: ${username}\n *Full Name*: ${full_name}\n➸ *Biography*: ${bio}\n➸ *Followers*: ${followers}\n➸ *Following*: ${following}\n➸ *Post*: ${post_count}\n➸ *Is_Verified*: ${is_verified}\n➸ *Is_Private*: ${is_private}\n➸ *External URL*: ${external_url}\n➸ *FB ID*: ${fbid}\n➸ *Show Suggestion*: ${show_suggested_profile}`, id)
                })
            break
            case 'twtprof':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\nuntuk meng-stalk akun Twitter seseorang\ngunakan ${prefix}twtprof username`, id)
                await vf.reply(from, msg.wait(), id)
                stalker.twitter(query)
                .then(async ({result}) => {
                    const { full_name, username, followers, following, tweets, profile, verified, listed_count, favourites, joined_on, profile_banner } = await result
                    await vf.sendFileFromUrl(from, profile, 'ProfileTwitter.jpg', `➸ *Username*: ${username}\n *Full Name*: ${full_name}\n➸ *Followers*: ${followers}\n➸ *Following*: ${following}\n➸ *Tweet*: ${tweets}\n➸ *Is_Verified*: ${verified}\n➸ *Favourites*: ${favourites}\n➸ *Listed Count*: ${listed_count}\n➸ *Joined On*: ${joined_on}\n➸ *Profile Banner*: ${profile_banner}`, id)
                })
            break
            case 'github':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\nuntuk meng-stalk akun Github\ngunakan ${prefix}github username`, id)
                await vf.reply(from, msg.wait(), id)
                stalker.github(query)
                .then(async ({result}) => {
                    const { username, id, profile_pic, fullname, company, blog, location, email, hireable, biografi, public_repository, public_gists, followers, following, joined_on, last_updated, profile_url} = await result
                    await vf.sendFileFromUrl(from, profile_pic, 'ProfileGithub.jpg', `➸ *Username*: ${username}\n➸ *Full Name*: ${fullname}\n➸ *ID*: ${id}\n➸ *Company*: ${company}\n➸ *Blog*: ${blog}\n➸ *Location*: ${location}\n➸ *Email*: ${email}\n➸ *Hireable*: ${hireable}\n➸ *Biography*: ${biografi}\n➸ *Public Repository*: ${public_repository}\n➸ *Public Gists*: ${public_gists}\n➸ *Followers*: ${followers}\n➸ *Following*: ${following}\n➸ *Joined On*: ${joined_on}\n➸ *Last Updated*: ${last_updated}\n➸ *Profile URL*: ${profile_url}`, id)
                })
            break
            /*END OF STALKER*/
            /* FUN MENU*/
            case 'simi':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Gunakan ${prefix}simi teks`, id)
                fun.simsimi(query)
                .then(async ({result}) => {
                    await vf.reply(from, result.jawaban, id)
                })
            break
            /* END OF FUN MENU */
            /* OTHERS */
            case 'emot':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\nuntuk meng-stalk akun Github\ngunakan ${prefix}github username`, id)
                await vf.reply(from, msg.wait(), id)
                const emoji = emojiUnicode(query)
                await vf.sendStickerfromUrl(from, `https://videfikri.com/api/emojitopng/?emojicode=${emoji}`)
            break
            case 'menu':
            case 'help':
                await vf.reply(from, msg.menu(pushname), id)
            break
        }
    } catch (err) {
        console.error(err)
    }
}
