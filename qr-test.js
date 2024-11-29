import jsQR from 'jsqr'
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.data('qrData', () => ({
  video: null,
  canvasElement: null,
  canvas: null,
  loadingMessage: null,
  outputContainer: null,
  outputMessage: null,
  outputData: null,

  init() {
    this.frame = 0
    this.video = document.createElement('video')
    this.canvasElement = this.$refs.canvas
    this.canvas = this.canvasElement.getContext('2d')
    this.loadingMessage = this.$refs.loadingMessage
    this.outputContainer = this.$refs.output
    this.outputMessage = this.$refs.outputMessage
    this.outputDataContainer = this.$refs.outputDataContainer
    this.outputData = this.$refs.outputData

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
      this.video.srcObject = stream
      this.video.setAttribute('playsinline', true)
      this.video.play()
      requestAnimationFrame(this.tick.bind(this))
    })
  },

  drawLine(begin, end, color) {
    this.canvas.beginPath()
    this.canvas.moveTo(begin.x, begin.y)
    this.canvas.lineTo(end.x, end.y)
    this.canvas.lineWidth = 4
    this.canvas.strokeStyle = color
    this.canvas.stroke()
  },

  tick() {
    this.loadingMessage.innerText = '⌛ Loading video...'
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.frame++
      this.loadingMessage.hidden = true
      this.canvasElement.hidden = false
      this.outputContainer.hidden = false

      this.canvasElement.height = this.video.videoHeight
      this.canvasElement.width = this.video.videoWidth
      this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height)
      const imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      })

      if (code) {
        this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58')
        this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58')
        this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58')
        this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58')
        this.outputMessage.hidden = true
        this.outputDataContainer.hidden = false
        this.outputData.innerText = code.data
      } else {
        this.outputMessage.hidden = false
        this.outputDataContainer.hidden = true
      }
    }
    requestAnimationFrame(this.tick.bind(this))
  },
}))
