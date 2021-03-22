/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
const { decryptMedia, vf } = require('@open-wa/wa-automate')
const { color, msgFilter, processTime, isUrl} = require('./function')
const { register } = require('./data/')
const { msg } = require('./msg')
const { downloader, stalker, fun, spammer, education } = require('./lib')
const config = require('./config.json')
const axios = require('axios')
const fs = require('fs-extra')
const fetch = require('node-fetch')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

// eslint-disable-next-line no-undef
         /*=_=_=_=_=_=_=_=_=_=_=_=_=_ MESSAGE HANDLER =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=*/
module.exports = videfikri = async (vf = new vf(), message) => {
    try {
        const { from, id, type, caption, chat, t, sender, isGroupMsg, isMedia, mimetype, quotedMsg } = message
        let { body } = message
        const { owner } = config
        const { name, formattedTitle } = chat
        let { pushname, formattedName, verifiedName } = sender
        pushname = pushname || formattedName || verifiedName
        
        const bcmd = caption || body || ''
        const command = bcmd.toLowerCase().split(' ')[0] || ''
        const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/gi) : '-'
        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const args = body.trim().split(/ +/).slice(1)
        const ar = args.map((v) => v.toLowerCase())
        const query = args.join(' ')
        const url = args.length !== 0 ? args[0] : ''
        const now = moment(t * 1000).format('DD/MM/YYYY HH:mm:ss')
        const uaOverride = config.uaOverride
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        /*=_=_=_=_=_=_=_=_=_=_=_=_=_ END OF MESSAGE HANDLER =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=*/

        /*=_=_=_=_=_=_=_=_=_=_=_=_=_ DATABASES =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=*/
        const _registered = JSON.parse(fs.readFileSync('./database/registered.json'))
        const _antilink = JSON.parse(fs.readFileSync('./database//antilink.json'))
        const _antivirtext = JSON.parse(fs.readFileSync('./database/antivirtext.json'))
        /*=_=_=_=_=_=_=_=_=_=_=_=_=_ END OF DATABASES =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=*/

        /*=_=_=_=_=_=_=_=_=_=_=_=_=_ VALIDATOR =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=*/
        const botNumber = await vf.getHostNumber() + '@c.us'
        const groupAdmins = isGroupMsg ? await vf.getGroupAdmins(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isCmd = body.startsWith(prefix)
        const isOwner = sender.id === owner
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
        const isImage = type === 'image'
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isDetectorOn = isGroupMsg ? _antilink.includes(chat.id) : false
        const isAntiVirtextOn = isGroupMsg ? _antivirtext.includes(chat.id) : false
        /*=_=_=_=_=_=_=_=_=_=_=_=_=_ END OF VALIDATOR =_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=*/

        //ANTI-GROUP LINK DETECTOR
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                console.log(color('[KICK]', 'red'), color('Anti Group-Link detector.', 'aqua'))
                await vf.reply(from, msg.linkDetected(), id)
                await vf.removeParticipant(groupId, sender.id)
            }
        }

        // ANTI-VIRTEXT
        if (isGroupMsg && isBotGroupAdmins && !isOwner) {
        if (chats.length > 5000) {
            await vf.sendTextWithMentions(from, `Terdeteksi @${sender.id} telah mengirim Virtext\nAkan dikeluarkan dari group!`)
            await vf.removeParticipant(groupId, sender.id)
        }
    }

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
            case prefix+'register': //By: Slavyam
                if (isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                const namaUser = query.substring(0, query.indexOf('|') - 1)
                const umurUser = query.substring(query.lastIndexOf('|') + 2)
                const serialUser = register.createSerial(10)
                register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
                await vf.reply(from, `*「 REGISTRATION 」*\n\nRegistrasi berhasil!\n\n=======================\n➸ *Nama*: ${namaUser}\n➸ *Umur*: ${umurUser}\n➸ *Waktu pendaftaran*: ${now}\n➸ *Serial*: ${serialUser}\n=======================`, id)
            break
            case prefix+'antiporn'://PREMIUM
                await vf.reply(from, 'Premium feature!\nContact: wa.me/6285692655520', id)
            break
            /* RANDOM WORDS */
            case prefix+'fakta':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                const datafakta = await axios.get(`https://videfikri.com/api/fakta/`)
                const fakta = datafakta.data.result
                await vf.reply(from, `${fakta.fakta}`, id)
            break
            case prefix+'quotes':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                const dataquotes = await axios.get(`https://videfikri.com/api/randomquotes/`)
                const quotes = dataquotes.data.result
                await vf.reply(from, `➸ *Author*: ${quotes.author}\n➸ *Quotes*: ${quotes.quotes}`, id)
            break
            /* STICKER MAKER */
            case prefix+'takestick':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                    if (quotedMsg && quotedMsg.type == 'sticker') {
                        if (!query.includes('|')) return await vf.reply(from, `Untuk mengubah watermark sticker, reply sticker dengan caption ${prefix}takestick package_name | author_name\n\nContoh: ${prefix}takestick PUNYA GUA | videfikri`, id)
                        await vf.reply(from, msg.wait(), id)
                        const packnames = query.substring(0, query.indexOf('|') - 1)
                        const authors = query.substring(query.lastIndexOf('|') + 2)
                        const mediaData = await decryptMedia(quotedMsg)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await vf.sendImageAsSticker(from, imageBase64, { author: `${authors}`, pack: `${packnames}` })
                        .catch(async (err) => {
                            console.error(err)
                            await vf.reply(from, 'Error!', id)
                        })
                    } else {
                        await vf.reply(from, `Reply sticker yang ingin dicolong dengan caption ${prefix}takestick package_name | author_name\n\nContoh: ${prefix}takestick punya gua | videfikri`, id)
                    }
        break
            case prefix+'sgifwm':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                    if (!query.includes('|')) return await vf.reply(from, `Untuk membuat stickergif watermark\ngunakan ${prefix}sgifwm author | packname`, id)
                    const namaPacksgif = query.substring(0, query.indexOf('|') - 1)
                    const authorPacksgif = query.substring(query.lastIndexOf('|') + 2)
                    await vf.reply(from, msg.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await vf.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:06.0`, loop: 0 }, { author: `${authorPacksgif}`, pack: `${namaPacksgif}`, keepScale: true })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                
                            })
                    } catch (err) {
                        console.error(err)
                        await vf.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
                    }
                } else if (isQuotedGif || isQuotedVideo) {
                    const namaPacksgif = query.substring(0, query.indexOf('|') - 1)
                    const authorPacksgif = query.substring(query.lastIndexOf('|') + 2)
                    await vf.reply(from, msg.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await vf.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:06.0`, loop: 0 }, { author: `${authorPacksgif}`, pack: `${namaPacksgif}`, crop: false })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                
                            })
                    } catch (err) {
                        console.error(err)
                        await vf.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
                    }
                } else {
                    await vf.reply(from, `Untuk membuat stickergif dengan watermark\ngunakan ${prefix}sgifwm author | packname`, id)
                }
            break
            case prefix+'stickernocrop':
            case prefix+'stnc':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && isImage || isQuotedImage) {
                    try {
                    await vf.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await vf.sendImageAsSticker(from, imageBase64, { keepScale: true, author: 'videfikri', pack: 'VF BOT' })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            } else {
                await vf.reply(from, `Untuk membuat sticker no crop\nsilahkan *upload* atau reply foto dengan caption ${prefix}stnc`, id)
            }
            break
            case prefix+'sticker':
            case prefix+'stiker':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && isImage || isQuotedImage) {
                    try {
                    await vf.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await vf.sendImageAsSticker(from, imageBase64, { author: 'videfikri', pack: 'VF BOT' })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            } else {
                await vf.reply(from, `Untuk membuat sticker\nsilahkan *upload* atau reply foto dengan caption ${prefix}sticker`, id)
            }
            break
            case prefix+'stickergif':
            case prefix+'stikergif':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                    await vf.reply(from, msg.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await vf.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:06.0`, loop: 0 }, { author: 'VF BOT', pack: 'videfikri' })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                
                            })
                    } catch (err) {
                        console.error(err)
                        await vf.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
                    }
                } else if (isQuotedGif || isQuotedVideo) {
                    await vf.reply(from, msg.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await vf.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:06.0`, loop: 0 }, { author: 'VF BOT', pack: 'videfikri' })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                
                            })
                    } catch (err) {
                        console.error(err)
                        await vf.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
                    }
                } else {
                    await vf.reply(from, `Untuk mengconvert GIF/Video menjadi stikergif silahkan upload video/gif dengan caption ${prefix}stikergif`, id)
                }
            break
            /* END OF STICKER MAKER */

            /* DOWNLOADER */
            case prefix+'igdl':
            case prefix+'ig':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk mendownload Instagram Post seseorang\ngunakan ${prefix}igdl link_post`, id)
                if (!isUrl(url) && !url.includes('instagram.com')) return await vf.reply(from, 'Perhatikan! URL harus dari instagram', id)
                await vf.reply(from, msg.wait(), id)
                    downloader.insta(query)
                    .then(async ({ result }) => {
                        if (result.type_post == 'video') {
                            const { full_name, username, caption, like, comment, thumb, video, duration } = await result
                            await vf.sendFileFromUrl(from, video, 'igdlVFBOT.mp4', `➸ *Username*: ${username}\n➸ *Full Name*: ${full_name}\n➸ *Caption*: ${caption}\n➸ *Likes*: ${like}\n➸ *Comment*: ${comment}\n➸ *Duration*: ${duration}\n\n➸ *URL THUMB*: ${thumb}`, id)
                        } else if (result.type_post == 'image') {
                            const { fullname, username, img_url, height_width, caption, comment, likes, image_text } = await result
                            await vf.sendFileFromUrl(from, img_url, 'igDlVFBOT.jpg', `➸ *Username*: ${username}\n➸ *Full Name*: ${fullname}\n➸ *Height Width*: ${height_width}\n➸ *Caption*: ${caption}\n➸ *Comment*: ${comment}\n➸ *Likes*: ${likes}\n➸ *Image Prediction*: ${image_text}`, id)
                        }
                        console.log('Success sending Instagram media!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await vf.reply(from, `Ada yang Error!`, id)
                    })
            break
            case prefix+'play':
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
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
                break
                case prefix+'igtv':
                    if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                    if (!query) return await vf.reply(from, `Format salah!\nuntuk mendownload Instagram TV\ngunakan ${prefix}igtv link_igtv`, id)
                    if (!isUrl(url) && !url.includes('instagram.com')) return await vf.reply(from, 'Perhatikan! URL harus dari instagram', id)
                    await vf.reply(from, msg.wait(), id)
                    downloader.igtv(query)
                    .then(async ({result}) => {
                        const { username, thumb, full_name, video_url, duration, caption, comment, likes } = await result
                        await vf.sendFileFromUrl(from, thumb, 'thumbnail.jpg', `➸ *Username*: ${username}\n➸ *Full Name*: ${full_name}\n➸ *Duration*: ${duration}\n➸ *Caption*: ${caption}\n➸ *Comment*: ${comment}\n➸ *Likes*: ${likes}`, id)
                        await vf.sendFileFromUrl(from, video_url, 'igtv.mp4', '', id)
                    }) 
                    .catch(async (err) => {
                        console.error(err)
                        await vf.reply(from, 'Error!', id)
                    })
                break
                case prefix+'ytmp3':
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
                    .catch(async (err) => {
                        console.error(err)
                        await vf.reply(from, 'Error!', id)
                    })
                break
                case prefix+'ytmp4':
                    if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                    if (!query) return await vf.reply(from, `Format salah!\nuntuk mendownload YouTube to MP4\ngunakan ${prefix}ytmp4 link_video`, id)
                    await vf.reply(from, msg.wait(), id)
                    downloader.ytmp4(query)
                    .then(async ({result}) => {
                        const { judul, id, source, imgUrl, urlVideo } = await result
                        await vf.sendFileFromUrl(from, imgUrl, 'thumbnail.jpg', `➸ *Judul*: ${judul}\n➸ *ID*: ${id}\n➸ *Source*: ${source}\n\nSedang dikirim, sabar ya...`, id)
                        await vf.sendFileFromUrl(from, urlVideo, 'ytmp3.mp3', '', id)
                    }) 
                    .catch(async (err) => {
                        console.error(err)
                        await vf.reply(from, 'Error!', id)
                    })
                break
                /* END OF DOWNLOADER */

                /* STALKER */
                case prefix+'igstalk':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\nuntuk meng-stalk akun Instagram seseorang, gunakan ${prefix}stalkig username\n\nContoh: ${prefix}stalkig videfikri`, id)
                await vf.reply(from, msg.wait(), id)
                stalker.instagram(query)
                .then(async ({result}) => {
                    const { full_name, username, bio, followers, following, post_count, profile_hd, is_verified, is_private, external_url, fbid, show_suggested_profile } = await result
                    await vf.sendFileFromUrl(from, profile_hd, 'ProfileIgStalker.jpg', `➸ *Username*: ${username}\n *Full Name*: ${full_name}\n➸ *Biography*: ${bio}\n➸ *Followers*: ${followers}\n➸ *Following*: ${following}\n➸ *Post*: ${post_count}\n➸ *Is_Verified*: ${is_verified}\n➸ *Is_Private*: ${is_private}\n➸ *External URL*: ${external_url}\n➸ *FB ID*: ${fbid}\n➸ *Show Suggestion*: ${show_suggested_profile}`, id)
                }) 
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'twtprof':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\nuntuk meng-stalk akun Twitter seseorang\ngunakan ${prefix}twtprof username`, id)
                await vf.reply(from, msg.wait(), id)
                stalker.twitter(query)
                .then(async ({result}) => {
                    const { full_name, username, followers, following, tweets, profile, verified, listed_count, favourites, joined_on, profile_banner } = await result
                    await vf.sendFileFromUrl(from, profile, 'ProfileTwitter.jpg', `➸ *Username*: ${username}\n *Full Name*: ${full_name}\n➸ *Followers*: ${followers}\n➸ *Following*: ${following}\n➸ *Tweet*: ${tweets}\n➸ *Is_Verified*: ${verified}\n➸ *Favourites*: ${favourites}\n➸ *Listed Count*: ${listed_count}\n➸ *Joined On*: ${joined_on}\n➸ *Profile Banner*: ${profile_banner}`, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'github':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\nuntuk meng-stalk akun Github\ngunakan ${prefix}github username`, id)
                await vf.reply(from, msg.wait(), id)
                stalker.github(query)
                .then(async ({result}) => {
                    const { username, id, profile_pic, fullname, company, blog, location, email, hireable, biografi, public_repository, public_gists, followers, following, joined_on, last_updated, profile_url} = await result
                    await vf.sendFileFromUrl(from, profile_pic, 'ProfileGithub.jpg', `➸ *Username*: ${username}\n➸ *Full Name*: ${fullname}\n➸ *ID*: ${id}\n➸ *Company*: ${company}\n➸ *Blog*: ${blog}\n➸ *Location*: ${location}\n➸ *Email*: ${email}\n➸ *Hireable*: ${hireable}\n➸ *Biography*: ${biografi}\n➸ *Public Repository*: ${public_repository}\n➸ *Public Gists*: ${public_gists}\n➸ *Followers*: ${followers}\n➸ *Following*: ${following}\n➸ *Joined On*: ${joined_on}\n➸ *Last Updated*: ${last_updated}\n➸ *Profile URL*: ${profile_url}`, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            /* END OF STALKER */

            /* FUN MENU */
            case prefix+'simi':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Gunakan ${prefix}simi teks`, id)
                fun.simsimi(query)
                .then(async ({result}) => {
                    await vf.reply(from, result.jawaban, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'balikhuruf':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk membalik huruf\ngunakan ${prefix}balikhuruf teks`, id)
                fun.balikhuruf(query)
                .then(async ({result}) => {
                    await vf.reply(from, result.kata, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'hitunghuruf':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk menghitung jumlah huruf\ngunakan ${prefix}hitunghuruf teks`, id)
                fun.hitunghuruf(query)
                .then(async ({result}) => {
                    await vf.reply(from, result.jumlah, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'hilih':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk membuat hilih teks\ngunakan ${prefix}hilih teks\n\nContoh: ${prefix}hilih halah bacot`, id)
                fun.hilihteks(query)
                .then(async ({result}) => {
                    await vf.reply(from, result.kata, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            /* END OF FUN MENU */
            
            /* SPAMMER */
            case prefix+'email':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query.includes('|')) return await vf.reply(from, `Untuk mengirim email kepada seseorang\ngunakan ${prefix}email target | subjek | pesan`, id)
                const target = query.substring(0, query.indexOf('|') - 1)
                const subjek = query.substring(query.indexOf('|') + 2, query.lastIndexOf('|') - 1)
                const pesan = query.substring(query.lastIndexOf('|') + 2)
                spammer.email(target, subjek, pesan)
                .then(async ({result}) => {
                    await vf.reply(from, result.log_lengkap, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'call':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk mengirim panggilan kepada seseorang\ngunakan ${prefix}call nomor_telpon`, id)
                spammer.call(query)
                .then(async ({result}) => {
                    await vf.reply(from, result.logs, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            /* END OF SPAMMER */

            /* EDUCATION */
            case prefix+'kisahnabi':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk mencari kisah nabi\ngunakan ${prefix}kisahnabi query\n\nContoh: ${prefix}kisahnabi muhammad`, id)
                await vf.reply(from, msg.wait(), id)
                education.kisahnabi(query)
                .then(async ({result}) => {
                    const { nama, tahun_kelahiran, usia, tempat_lahir, image, description } = await result
                    await vf.sendFileFromUrl(from, image, 'kisahnabi.jpg', `➸ *Nama*: ${nama}\n➸ *Tahun Kelahiran*: ${tahun_kelahiran}\n➸ *Usia*: ${usia}\n➸ *Tempat Lahir*: ${tempat_lahir}\n➸ *Deskripsi*: ${description}`, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'randomquran':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                await vf.reply(from, msg.wait(), id)
                education.quran()
                .then(async ({result}) => {
                    const { nomor, nama, asma, ayat, name, tipe, no_urut, rukuk, arti, keterangan } = await result
                    await vf.reply(from, `➸ *Nomor*: ${nomor}\n➸ *Nama*: ${nama}\n➸ *Asma*: ${asma}\n➸ *Ayat*: ${ayat}\n➸ *Name*: ${name}\n➸ *Tipe*: ${tipe}\n➸ *No Urut*: ${no_urut}\n➸ *Rukuk*: ${rukuk}\n➸ *Arti*: ${arti}\n➸ *Keterangan*: ${keterangan}`, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'covidindo':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                await vf.reply(from, msg.wait(), id)
                education.covidindo()
                .then(async ({result}) => {
                    await vf.reply(from, `➸ *Negara*: ${result.country}\n➸ *Positif*: ${result.positif}\n➸ *Negatif*: ${result.negatif}\n➸ *Meninggal*: ${result.meinggal}\n➸ *Sembuh*: ${result.sembuh}\n➸ *Dalam Perawatan*: ${result.dalam_perawatan}`, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'kbbi':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk mencari kata KBBI\ngunakan ${prefix}kbbi query\n\nContoh: ${prefix}kbbi manusia`, id)
                await vf.reply(from, msg.wait(), id)
                education.kbbi(query)
                .then(async ({result}) => {
                    await vf.reply(from, `➸ ${result.hasil}`, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'wiki':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk mencari Wikipedia\ngunakan ${prefix}wiki query\n\nContoh: ${prefix}wiki indonesia`, id)
                await vf.reply(from, msg.wait(), id)
                education.wikipedia(query)
                .then(async ({result}) => {
                    await vf.reply(from, `➸ *Judul*: ${result.judul}\n➸ *PageID*: ${result.pageid}\n➸ *Isi Konten*: ${result.isi_konten}`, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            case prefix+'wikien':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk mencari Wikipedia bahasa inggris\ngunakan ${prefix}wikien query\n\nContoh: ${prefix}wikien indonesia`, id)
                await vf.reply(from, msg.wait(), id)
                education.wikipediaen(query)
                .then(async ({result}) => {
                    await vf.reply(from, `➸ *Title*: ${result.judul}\n➸ *PageID*: ${result.pageid}\n➸ *Content*: ${result.desc}`, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                })
            break
            /* END OF EDUCATION */

            /* MODERATIOR CMDS */
            case prefix+'antilink':
                if (!isGroupMsg) return await vf.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await vf.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return await vf.reply(from, msg.botNotAdmin(), id)
                if (ar[0] === 'on') {
                    if (isDetectorOn) return await vf.reply(from, `Gagal, Anti group-link sudah pernah di nyalakan sebelumnya`, id)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/antilink.json', JSON.stringify(_antilink))
                    await vf.reply(from, `*...:* *ANTI GROUP LINK*\n\nPerhatian untuk member grup ${(name || formattedTitle)}\nGroup ini telah dipasang anti-link, jika anda mengirim link group lain, maka akan otomatis terkick!`, id)
                } else if (ar[0] === 'off') {
                    _antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/antilink.json', JSON.stringify(_antilink))
                    await vf.reply(from, `Berhasil menonaktifkan anti-link`, id)
                } else {
                    await vf.reply(from, `Untuk melindungi grup ini dari link grup lain\nketik ${prefix}antilink on --enable\n${prefix}antilink off --disable`, id)
                }
            break
            case prefix+'antivirtext':
                if (!isGroupMsg) return await vf.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await vf.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return await vf.reply(from, msg.botNotAdmin(), id)
                if (ar[0] === 'on') {
                    if (isAntiVirtextOn) return await vf.reply(from, `Gagal, Anti Virtext sudah pernah dinyalakan sebelumnya`, id)
                    _antivirtext.push(groupId)
                    fs.writeFileSync('./database/antivirtext.json', JSON.stringify(_antivirtext))
                    await vf.reply(from, `*...:* *ANTI VIRTEXT*\n\nPerhatian untuk member grup ${(name || formattedTitle)}\nGroup ini telah dipasang anti virtext, jika anda mengirim virtext, maka akan otomatis terkick!`, id)
                } else if (ar[0] === 'off') {
                    _antivirtext.splice(groupId, 1)
                    fs.writeFileSync('./database/antivirtext.json', JSON.stringify(_antivirtext))
                    await vf.reply(from, `Berhasil menonaktifkan anti-virtext`, id)
                } else {
                    await vf.reply(from, `Untuk melindungi grup ini dari virtext\nketik ${prefix}antivirtext on --enable\n${prefix}antivirtext off --disable`, id)
                }
            break
            /* END OF MODERATION CMDS */

            /* MUSIC */
            case prefix+'chord':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\nuntuk mencari chord sebuah lagu\nketik ${prefix}chord judul_lagu`, id)
                try {
                await vf.reply(from, msg.wait(), id)
                const chord = await axios.get(`https://videfikri.com/api/chord/?query=${query}`)
                const datachord = chord.data.result
                await vf.reply(from, `➸ *Title*: ${datachord.title}\n➸ *Chord*: ${datachord.chord}`, id)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            break
            case prefix+'lirik':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\nuntuk mencari lirik sebuah lagu\nketik ${prefix}lirik judul_lagu`, id)
                try {
                await vf.reply(from, msg.wait(), id)
                const lirik = await axios.get(`https://videfikri.com/api/liriklagu/?query=${query}`)
                const datalirik = lirik.data.result
                await vf.reply(from, `➸ *Title*: ${datalirik.title}\n➸ *Artist*: ${datalirik.artist}\n➸ *Lirik*: ${datalirik.lirik}`, id)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            break
            /* END OF MUSIC */

            /* ANIME */
            case prefix+'nekonime':
            case prefix+'neko':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                try {
                await vf.reply(from, msg.wait(), id)
                const nekonime = await axios.get(`https://videfikri.com/api/anime/neko`)
                const datanekonime = nekonime.data.result
                await vf.sendFileFromUrl(from, datanekonime.url_gbr, 'neko.jpg', '', id)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            break
            case prefix+'animequote':
            case prefix+'animequotes':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
            try {
                await vf.reply(from, msg.wait(), id)
                const quoteanime = await axios.get(`https://videfikri.com/api/anime/randomquoteanime`)
                const dataquoteanime = quoteanime.data.result
                await vf.reply(from, `➸ *Anime*: ${dataquoteanime.anime}\n➸ *Character*: ${dataquoteanime.character}\n➸ *Quotes*: ${dataquoteanime.quotes}`, id)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            break

            /* OTHERS */
            case prefix+'ip':
            case prefix+'iplookup':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk melihat rincian IP Address\ngunakan ${prefix}ip ip_address`, id)
                try {
                    await vf.reply(from, msg.wait(), id)
                    const dataip = await axios.get(`https://videfikri.com/api/iplookup/?ip=${query}`)
                    const iplookup = dataip.data.result
                    await vf.reply(from, `➸ *IP*: ${iplookup.ip}\n➸ *Country*: ${iplookup.country}\n➸ *Country Code*: ${iplookup.country_code}\n➸ *Region*: ${iplookup.region}\n➸ *Region Name*: ${iplookup.region_name}\n➸ *City*: ${iplookup.city}\n➸ *ZIP*: ${iplookup.zip}\n➸ *Latitude*: ${iplookup.latitude}\n➸ *Longtitude*: ${iplookup.longtitude}\n➸ *Timezone*: ${iplookup.timezone}\n➸ *ISP*: ${iplookup.isp}\n➸ *ORG*: ${iplookup.org}\n➸ *AS*: ${iplookup.as}`, id)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            break
            case prefix+'npm':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\ngunakan ${prefix}npm package_name`, id)
                try {
                    await vf.reply(from, msg.wait(), id)
                    const datanpm = await axios.get(`https://videfikri.com/api/npm/?query=${query}`)
                    const npm = datanpm.data.result
                    await vf.reply(from, `➸ *ID*: ${npm.id}\n➸ *Package Name*: ${npm.name}\n➸ *REV*: ${npm.rev}\n➸ *Version Latest*: ${npm.version_latest}\n➸ *Description*: ${npm.description}\n➸ *Homepage*: ${npm.homepage}\n➸ *Author Name*: ${npm.author_name}\n➸ *License*: ${npm.license}\n➸ *Maintainer*: ${npm.maintainer}\n➸ *Email*: ${npm.email}\n➸ *Created At*: ${npm.created_at}\n➸ *Last Modified*: ${npm.last_modified}`, id)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            break
            case prefix+'emot':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Format salah!\nuntuk convert emoji to sticker\ngunakan ${prefix}emot emoji_nya`, id)
                try {
                await vf.reply(from, msg.wait(), id)
                const emoji = emojiUnicode(query)
                await vf.sendImageAsSticker(from, await vf.download(`https://videfikri.com/api/emojitopng/?emojicode=${emoji}`), { author: 'videfikri', pack: 'VF BOT' })
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            break
            case prefix+'kodepos':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk mencari kodepos wilayah\ngunakan ${prefix}kodepos nama_wilayah`, id)
                try {
                await vf.reply(from, msg.wait(), id)
                const kodepos = await axios.get(`https://videfikri.com/api/kodepos/?query=${query}`)
                const datakodepos = kodepos.data.result
                await vf.reply(from, `➸ *Provinsi*: ${datakodepos.provinsi}\n➸ *Kota*: ${datakodepos.kota}\n➸ *Kecamatan*: ${datakodepos.kecamatan}\n➸ *Kelurahan*: ${datakodepos.kelurahan}\n➸ *Kode Pos*: ${datakodepos.kodepos}`, id)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            break
            case prefix+'nulis':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk membuat bot menulis di buku\ngunakan ${prefix}nulis\n\nContoh: ${prefix}nulis pikri gans bet`, id)
                try {
                await vf.reply(from, msg.wait(), id)
                const nulis = await axios.get(`https://videfikri.com/api/nulis/?query=${query}`)
                const datanulis = nulis.data.result
                await vf.sendFileFromUrl(from, datanulis.image, `nulisVFBOT.jpg`, '', id)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            break
            case prefix+'filmapik':
                if (!isRegistered) return await vf.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await vf.reply(from, `Untuk mencari detail Film dari FilmApik\ngunakan ${prefix}filmapik query\n\nContoh: ${prefix}filmapik avenger`, id)
                try {
                await vf.reply(from, msg.wait(), id)
                const filmapik = await axios.get(`https://videfikri.com/api/filmapik/?film=${query}`)
                const datafilmapik = filmapik.data.result
                await vf.sendFileFromUrl(from, datafilmapik.thumbnail, `FilmApikVFBOT.jpg`, `➸ *Title*: ${datafilmapik.title}\n➸ *ID*: ${datafilmapik.id}\n➸ *Thumbnail*: ${datafilmapik.thumbnail}\n➸ *Rating*: ${datafilmapik.rating}\n➸ *Views*: ${datafilmapik.views}\n➸ *Duration*: ${datafilmapik.duration}\n➸ *Release Date*: ${datafilmapik.release_date}\n➸ *Download URL*: ${datafilmapik.download_url}\n➸ *Description*: ${datafilmapik.description}`, id)
                } catch (err) {
                    console.error(err)
                    await vf.reply(from, 'Error!', id)
                }
            break
            /* END OF OTHERS */

            case prefix+'menuadmin':
                if (isGroupMsg && isGroupAdmins) {
                await vf.reply(from, msg.menuAdmin(), id)
                }
            break
            case prefix+'menu':
            case prefix+'help':
                await vf.reply(from, msg.menu(pushname), id)
                .then(() => ((isGroupMsg) && (isGroupAdmins)) ? vf.sendText(from, `Menu Admin Grup: *${prefix}menuadmin*`) : null)
            break
            default:
                if (isCmd) {
                    await vf.reply(from, `Maaf ${pushname}!\nCommand *${command}* tidak ada dalam daftar *${prefix}menu*`, id)
                }
        }
    } catch (err) {
        console.error(err)
    }
}
