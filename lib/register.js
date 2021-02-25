const fs = require('fs-extra')
const _registered = JSON.parse(fs.readFileSync('./database/registered.json'))
const crypto = require('crypto')

const getRegisteredRandomId = () => {
    return _registered[Math.floor(Math.random() * _registered.length)].id
}

const addRegisteredUser = (userId, name, age, time, serial) => {
    const obj = { id: userId, name: name, age: age, time: time, serial: serial }
    _registered.push(obj)
    fs.writeFileSync('./database/registered.json', JSON.stringify(_registered))
}

const createSerial = (size) => {
    return crypto.randomBytes(size).toString('hex').slice(0, size)
}

const checkRegisteredUser = (userId) => {
    let status = false
    Object.keys(_registered).forEach((i) => {
        if (_registered[i].id === userId) {
            status = true
        }
    })
    return status
}

const checkRegisteredUserFromSerial = (serial) => {
    let status = false
    Object.keys(_registered).forEach((i) => {
        if (_registered[i].serial === serial) {
            status = true
        }
    })
    return status
}

const getRegisteredNameFromSerial = (serial) => {
    let position = false
    Object.keys(_registered).forEach((i) => {
        if (_registered[i].serial === serial) {
            position = i
        }
    })
    return _registered[position].name
}

const getRegisteredAgeFromSerial = (serial) => {
    let position = false
    Object.keys(_registered).forEach((i) => {
        if (_registered[i].serial === serial) {
            position = i
        }
    })
    return _registered[position].age
}

const getRegisteredTimeFromSerial = (serial) => {
    let position = false
    Object.keys(_registered).forEach((i) => {
        if (_registered[i].serial === serial) {
            position = i
        }
    })
    return _registered[position].time
}

const getRegisteredIdFromSerial = (serial) => {
    let position = false
    Object.keys(_registered).forEach((i) => {
        if (_registered[i].serial === serial) {
            position = i
        }
    })
    return _registered[position].id
}

module.exports = {
    addRegisteredUser,
    checkRegisteredUser,
    createSerial,
    checkRegisteredUserFromSerial,
    getRegisteredNameFromSerial,
    getRegisteredAgeFromSerial,
    getRegisteredTimeFromSerial,
    getRegisteredIdFromSerial,
    getRegisteredRandomId,
}
