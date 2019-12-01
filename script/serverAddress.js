
const ip = require('ip')

console.log('ip address: ', ip.address())
const serverAddress = `http://${ip.address()}:8080`
console.log('server address: ',process.env.ADDRESS)

module.exports = serverAddress
// (() => {
//   process.env.IPADDRESS = ip.address()
//   process.env.SERVERADDRESS = `http://${process.env.IPADDRESS}:8080`
//   console.log('<<<<<<<<<SERVERADDY: ',process.env.SERVERADDRESS )
// })()


