
const width = 640
// const height = 480

const getRow = i => Math.floor(i / width)
const getColumn = i => Math.floor(i - (getRow(i) * width))

// Draw Canvas from Pixels Array
export function drawCanvas (pixelsArray, ctxCanvas) {
  ctxCanvas.clearRect(0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height) // Clears the canvas
  // ctx.fillRect(x, y, width, height)
  pixelsArray.forEach((pixel, idx) => {
    ctxCanvas.fillStyle = pixel ? '#ffffff' : '#000000'
    ctxCanvas.fillRect(getColumn(idx), getRow(idx), 1, 1)
  })
}

// Attach the video stream to the video element and autoplay.
export function initVideo (container) {
  const player = document.getElementById(container)
  const handleSuccess = stream => { player.srcObject = stream }

  navigator
    .mediaDevices
    .getUserMedia({video: true})
    .then(handleSuccess)
}
