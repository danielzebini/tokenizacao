const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        blasco: {
          '50': '#fff5f2', 
          '100': '#ffebe6', 
          '200': '#ffccc0', 
          '300': '#ffad99', 
          '400': '#ff704d', 
          '500': '#ff3201', 
          '600': '#e62d01', 
          '700': '#bf2601', 
          '800': '#991e01', 
          '900': '#7d1900'
        },
      },
      fontSize: { 
        'text-fluid-lg-min': '1.5rem',
        'text-fluid-lg-max': '3rem',
        'text-fluid-md-min': '1.25rem',
        'text-fluid-md-max': '2.5rem',
        'text-fluid-sm-min': '1.125rem',
        'text-fluid-sm-max': '2rem',
        'text-fluid-xs-min': '1rem',
        'text-fluid-xs-max': '1.5rem',
      },
      lineHeight: { 
        'text-fluid-lg-min': '2rem',
        'text-fluid-lg-max': '4rem',
      },
      gridColumnStart: {
        14: '14',
        15: '15',
      },
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
        'max-2xl-12':
          'calc(50% - calc(theme("screens.2xl") / 2)) repeat(12, minmax(0, 1fr)) calc(50% - calc(theme("screens.2xl") / 2));',
        'max-xl-12':
          'calc(50% - calc(theme("screens.xl") / 2)) repeat(12, minmax(0, 1fr)) calc(50% - calc(theme("screens.xl") / 2));',
      },
    },
  },
  plugins: [
    plugin(function({ addBase, addComponents, theme }) {
      const styles = ['text-fluid-lg','text-fluid-md','text-fluid-sm','text-fluid-xs']
      const screenMin = '22.5rem' // start of fluid font size
      const screenFB = '48rem' // fallback breakpoint
      const screenMax = '96rem' // end of fluid font size
          
      styles.forEach(style => {
        let fsMin = theme('fontSize.' + `${style}` + '-min')
        let fsMax = theme('fontSize.' + `${style}` + '-max')
        let lhMin = theme('lineHeight.' + `${style}` + '-min')
        let lhMax = theme('lineHeight.' + `${style}` + '-max')
    
        // addBase({
        //   [`${style}, .${style}`]: { 
        //     fontSize: fsMin,			
        //     [`@media (min-width: ${screenFB})`]: {
        //        fontSize: fsMax,
        //     }
        //   }
        // })
        addComponents({
          [`.${style}`]: { 
            fontSize: `clamp(${fsMin}, calc(${fsMin} + (${parseFloat(fsMax)} - ${parseFloat(fsMin)}) * `
              + `((100vw - ${parseFloat(screenMin)}rem) / (${parseFloat(screenMax)} - ${parseFloat(screenMin)}))), ${fsMax})`,
              if(theme === undefined || theme.extend === undefined || theme.extend.fontSize === undefined) {

                lineHeight: `clamp(${lhMin}, calc(${lhMin} + (${parseFloat(lhMax)} - ${parseFloat(lhMin)}) * `
                  + `((100vw - ${parseFloat(screenMin)}rem) / (${parseFloat(screenMax)} - ${parseFloat(screenMin)}))), ${lhMax})`
              }
          }
        })
        // clamp(360px, calc(360px + (600 - 360) * ((100vw - 360px) / (1536 - 360))), 600px)
      })
    })
  ],
}
