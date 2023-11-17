const useColorVariation = (rgbColor: string, variationValues: number[]): string => {
    const rgb = (rgbColor.match(/\d+/g) as RegExpMatchArray).map(Number);
    const result = rgb.map((element, index) => element + variationValues[index]);
    return `rgb(${result.join(',')})`;
};

export default useColorVariation;
