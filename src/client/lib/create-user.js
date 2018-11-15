const algorithm = {
  name: 'RSA-OAEP',
  modulusLength: 2048,
  publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
  hash: { name: 'SHA-256' }
}

export default function(user) {
  return Promise.resolve({
    ...user,
    cryptoKeys: {},
    publicKeyString: ''
  })
}