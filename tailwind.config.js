module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'custom-width': '45%',
       
      },
      background:{
        'new-color':'#EDEFF7'
      },
      borderColor: {
        'custom': '1px solid rgba(54, 13, 70, 0.25)',
      },
      screens: {

        'sm': '640px',    // Small screens and above (640px and higher)
        'md': '768px',    // Medium screens and above (768px and higher)
        'lg': '1024px',   // Large screens and above (1024px and higher)
        'xl': '1500px',   // Extra large screens and above (1280px and higher)
  
      },
    }
  },
  
  variants: {
    extend: {},
  },
  plugins: [ require('flowbite/plugin')
],
content: [
  "./node_modules/flowbite/**/*.js",
],
important: '#root',

}
