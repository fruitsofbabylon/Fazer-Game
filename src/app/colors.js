export default {
    'cyan': {
        hex: 0x00FFFF,
        colorFunction: function(r, g, b) {
            return (
                r > 85 && r < 135 &&
                g > 125 && g < 180 &&
                b > 175 && b < 225
            )
        }
    },
    'magenta': {
        hex: 0xFF00FF
    },
    'blue': {
        hex: 0x0000FF,
        colorFunction: function(r, g, b) {
            return r < 50 && g < 50 && b > 90
        }
    },
    'green': {
        hex: 0x00FF00,
        colorFunction: function(r, g, b) {
            return (
                r > 75 && r < 125 &&
                g > 115 && g < 155 &&
                b > 55 && b < 110
            )
        }
    },
    'red': {
        hex: 0xFF0000,
        colorFunction: function(r, g, b) {
            return r > 190 && g < 110 && b < 95
        }
    }
}