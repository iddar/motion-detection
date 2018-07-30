
import {
  loop, 
  pixelsAreDifferent,
  drawCanvas,
  initVideo
} from './utils'

const player = document.getElementById('player') 
const snapshotCanvas = document.getElementById('snapshot')
const diffCanvas = document.getElementById('diffCanvas')
const captureButton = document.getElementById('capture')
const context = snapshotCanvas.getContext('2d')
const contextDiff = diffCanvas.getContext('2d')

const fps = 5
const width = 640
const height = 480
const pixelWidth = 4
const imageLength = width * height

const getPixel = (i, data) => data.slice(i * pixelWidth, (i * pixelWidth) + pixelWidth - 1)

let prevImage = null
let record = false
let buffer = []

// const toRGB = pixel => `rgb(${pixel.join(',')})`
// const colorBox = document.getElementById('color')
// colorBox.style.backgroundColor = toRGB( getPixel(imageLength - 1, image) )
function imageProsessing (image) {
  if (prevImage == null) prevImage = image
 
  let imageDiff = []
  
  for (let index = 0; index < imageLength; index++) {
    let isDifferent = pixelsAreDifferent(
      getPixel(index, image),
      getPixel(index, prevImage)
    )

    imageDiff.push(isDifferent ? 0 : 1)
  }

  // done
  prevImage = image
  return imageDiff
}

function setSize () {
  player.style.width = width + 'px'
  player.style.height = height + 'px'
  snapshotCanvas.width = width
  snapshotCanvas.height = height
  diffCanvas.width = width
  diffCanvas.height = height
}

captureButton.addEventListener('click', function () {
  // Draw the video frame to the canvas.
  record = !record
  console.log(buffer.length)
})

function draw () {
  context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height)

  const { data } = context.getImageData(0, 0, width, height)
  let diff = imageProsessing(data)

  drawCanvas(diff, contextDiff)
  if (record) {
    buffer.push(diff)
  }
}

document.addEventListener('DOMContentLoaded', function(){ 
  initVideo(player)
  setSize()
  loop(draw, fps)
}, false)
