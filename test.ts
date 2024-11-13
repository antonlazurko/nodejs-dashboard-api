class Coord {
    message: string = "hello";
    lat: number;
    lng: number;
    protected test() {// do not use in instance
        if (this.lat === 0 && this.lng === 0) {
            throw new Error("0, 0");
        }
    }
    private test2() {} // do not use in inherited class and instance only in derived
    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
        console.log(this.message);
    }
    computeDistance(newLat: number, newLng: number): number {
        return 0;
    }
}
const point = new Coord(0, 0);

class MapLocation extends Coord {
    message: string = "hello world";
    private _name: string;
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }
    constructor(lat: number, lng: number) {
        super(lat, lng);
    }
    override computeDistance(newLat: number, newLng: number): number {
        console.log(this.message);
        return 0;
        this.test();
    }
}
console.log(new MapLocation(0, 0).computeDistance(0, 0));

interface LoggerService {
    log: (s: string) => void
}

class Logger implements LoggerService {
    public log(s: string) {
        console.log(s);
    }
    private error(s: string) {
        console.error(s);
    }
}

const log = new Logger();


class MyClass {
    static value: number = 0;
    static getValue() {
        return this.value;
    }
}
console.log(MyClass.getValue());

class NewClass <T> {
    a: T
}

const b = new NewClass<number>();
console.log(b.a);


abstract class Base {
    print(s: string) {
        console.log(s);
    }
    abstract error(s: string): void
}
// new Base()// error

class Derived extends Base {
    error(s: string): void {
        console.error(s);
    }
}
const d = new Derived();
d.print("hello");

class Animal {
    name: string
}
class Dog {
    name: string
    tail: boolean
}

const puppy: Animal = new Dog();