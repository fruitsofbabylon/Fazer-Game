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
                r > 70 && r < 140 &&
                g > 160 && g < 210 &&
                b > 70 && b < 115
            )
        }
    },
    'red': {
        hex: 0xFF0000,
        colorFunction: function(r, g, b) {
            return r > 200 && g < 50 && b < 50
        }
    }
}