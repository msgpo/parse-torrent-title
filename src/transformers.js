exports.none = input => input;

exports.value = staticValue => () => staticValue;

exports.integer = input => parseInt(input, 10);

exports.boolean = () => true;

exports.lowercase = input => input.toLowerCase();

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

exports.array = chain => input => [chain ? chain(input) : input];

