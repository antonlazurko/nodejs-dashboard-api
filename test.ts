interface IHasLength {
    length: number
}

function log<T extends IHasLength, K>(obj:T, arr: K[]): K[] {
    console.log(obj);
    arr.length
    obj.length
    return arr
}

log<string, number>('hello', [1, 2, 3])
log<Array<number>, string>([1], ['a', 'b', 'c'])

function add<T>(value:T): T[] {
    const arr: T[] = []
    for (let i = 0; i < 10; i++) {
        arr.push(value)
    }
    return arr
}

interface IUser{
    name : string
    age?: number
    bid: <T>(sum: T) => boolean
}

function bid<T>(params: T): boolean {
    return true
}