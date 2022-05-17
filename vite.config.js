// vite.config.js
const { getHashes } = require('crypto');
const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        json: resolve(__dirname, 'Projects.json'),
        base: resolve(__dirname, 'ShowCases/ShowCaseBase.html'),
        titan: resolve(__dirname, 'ShowCases/titanCase.html'),
        gas: resolve(__dirname, 'ShowCases/gasCase.html'),
        kaiju: resolve(__dirname, 'ShowCases/kaijuCase.html'),
        jaegerdrop: resolve(__dirname, 'ShowCases/jaegerdropCase.html'),
        jaeger: resolve(__dirname,"ShowCases/jaegerCase.html"),
        jaeger2: resolve(__dirname, 'ShowCases/jager2Case.html'),
        grapple: resolve(__dirname, 'ShowCases/grappleCase.html'),
        custom: resolve(__dirname, 'ShowCases/customCase.html'),
        gemini: resolve(__dirname, 'ShowCases/geminiCase.html'),
        film: resolve(__dirname, 'ShowCases/filmCase.html'),
        cyclopse: resolve(__dirname, 'ShowCases/cyclopseCase.html'),
        aztec: resolve(__dirname, 'ShowCases/aztecCase.html'),
        apoc: resolve(__dirname, 'ShowCases/apocCase.html'),
        oz: resolve(__dirname, 'ShowCases/ozCase.html'),
        infinite: resolve(__dirname, 'ShowCases/infiniteCase.html'),
        steam: resolve(__dirname, 'ShowCases/steamCase.html'),
        tunnel: resolve(__dirname,'ShowCases/tunnelCase.html')

        
        
        

      }
    }
  }
})