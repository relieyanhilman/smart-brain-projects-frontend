const paramsParticles = {
    "interactivity": {
        "events": {
            "onClick": {
                "enable": false,
                "mode": "push"
            },
            "onHover": {
                "enable": true,
                "mode": "grab"
            }
        }
    },
    "particles": {
        "color": {
            "value": "#ffffff",
            "animation": {
                "h": {
                    "enable": true,
                    "speed": 20
                }
            }
        },
        "links": {
            "color": {
                "value": "#ffffff"
            },
            "enable": true,
            "opacity": 1
        },
        "move": {
            "enable": true,
            "outModes": {
                "bottom": "out",
                "left": "out",
                "right": "out",
                "top": "out"
            },
            "speed": 4
        },
        "number": {
            "density": {
                "enable": true
            },
            "value": 80
        },
        "opacity": {
            "value": 1
        },
        "size": {
            "value": {
                "min": 0.1,
                "max": 3
            }
        }
    }
}

export default paramsParticles;