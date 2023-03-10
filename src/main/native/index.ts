import koffi from 'koffi'
import path from 'path'
const rsNative = require(path.resolve(
  __dirname,
  "../../resources/rs-native.darwin-x64.node"
))

const sumLib = koffi.load(path.resolve(
  __dirname,
  "../../resources/sum.dylib"
))

const nativeSum = sumLib.stdcall('sum','int',['int','int'])

export const callNativeSum = (a:number,b:number) => {
  return nativeSum(a,b)
}

export const rsNativeSum = (a:number,b:number) => {
  return rsNative.sum(a,b)
}

export const rsNativeSubtraction = (a:number,b:number) => {
  return rsNative.subtraction(a,b)
}