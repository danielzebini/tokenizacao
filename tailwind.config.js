const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        xs: '360px',
      },
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
          '900': '#7d1900',
        },
      },
      fontSizeFluid: { 
        'text-fluid-lg-min': '24px',
        'text-fluid-lg-max': '48px',
        'text-fluid-md-min': '20px',
        'text-fluid-md-max': '40px',
        'text-fluid-sm-min': '18px',
        'text-fluid-sm-max': '32px',
        'text-fluid-xs-min': '16px',
        'text-fluid-xs-max': '24px',
      },
      lineHeightFluid: { 
        'text-fluid-lg-min': '32px',
        'text-fluid-lg-max': '64px',
      },
      // paddingFluid: { 
      //   'p-fluid-lg-min': '32px',
      //   'p-fluid-lg-max': '64px',
      // },
      gridColumnStart: {
        14: '14',
        15: '15',
      },
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
        'max-2xl-12': 'calc(50% - calc(theme("screens.2xl") / 2)) repeat(12, minmax(0, 1fr)) calc(50% - calc(theme("screens.2xl") / 2));',
        'max-xl-12': 'calc(50% - calc(theme("screens.xl") / 2)) repeat(12, minmax(0, 1fr)) calc(50% - calc(theme("screens.xl") / 2));',
      },
    },
  },
  plugins: [

    plugin(function({ addComponents, theme }) {
      
      const styles = Object.entries(theme('fontSizeFluid')).map((x) => x[0].replace('-min', '').replace('-max', ''))
      // const pads = Object.entries(theme('paddingFluid')).map((x) => x[0].replace('-min', '').replace('-max', ''))
      const screenMin = theme("screens.xs")
      const screenMax = theme("screens.2xl")
      
      styles.forEach(style => {

        let fsMin = theme('fontSizeFluid.' + `${style}` + '-min')
        let fsMax = theme('fontSizeFluid.' + `${style}` + '-max')
        let lhMin = theme('lineHeightFluid.' + `${style}` + '-min')
        let lhMax = theme('lineHeightFluid.' + `${style}` + '-max')

        if(lhMin !== undefined){
          el = { 
            fontSize: fluid(fsMin, fsMax, screenMin, screenMax),
            lineHeight: fluid(lhMin, lhMax, screenMin, screenMax)
          }
        } else {
          el = { 
            fontSize: fluid(fsMin, fsMax, screenMin, screenMax)
          }
        }

        addComponents({
          [`.${style}`]: el
        })

      })

      // pads.forEach(pad => {

      //   let pMin = theme('paddingFluid.' + `${pad}` + '-min')
      //   let pMax = theme('paddingFluid.' + `${pad}` + '-max')

      //     el = { 
      //       padding: fluid(pMin, pMax, screenMin, screenMax),
      //     }

      //   addComponents({
      //     [`.${pad}`]: el
      //   })

      // })

      function fluid(min, max, screenMin, screenMax) {
        return `clamp(${min}, calc(${min} + (${parseFloat(max)} - ${parseFloat(min)}) * ` + `((100vw - ${parseFloat(screenMin)}px) / (${parseFloat(screenMax)} - ${parseFloat(screenMin)}))), ${max})`
      }

    })

  ],
}
