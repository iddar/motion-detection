
### Expamples

```js
const toRGB = pixel => `rgb(${pixel.join(',')})`
const colorBox = document.getElementById('color')
colorBox.style.backgroundColor = toRGB( getPixel(imageLength - 1, image) )
```
