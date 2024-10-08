


export const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
export const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];


export function years(startYear: number, endYear: (number | null)) {
    let start = startYear;
    let end = endYear ?? (new Date()).getFullYear();
    let arrayYear: Array<number> = [];
    for (end; end > start; end--) {
        arrayYear.push(end);
    }
    return arrayYear;
}


export function randItemOnArray(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)]
}