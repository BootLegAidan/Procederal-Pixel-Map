let cfg = {
    downscale: 5,
    seed: 102536,
    zoom: 25,
    position: {
        x: 0,
        y: 0
    },
    perspective: 1,
    enableChange: false,
    year: 0,
    yearSpeed: 0.0025
}
let keysPressed = {}
let terrain = [
    {
        name: 'ocean',
        color: '#051f36',
        height: 0
    },
    {
        name: 'ocean (trans)',
        color: '#03325C',
        height: 0
    },
    {
        name: 'deepest water',
        color: '#004581',
        height: 0
    },
    {
        name: 'deepest water (trans)',
        color: '#014884',
        height: 0
    },
    {
        name: 'deep water',
        color: '#024b86',
        height: 0
    },
    {
        name: 'deep water (transition)',
        color: '#4492B6',
        height: 0
    },
    {
        name: 'water',
        color: '#85d8e5',
        height: 0
    },
    {
        name: 'water (transition)',
        color: '#ADE5EF',
        height: 0
    },
    {
        name: 'shallow water',
        color: '#d4f1f9',
        height: 0
    },
    {
        name: 'shore',
        color: '#f2e9cb',
        height: 0.25
    },
    {
        name: 'shore (transition)',
        color: '#DACEA6',
        height: 0.625
    },
    {
        name: 'beach',
        color: '#c2b280',
        height: 1
    },
    {
        name: 'grass',
        color: '#28cc25',
        height: 2
    },
    {
        name: 'grass (transition)',
        color: '#25BA22',
        height: 2.5
    },
    {
        name: 'hill (bottom)',
        color: '#21a81e',
        height: 3
    },
    {
        name: 'hill (bottom) (transition)',
        color: '#1F9C1C',
        height: 4.5
    },
    {
        name: 'hill (mid)',
        color: '#1c8f1a',
        height: 6
    },
    {
        name: 'hill (mid) (transition)',
        color: '#1A8518',
        height: 7
    },
    {
        name: 'hill (top)',
        color: '#177a15',
        height: 8
    },
    {
        name: 'hill (top) (transition)',
        color: '#336532',
        height: 9
    },
    {
        name: 'mountain (bottom)',
        color: '#4f4f4f',
        height: 10
    },
    {
        name: 'mountain (bottom) (trans)',
        color: '#616161',
        height: 13
    },
    {
        name: 'mountain (mid)',
        color: '#737373',
        height: 16
    },
    {
        name: 'mountain (mid) (trans)',
        color: '#888888',
        height: 18
    },
    {
        name: 'mountain (top)',
        color: '#9c9c9c',
        height: 20
    },
    {
        name: 'mountain (top) (trans)',
        color: '#A8A8A8',
        height: 22.5
    },
    {
        name: 'mountain (peak)',
        color: '#b3b3b3',
        height: 25
    },
    {
        name: 'mountain (peak) (trans)',
        color: '#D3D3D3',
        height: 29.5
    },
    {
        name: 'mountain (snow top)',
        color: '#f2f2f2',
        height: 34
    },
    
    // {
    //     name: 'beach',
    //     color: '#C2B280',
    //     height: 1
    // }
]
let debug = {}

let oceanSize

// cfg.seed = prompt("Enter a seed. Leave blank for random")
// oceanSize = prompt("Enter ocean size") * 1

if (!cfg.seed) {
    cfg.seed = Math.random()
}
if (!oceanSize || !Number.isInteger(oceanSize)) {
    oceanSize = 25
}
for (let i = 0; i < oceanSize; i++) {
    terrain.unshift(terrain[0])
}