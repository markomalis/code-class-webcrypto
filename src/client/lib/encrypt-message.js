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

export default function(message) {
  return Promise.resolve({
    message,
    iv: undefined
  })
}