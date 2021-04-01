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

  <a href="https://www.npmjs.com/package/@open-wa/wa-automate"><img src="https://img.shields.io/npm/v/@open-wa/wa-automate.svg?color=green" /></a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FSlavyanDesu%2FBocchiBot?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FSlavyanDesu%2FBocchiBot.svg?type=shield"/></a>
  <img src="https://img.shields.io/node/v/@open-wa/wa-automate" />
  <img src="https://img.shields.io/badge/maintained%3F-yes-green.svg?style=flat" />
</p>
<p align="center">
  <a href="https://github.com/VideFrelan/vfbot-wa#requirements">Requirements</a> •
  <a href="https://github.com/VideFrelan/vfbot-wa#instalasi">Installation</a> •
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
## 💻 Clone Repo & Instalasi dependencies
```bash
> git clone https://github.com/VideFrelan/vfbot-wa.git
> cd vfbot-wa
> npm install
```

## ✍️ Edit file
Edit file penting yg berada di 'config.json'
```json
{
    "owner": "62812xxxxxxxx@c.us", 
    "uaOverride": "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
}
```

`owner`: nomor WhatsApp Anda (Bukan nomor bot).

`prefix`: bot ini multi-prefix.

`uaOverride`: your user agent.

## 🛠️ Installing the FFmpeg
* Unduh salah satu versi FFmpeg yang tersedia dengan mengklik [di sini](https://www.gyan.dev/ffmpeg/builds/).
* Extract file ke `C:\` path.
* Ganti nama folder yang telah di-extract menjadi `ffmpeg`.
* Run Command Prompt as Administrator.
* Jalankan perintah berikut::
```cmd
> setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
Jika berhasil, akan memberikanmu pesan seperti: `SUCCESS: specified value was saved`.
* Sekarang setelah Anda menginstal FFmpeg, verifikasi bahwa itu berhasil dengan menjalankan perintah ini untuk melihat versi:
```cmd
> ffmpeg -version
```

## 🧾 Installing the Tesseract
* Unduh program Tesseract [di sini](https://s.id/vftesseract).
* Jalankan program Tesseract dengan run As Administrator.
* Run Command Prompt as Administrator.
* Jalankan perintah berikut::
```cmd
> setx /m PATH "C:\Tesseract-OCR;%PATH%"
```
Jika berhasil, akan memberikanmu pesan seperti: `SUCCESS: specified value was saved`.
* Sekarang setelah Anda menginstal Tesseract, verifikasi bahwa itu berhasil dengan menjalankan perintah ini untuk melihat versi:
```cmd
> tesseract -version
```

## 🆗 Menjalankan bot
```bash
> npm start
```

 Setelah itu, akan ada QR-CODE, buka WhatsApp-mu yg ingin dijadikan bot, lalu scan code-qr nya!

# Features


|      Sticker Maker  | Availability |
| :-----------------: | :----------: |
| Image to Sticker    |      ✔️      |
| GIF/Video to Sticker|      ✔️      |
| Take Sticker        |      ✔️      |
| Sticker GIF WM      |      ✔️      |
| Sticker No Crop     |      ✔️      |
| Emoji to Sticker    |      ✔️      |

|      Downloader     | Availability |
| :-----------------: | :----------: |
| YT to MP3           |      ✔️      |
| YT to MP4           |      ✔️      |
| Instagram TV        |      ✔️      |
| IG Video & Photo    |      ✔️      |
| Play MP3            |      ✔️      |

|      Education      | Availability |
| :-----------------: | :----------: |
| Wikipedia ID        |      ✔️      |
| Wikipedia EN        |      ✔️      |
| Covid Indo          |      ✔️      |
| KBBI                |      ✔️      |
| Random Qur'an       |      ✔️      |
| Kisah Nabi          |      ✔️      |

|       Fun        | Availability |
| :--------------: | :----------: |
| SimSimi          |      ✔️      |
| Balik Huruf      |      ✔️      |
| Hitung Huruf     |      ✔️      |
| Hilih Teks       |      ✔️      |

|       Random     | Availability |
| :--------------: | :----------: |
| Quotes           |      ✔️      |
| Fakta Unik       |      ✔️      |

|      Stalker       | Availability |
| :----------------: | :----------: |
| Github Profile     |      ✔️      |
| Instagram Profile  |      ✔️      |
| Twitter Profile    |      ✔️      |

|      Spammer      | Availability |
| :----------------: | :----------: |
| Email              |      ✔️      |
| Call               |      ✔️      |

|      OTHERS        | Availability |
| :----------------: | :----------: |
| OCR (Image to Text)|      ✔️      |
| NPM Info           |      ✔️      |
| IP Lookup          |      ✔️      |
| Random Nekonime    |      ✔️      |
| Chord Guitar       |      ✔️      |
| Lirik Lagu         |      ✔️      |
| Random Quotes Anime|      ✔️      |
| Random Nekonime    |      ✔️      |
| FilmApik Detail    |      ✔️      |
| Kode Pos Finder    |      ✔️      |
| Nulis API    |      ✔️      |

|   Group Security   | Availability |
| :----------------: | :----------: |
| Anti Virtext       |      ✔️      |
| Anti Group Link    |      ✔️      |
| Anti Porn          |    PREMIUM    |

# 📝 To-do
* Menambahkan lebih banyak fitur dari [VideFikri API's](https://videfikri.com/api).
* Menambahkan lebih banyak internal function.

# Thanks to
* [`Open-Wa/wa-automate-nodejs`](https://github.com/open-wa/wa-automate-nodejs)
* [`YogaSakti/imageToSticker`](https://github.com/YogaSakti/imageToSticker)
* [`BocchiBot`](https://github.com/SlavyanDesu/BocchiBot)
