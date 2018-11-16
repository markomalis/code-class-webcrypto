import {
  convertArrayBufferViewtoString,
  convertStringToArrayBufferView
} from './buffer-conversion'

/*
  The default export should be a function that takes:
    - An object containing:
      - encrypted content of a message
      - iv used to encrypt this content
    - A privateKey as returned by the crypto.subtle.generateKey() method


  The function should use crypto.subtle.decrypt() to decrypt the message.
  Then stringify the decrypted message and return it
  (See 'spec' below)
*/

export default function({ content, iv }, privateKey) {
  return Promise.resolve(content)
}