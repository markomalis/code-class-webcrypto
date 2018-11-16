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

/*
  The default export should be a function that takes:
    - A chat message
    - A publicKeyString of the user that will receive the message

  The function should use crypto.sublte.importKey()
  to import the stringified RSA-OAEP publicKey,
  Then it should use crypto.subtle.encrypt() to encrypt the message.
  Finally stringify the encrypted message and return an object containing:
    - the stringified message
    - the iv used to encrypt the message.
  (See 'spec' below)
*/

export default function(message, publicKeyString) {
  return Promise.resolve({
    message,
    iv: undefined
  })
}