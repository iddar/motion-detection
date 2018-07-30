
import { loop, pixelsAreDifferent, recordDiiff } from './utils'
import { drawCanvas, initVideo } from './canvas'

const snapshotCanvas = document.getElementById('snapshot')
const diffCanvas = document.getElementById('diffCanvas')
const captureButton = document.getElementById('capture')
const context = snapshotCanvas.getContext('2d')
const contextDiff = diffCanvas.getContext('2d')

const fps = 15
const width = 640
const height = 480
const imageLength = width * height

// satate
let record = false
let prevImage = null

captureButton.addEventListener('click', () => { record = !record })
document.addEventListener('DOMContentLoaded', onLoad, false)

function imageProsessing (image) {
  if (prevImage == null) prevImage = image
  let imageDiff = []
  
  for (let index = 0; index < imageLength; index++) {
    let isDifferent = pixelsAreDifferent(index, image, prevImage)
    imageDiff.push(isDifferent ? 0 : 1)
  }

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

function draw () {
  context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height)
  
  const { data } = context.getImageData(0, 0, width, height)
  let diff = imageProsessing(data)
  
  recordDiiff(record, diff, data => { 
    console.log('Done:', data)
    drawCanvas(data, contextDiff)
    record = false
  })
}

function onLoad () {
  initVideo('player') // create video stream
  setSize() // set equal size for all elements
  loop(draw, fps) // main loop
}
