import {
  convertArrayBufferViewtoString,
  convertStringToArrayBufferView
} from './buffer-conversion'

const algorithm = {
  name: 'RSA-OAEP',
  modulusLength: 2048,
  publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
  hash: { name: 'SHA-256' }
}

export default function(message, publicKeyString) {
  const iv = crypto.getRandomValues(new Uint8Array(16))
  const publicKey = JSON.parse(publicKeyString)

  return crypto.subtle.importKey(
    'jwk',
    publicKey,
    algorithm,
    true,
    [ 'encrypt' ]
  )
    .then(publicKey => crypto.subtle.encrypt(
      { name: 'RSA-OAEP', iv },
      publicKey,
      convertStringToArrayBufferView(message)
    ))
    .then(encryptedMessage => {
      const messageBuffer = new Uint8Array(encryptedMessage)
      const message = convertArrayBufferViewtoString(messageBuffer)

      return {
        message,
        iv
      }
    })
}

// export default function(message) {
//   return Promise.resolve({
//     message,
//     iv: undefined
//   })
// }