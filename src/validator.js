export function parseStringToNumber(string) {
    if (typeof string !== "string" || !/^-?\d*\.?\d+$/.test(string.trim())) {
        return null;
    }
    const number = parseFloat(string);
    return isNaN(number) || Object.is(number, -0) ? null : number;
}

export function numberToString(number) {
    if (typeof number !== "number" || !isFinite(number)) {
        return "";
    }
    return number.toString();
}