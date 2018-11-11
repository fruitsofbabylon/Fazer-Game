export default {
    'cyan': {
        hex: 0x00FFFF,
        colorFunction: function(r, g, b) {
            return r < 50 && g > 200 && b > 200
        }
    },
    'magenta': {
        hex: 0xFF00FF
    },
    'blue': {
        hex: 0x0000FF,
        colorFunction: function(r, g, b) {
            return r < 50 && g < 50 && b > 200
        }
    },
    'green': {
        hex: 0x00FF00,
        colorFunction: function(r, g, b) {
            return r < 50 && g > 200 && b < 50
        }
    },
    'red': {
        hex: 0xFF0000,
        colorFunction: function(r, g, b) {
            return r > 200 && g < 50 && b < 50
        }
    }
}