export const useCaptiaize = (string) => {
    return `${string.toUpperCase().slice(0, 1)}${string.toLowerCase().slice(1)}`
}