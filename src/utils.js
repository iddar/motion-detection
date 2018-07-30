
const sensitivityDefault = 100

const width = 640
const height = 480

const getRow = i => Math.floor(i / width)
const getColumn = i => Math.floor(i - (getRow(i) * width))

// pixels compare
export function pixelsAreDifferent (pixel, oldPixel, sensitivity = sensitivityDefault) {
  let diff = pixel.some((color, idxColor) => {
    let distance = Math.abs(color - oldPixel[idxColor])
    return distance > sensitivity
  })

  return diff
}

// Draw Canvas from Pixels Array
export function drawCanvas (pixelsArray, ctxCanvas) {
  ctxCanvas.clearRect(0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height); // Clears the canvas
  // ctx.fillRect(x, y, width, height)
  pixelsArray.forEach((pixel, idx) => {
    ctxCanvas.fillStyle = pixel ? '#ffffff': '#000000';
    ctxCanvas.fillRect(getColumn(idx), getRow(idx), 1, 1);
  });
}

export function loop(callback, fps) {
  setTimeout(() => {
    callback()
    requestAnimationFrame(loop.bind(null, callback, fps))
  }, 1000 / fps)
}

export function initVideo (container) {
  // Attach the video stream to the video element and autoplay.
  const handleSuccess = stream => container.srcObject = stream
  
  navigator
    .mediaDevices
    .getUserMedia({video: true})
    .then(handleSuccess)
}
