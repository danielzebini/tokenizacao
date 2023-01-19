const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: { 
        'text-fluid-lg-min': '1.5rem',
        'text-fluid-lg-max': '3rem',
        'text-fluid-md-min': '1.25rem',
        'text-fluid-md-max': '2.5rem',
      },
      lineHeight: { 
        'text-fluid-lg-min': '2rem',
        'text-fluid-lg-max': '4rem',
      },
    },
  },
  plugins: [
    plugin(function({ addComponents, theme }) {
      const styles = ['text-fluid-lg','text-fluid-md']
      const screenMin = '22.5rem'
      const screenMax = '96rem'
          
      styles.forEach(style => {
        let fsMin = theme('fontSize.' + `${style}` + '-min')
        let fsMax = theme('fontSize.' + `${style}` + '-max')
        let lhMin = theme('lineHeight.' + `${style}` + '-min')
        let lhMax = theme('lineHeight.' + `${style}` + '-max')
    
        addComponents({
          [`.${style}`]: { 
            fontSize: `clamp(${fsMin}, calc(${fsMin} + (${parseFloat(fsMax)} - ${parseFloat(fsMin)}) * `
              + `((100vw - ${parseFloat(screenMin)}rem) / (${parseFloat(screenMax)} - ${parseFloat(screenMin)}))), ${fsMax})`,

            // Se não for definido acima, não aparecer
            lineHeight: `clamp(${lhMin}, calc(${lhMin} + (${parseFloat(lhMax)} - ${parseFloat(lhMin)}) * `
              + `((100vw - ${parseFloat(screenMin)}rem) / (${parseFloat(screenMax)} - ${parseFloat(screenMin)}))), ${lhMax})`
          }
        })
      })
    })
  ],
}
