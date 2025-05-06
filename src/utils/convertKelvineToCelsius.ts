


export function convertKelvinToCelsius(tempInkelvin: number): number {
    const tempInCelsius = tempInkelvin - 273.15;
    return Math.floor(tempInCelsius);
}