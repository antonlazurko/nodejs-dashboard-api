let a = 'hello'

if (typeof a === 'string') {
    console.log(a)
}

let b: typeof a

type Coord = {
    lat: number,
    lng: number
}

type C = keyof Coord

let d: C = 'lng'

function log(a: string| null) {
    a?.toLowerCase()
    if (a === null) {
        return
    }
}
function log2(a: string| null) {
    a!.toLowerCase()
    if (a === null) {
        return
    }
}