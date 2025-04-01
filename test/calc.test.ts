import add from 'calculationfile';

describe('add function', () => {
    test('should handle comma-separated numbers', () => {
        expect(add('1,2,3')).toBe(6);
    });

    test('should handle newline-separated numbers', () => {
        expect(add('1\n2\n3')).toBe(6);
    });

    test('should handle mixed comma and newline delimiters', () => {
        expect(add('1,2\n3')).toBe(6);
    });

    test('should handle custom delimiter', () => {
        expect(add('//;\n1;2;3')).toBe(6);
    });

    test('should handle custom delimiter with different character', () => {
        expect(add('//|\n1|2|3')).toBe(6);
    });

    test('should return 0 for empty string', () => {
        expect(add('')).toBe(0);
    });

    test('should handle single number', () => {
        expect(add('5')).toBe(5);
    });

    test('should throw error for negative numbers', () => {
        expect(() => add('1,-2,3')).toThrow('negative numbers not allowed -2');
    });

    test('should throw error for multiple negative numbers', () => {
        expect(() => add('-1,-2,3')).toThrow('negative numbers not allowed -1,-2');
    });

    test('should throw error for negative numbers with custom delimiter', () => {
        expect(() => add('//;\n1;-2;3')).toThrow('negative numbers not allowed -2');
    });

    test('should handle non-numeric values gracefully', () => {
        expect(add('1,a,3')).toBeNaN();
    });
});