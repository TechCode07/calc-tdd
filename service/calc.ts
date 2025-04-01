const extractDelimiterAndNumbers = (input: string) => {
    if (!input?.startsWith('//')) {
        return { delimiter: /,|\n/, numbers: input };
    }

    const [, delimiter, numbers] = input.match(/\/\/(.)\n(.*)/) as RegExpMatchArray;
    const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return { delimiter: new RegExp(escapedDelimiter), numbers };
};

const parseNumbers = (numbers: string, delimiter: RegExp) => numbers.split(delimiter).map(Number);

const validateNumbers = (numbers: number[]) => {
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(',')}`);
    }
};

const calculateSum = (numbers: number[]) => numbers.reduce((sum, num) => sum + num, 0);

const add = (numbers: string): number => {
    if (!numbers) return 0;

    const { delimiter, numbers: numberString } = extractDelimiterAndNumbers(numbers);
    const numArray = parseNumbers(numberString, delimiter);
    validateNumbers(numArray);
    return calculateSum(numArray);
};

export default add;