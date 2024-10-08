import { Dispatch, SetStateAction } from "react";

export function isInvalidForm(getter: typeStateForm) {
    if (getter?.uncompleteds?.length) return true
    for (const invalidMessages of Object.values(getter?.invalids ?? {})) {
        if (invalidMessages?.length) return true
    }
    return false
}


export function changeAttributeInput(target: any, attribute: string, value: any) {
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, attribute)
        ?.set?.call(target, value);
    var eventChange = new Event('change', { bubbles: true });
    target.dispatchEvent(eventChange);
}



// for 422 default response BFF adonisJS
export const onInvalidRequestAdonis = (
    errors: any,
    setter?: Dispatch<SetStateAction<typeStateForm>>
) => {
    const invalids: Record<string, any> = {}

    for (const error of errors) {
        const { field, message } = error
        invalids[field] = [...(invalids?.[field] ?? []), message]
    }

    if (setter) {
        setter((prev: typeStateForm) => ({
            ...(prev ?? {}),
            invalids,
            statusCode: 200
        }))
    }

    return invalids
}


/**
 * Validator for any InputComponent 
 */
export function inputValidator({
    validations,
    formControl,
    fieldName
}: {
    validations: typeValidations | undefined,
    formControl: typeStateForm,
    fieldName: string
}) {
    const invalidMessages: string[] = [];

    if (validations) {
        const value = formControl?.values?.[fieldName]
        if ((validations.required) || value) {
            if (!value && (value !== undefined)) {
                invalidMessages.push('Field tidak boleh kosong!')
            }
            if (validations.max && validations.max < value?.length) {
                invalidMessages.push(`Harus kurang dari ${validations.max} karakter!`)
            }
            if (validations.min && validations.min > value?.length) {
                invalidMessages.push(`Harus lebih dari ${validations.min} karakter!`)
            }
            if (validations.length && validations.length != value?.length) {
                invalidMessages.push(`Harus berisi ${validations.length} karakter!`)
            }
            if (validations.confirmationColumn && (value != formControl?.values?.[validations.confirmationColumn])) {
                invalidMessages.push(`Input harus sesuai dengan isi kolom konfirmasi!`)
            }
        }
    }

    return invalidMessages;
}