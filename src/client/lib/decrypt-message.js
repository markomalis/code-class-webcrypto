import {
  convertArrayBufferViewtoString,
  convertStringToArrayBufferView
} from './buffer-conversion'

export default function({ content, iv }, privateKey) {
  return crypto.subtle.decrypt(
    { name: 'RSA-OAEP', iv },
    privateKey,
    convertStringToArrayBufferView(content)
  )
    .then(decryptedMessage => {
      const message = new Uint8Array(decryptedMessage)
      return convertArrayBufferViewtoString(message)
    })
}

// export default function({ content }) {
//   return Promise.resolve(content)
// }