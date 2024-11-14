function Component(id: number) {
    console.log('init Component');
    return (target: Function) => {
        console.log('Component');
        target.prototype.id = id

    }
}
function Logger() {
    console.log('init Logger');
    return (target: Function) => {
        console.log('Logger');

    }
}

function Method (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    console.log('Method');
    console.log('Method key :>> ', key);
    const oldValue = descriptor.value;
    console.log('oldValue :>> ', oldValue);
    descriptor.value = function(...args: any[]) {
        console.log('args :>> ', args);
        return args[0] * 10;
    }
}

function Prop (target: Object, key: string | symbol) {
    console.log('Prop');
    console.log('Prop key :>> ', key);
    let value: number
    const get = () => {
        console.log('getter');
        return value;
    }
    const set = (newValue: number) => {
        console.log('setter');
        value = newValue;
    }
    Object.defineProperty(target, key, {
        get,
        set
    });
}
function Param (target: Object, key: string | symbol, index: number) {
    console.log('Param');
    console.log('Param key :>> ', key);
    console.log('Param index :>> ', index);
}

@Logger()
@Component(1)
export class User {

    @Prop id: number;
    @Method
    updateId(@Param newId: number): number {
        this.id = newId;
        return this.id;
    }
}
const user = new User()
console.log(user.id);
user.updateId(2)
console.log(user.id);
