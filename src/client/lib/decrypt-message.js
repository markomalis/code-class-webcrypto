import {
  convertArrayBufferViewtoString,
  convertStringToArrayBufferView
} from './buffer-conversion'



export default function({ content }) {
  return Promise.resolve(content)
}