'use client'

import { DetailedHTMLProps, Dispatch, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, SetStateAction } from 'react'
import InputText from './InputText'
import TextArea, { typeTextAreaProps } from './TextArea'
import InputCheck from './InputCheck'
import InputFile from './InputFile'
import Select from './Select'
import InputRadio from './InputRadio'

export interface typeInputProps extends Omit<
    DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >, 'defaultValue'> {
    name: string,
    type?: HTMLInputTypeAttribute | 'select' | 'textarea',
    stateHandler?: [typeStateForm, Dispatch<SetStateAction<typeStateForm>>],
    label?: ReactNode,
    noLabel?: boolean,
    isCleanup?: boolean,

    // custom props
    validations?: typeValidations,

    // flowbite props
    color?: 'failure' | 'gray' | 'info' | 'success' | 'warning'

    // input file
    aspectRatio?: number,

    // select
    options?: Array<string | number | { label: ReactNode, value: any }>,
    path?: string,
    onSearch?: (value: string) => any,
    noSearch?: boolean,
    noUnset?: boolean,
    noIcon?: boolean
}

function Input(props: typeInputProps) {
    const typeField = props?.type ?? ''
    if (['radio'].includes(typeField)) {
        return (<InputRadio {...props} />)
    } else if (['checkbox'].includes(typeField)) {
        return (<InputCheck {...props} />)
    } else if (['textarea'].includes(typeField)) {
        return (<TextArea {...props as typeTextAreaProps} />)
    } else if (["file"].includes(typeField)) {
        return (<InputFile {...props} />)
    } else if (['select'].includes(typeField)) {
        return (<Select {...props} />)
    } else {
        return (<InputText {...props} />)
    }
}

export default Input