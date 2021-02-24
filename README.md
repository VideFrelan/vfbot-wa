<div align="center">
<img src="https://i.ibb.co/tPZZZdF/logo.png" alt="vfbot-wa" width="300" />

# VFBOT

>
>
>

<p align="center">
  <a href="https://github.com/VideFrelan"><img title="Author" src="https://img.shields.io/badge/Author-VideFrelan-red.svg?style=for-the-badge&logo=github" /></a>
</p>
<p align="center">
  <a href="https://github.com/VideFrelan/vfbot-wa"><img title="Stars" src="https://img.shields.io/github/stars/VideFrelan/vfbot-wa?color=red&style=flat-square" /></a>
  <a href="https://github.com/VideFrelan/vfbot-wa/network/members"><img title="Forks" src="https://img.shields.io/github/forks/VideFrelan/vfbot-wa?color=red&style=flat-square" /></a>
  <a href="https://github.com/VideFrelan/vfbot-wa/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/VideFrelan/vfbot-wa?label=watchers&color=blue&style=flat-square" /></a> <br>
  <a href="https://www.codefactor.io/repository/github/VideFrelan/vfbot-wa"><img src="https://www.codefactor.io/repository/github/VideFrelan/vfbot-wa/badge" /></a>
  <a href="https://www.npmjs.com/package/@open-wa/wa-automate"><img src="https://img.shields.io/npm/v/@open-wa/wa-automate.svg?color=green" /></a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FSlavyanDesu%2FBocchiBot?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FSlavyanDesu%2FBocchiBot.svg?type=shield"/></a>
  <img src="https://img.shields.io/node/v/@open-wa/wa-automate" />
  <img src="https://img.shields.io/badge/maintained%3F-yes-green.svg?style=flat" />
</p>
<p align="center">
  <a href="https://github.com/VideFrelan/vfbot-wa#requirements">Requirements</a> •
  <a href="https://github.com/VideFrelan/vfbot-wa#installation">Installation</a> •
  <a href="https://github.com/VideFrelan/vfbot-wa#features">Features</a> •
  <a href="https://github.com/VideFrelan/vfbot-wa#thanks-to">Thanks to</a>
</p>
</div>


---



# Requirements
* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)
* [FFmpeg](https://github.com/BtbN/FFmpeg-Builds/releases/download/autobuild-2020-12-08-13-03/ffmpeg-n4.3.1-26-gca55240b8c-win64-gpl-4.3.zip) (for sticker GIF command)
* Any text editor

# Instalasi
## 📝 Clone Repo & Instalasi dependenci
```bash
> git clone https://github.com/VideFrelan/vfbot-wa
> cd vfbot-wa
> npm install
```

## ✍️ Edit file
Edit file penting yg berada di 'config.json'
```json
{
    "owner": "62812xxxxxxxx@c.us", 
    "prefix": "<",
    "uaOverride": "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
}
```

`owner`: nomor WhatsApp anda (Bukan nomor bot). 

`prefix`: prefix bot. 

`uaOverride`: your user agent.  

## 🆗 Menjalankan bot
```bash
> npm start
```

 Setelah itu, akan ada QR-CODE, buka WhatsApp-mu yg ingin dijadikan bot, lalu scan code-qr nya!

# Features

|      Downloader     | Availability |
| :-----------------: | :----------: |
| YT to MP3           |      ✔️      |
| YT to MP4           |      ✔️      |

|       Fun        | Availability |
| :--------------: | :----------: |
| SimSimi          |      ✔️      |

|      Stalker       | Availability |
| :----------------: | :----------: |
| Github Profile     |      ✔️      |
| Instagram Profile  |      ✔️      |
| Twitter Profile    |      ✔️      |

|   Group Security   | Availability |
| :----------------: | :----------: |
| Anti porn         |      ✔️      |

# To-do
* Menambahkan lebih banyak fitur dari [VideFikri API's](https://videfikri.com/api).
* Menambahkan lebih banyak internal function.

# Thanks to
* [`Open-Wa/wa-automate-nodejs`](https://github.com/open-wa/wa-automate-nodejs)
* [`YogaSakti/imageToSticker`](https://github.com/YogaSakti/imageToSticker)
* [`BocchiBot`](https://github.com/SlavyanDesu/BocchiBot)
