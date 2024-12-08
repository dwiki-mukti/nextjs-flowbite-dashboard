export const searchItemArray = (array: string[], keyword: string) => {
    return array.filter((string) => String(string).toLowerCase().includes(String(keyword).toLowerCase()));
}