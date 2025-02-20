export default class Validator {
    static parseStringToNumber(string) {
        if (typeof string !== "string") {
            throw new TypeError(`Invalid input. Expected a valid string, but got: ${typeof string}`)
        }
        const number = parseFloat(string)
        return isNaN(number) ? null : number;
    }

    static numberToString(number) {
        if (typeof number !== "number" || isNaN(number)) {
            throw new TypeError(`Invalid input. Expected a valid number, but got: ${typeof number}`);
        }
        return number.toString();
    }
}