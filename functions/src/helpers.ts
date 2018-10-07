export class Helpers {
    static areObjectsTheSame(object1: object, object2: object): boolean {
        return JSON.stringify(object1) === JSON.stringify(object2);
    }
}