import { DateTime } from "luxon";
import { days, months } from "./dataset";

/**
 * interfaces
 */
export type ReplaceReturnType<
    T extends (...a: any) => any, TNewReturn
> = (...a: Parameters<T>) => TNewReturn;



/**
 * string
 */
export const strLimit = (text: string, limit: number) => (text ?? '').slice(0, limit);

export const strTruncate = (text: string, limit = 10) => strLimit(text, limit) + ((text ?? '').length > limit ? "..." : "");

export const capitalizeFirstLetter = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
}



/**
 * Number
 */
export const setDigit = (number: string | number, digitLength: number) => ((Number(number)).toLocaleString('en-US', { minimumIntegerDigits: digitLength }))

export const formatRupiah = (nominal: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(nominal);
}

export function numberToRoman(num?: number) {
    if (!num || isNaN(num)) return ''
    var roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var str = '';

    for (var [keyRoman, valueRoman] of Object.entries(roman)) {
        var q = Math.floor(num / valueRoman);
        num -= q * valueRoman;
        str += keyRoman.repeat(q);
    }

    return str;
}



/**
 * Date
 */
export const epoch10to13 = (epoch: number) => Number(String(epoch).length == 10 ? Math.floor(epoch * 1000) : epoch);

export const epoch13to10 = (epoch: number) => Number(String(epoch).length == 13 ? Math.floor(epoch / 1000) : epoch);

export const dateToEpoch13 = (date: any) => {
    if (!isNaN(date) && (String(date).length == 10)) date = date * 1000;
    date = Number(new Date(date));
    return (!isNaN(date)) ? date : 0;
}

export const dateToEpoch10 = (date: any) => {
    date = dateToEpoch13(date);
    return Math.floor(date ? (date / 1000) : 0);
};

export function formatValueInputDate(date: any) {
    const epoch = dateToEpoch10(date);
    return Number.isInteger(epoch) ? DateTime.fromSeconds(epoch).toFormat('yyyy-MM-dd') : epoch
}

export function formatValueInputDateTime(date: any) {
    const epoch = dateToEpoch10(date);
    return Number.isInteger(epoch) ? DateTime.fromSeconds(epoch).toFormat(`yyyy-MM-dd'T'mm:ss`) : epoch;
}

export const formatTanggal = (time: number, format?: string) => {
    if (!time) return undefined;
    format = format ?? 'DDDD, dd MM YYYY'
    const newDate = new Date(epoch10to13(time));
    var year = newDate.getFullYear();
    var month = months[newDate.getMonth()]
    var date = newDate.getDate();
    const day = days[newDate.getDay()]
    format = format.replace("DDDD", day)
    format = format.replace("dd", String(date))
    format = format.replace("MM", month)
    format = format.replace("YYYY", String(year))
    return format
}


/**
 * URL
 */
export const objectToQueryUrl = (params: Record<string, any>) => {
    let queryPharams: Array<any> = [];
    try {
        Object.keys(params).forEach((res) => {
            if (params[res]) {
                queryPharams.push(encodeURIComponent(res) + "=" + encodeURIComponent(params[res]));
            }
        })
    } catch (error) { }
    return queryPharams.join("&")
}

export const queryUrToObject = (params: string) => {
    // let queryPharams: Array<any> = [];
    // try {
    //     Object.keys(params).forEach((res) => {
    //         if (params[res]) {
    //             queryPharams.push(encodeURIComponent(res) + "=" + encodeURIComponent(params[res]));
    //         }
    //     })
    // } catch (error) { }
    // return queryPharams.join("&")
}



/**
 * File
 */
export function blobToFile(blob: string, resultFileName: string) {
    const binary = atob(blob.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    const resultFile = new File([new Uint8Array(array)], resultFileName, {
        type: 'image/png'
    });
    return resultFile
}


/**
 * Tipe data
 */
export function formDataToObject(formData: FormData) {
    const result: Record<string, any> = {}
    formData.forEach((value, key) => (result[key] = value))
    return result
}