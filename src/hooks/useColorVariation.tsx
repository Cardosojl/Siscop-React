const useColorVariation = (rgbColor: string, operation: '+' | '-', variationValues: number[]): string => {
    const rgb = (rgbColor.match(/\d+/g) as RegExpMatchArray).map(Number);
    const result = rgb.map((element, index) => (operation === '+' ? element + variationValues[index] : element - variationValues[index]));
    return `rgb(${result.join(',')})`;
};

export default useColorVariation;
