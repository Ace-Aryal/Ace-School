import bs from 'bikram-sambat-js';

const useConvertADToBC = (date = "2000-01-01") => {
    // expected date format yyyy-mm-dd
    const [year, month, day] = date.split("-").map(Number)
    const converted = bs.ad2bs({ year, month, day });
    return `${converted.year}-${converted.month}-${converted.day}`;

}
export default useConvertADToBC