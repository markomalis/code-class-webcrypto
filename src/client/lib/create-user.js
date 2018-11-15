const algorithm = {
  name: 'RSA-OAEP',
  modulusLength: 2048,
  publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
  hash: { name: 'SHA-256' }
}

export default function(user) {
  return window.crypto.subtle.generateKey(algorithm, false, [ 'decrypt', 'encrypt' ])
    .then(keys => Promise.all([
      Promise.resolve(keys),
      crypto.subtle.exportKey('jwk', keys.publicKey)
    ]))
    .then(([cryptoKeys, exportedPublicKey]) => ({
      ...user,
      cryptoKeys,
      publicKeyString: JSON.stringify(exportedPublicKey)
    }))
    .catch(error => console.log(`Error generating keys: ${error}`))
}

// export default function(user) {
//   return Promise.resolve({
//     ...user,
//     cryptoKeys: {},
//     publicKeyString: ''
//   })
// }