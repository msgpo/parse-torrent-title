exports.none = input => input;

exports.value = staticValue => () => staticValue;

exports.integer = input => parseInt(input, 10);

exports.boolean = () => true;

exports.lowercase = input => input.toLowerCase();

exports.date = input => {
    const parts = input.replace(/\D+/, " ").trim().split(" ");
    const year = parts[0].length === 4 ? parts[0] : parts[2];
    const month = parts[1];
    const day = parts[0].length === 2 ? parts[0] : parts[2];
    return `${year}-${month}-${day}`;
};

exports.range = input => {
    let array = input
    .replace(/\D+/g, " ")
    .trim()
    .split(" ")
    .map(str => parseInt(str, 10));
    if (array.length === 2 && array[0] < array[1]) {
        array = Array(array[1] - array[0] + 1).fill().map((_, idx) => array[0] + idx);
    }
    if (!array.every((number, idx) => idx === array.length - 1 || number + 1 === array[idx + 1])) {
        return null; // array is not in sequence and ascending order
    }
    return array;
};

exports.yearRange = input => {
    const parts = input.split(/\D+/);
    const start = parts[0] && parseInt(parts[0], 10);
    let end = parts[1] && parseInt(parts[1], 10);
    if (!end) {
        return start;
    }
    if (end < 100) {
        end = end + start - start % 100;
    }
    if (end <= start) {
        return null; // not a year range, try another year handler
    }
    return `${start}-${end}`;
};

exports.array = chain => input => [chain ? chain(input) : input];

