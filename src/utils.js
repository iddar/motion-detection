
const samples = 100
const pixelWidth = 4
const sensitivityDefault = 50

// state
let buffer = []
let count = 0

const getPixel = (i, data) => data.slice(i * pixelWidth, (i * pixelWidth) + pixelWidth - 1)

// pixels compare
export function pixelsAreDifferent (index, image, prevImage, sensitivity = sensitivityDefault) {
  let pixel = getPixel(index, image)
  let oldPixel = getPixel(index, prevImage)

  let diff = pixel.some((color, idxColor) => {
    let distance = Math.abs(color - oldPixel[idxColor])
    return distance > sensitivity
  })

  return diff
}

export function loop (callback, fps) {
  // setTimeout(() => {
  callback()
  window.requestAnimationFrame(loop.bind(null, callback, fps))
  // }, 1000 / fps)
}

export function recordDiiff (record, diff, callback) {
  if (record) {
    buffer.push(diff)
    count++

    if (count === samples) {
      callback(parseBuffer(buffer))
      count = 0
      buffer = []
    }
  }
}

function parseBuffer (buffer) {
  return buffer.reduce((acc, element) => {
    return element.map((val, index) => {
      return acc[index] === 1 ? 1 : val
    })
  }, [])
}
