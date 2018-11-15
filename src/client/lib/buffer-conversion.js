export function convertStringToArrayBufferView(str) {
  let bytes = new Uint8Array(str.length)
  for (let iii = 0; iii < str.length; iii++)
  {
      bytes[iii] = str.charCodeAt(iii)
  }

  return bytes
}

export function convertArrayBufferViewtoString(buffer) {
  let str = ""
  for (let iii = 0; iii < buffer.byteLength; iii++)
  {
      str += String.fromCharCode(buffer[iii])
  }

  return str
}