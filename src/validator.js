
export default class Validator {
    static parseToNumber(string) {
        const number = parseFloat(string)
        return isNaN(number) ? null : number;
    }

    static parseToString(number) {
    }
}