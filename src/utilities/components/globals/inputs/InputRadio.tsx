'use client'

import { useState } from "react"
import { typeInputProps } from "./Input"
import { Label, Radio } from "flowbite-react"

export default function InputRadio({
    label,
    noLabel,
    stateHandler,

    onChange,
    checked,
    value,
    name,
    id,

    // flowbite props
    color,

    ...props
}: Omit<typeInputProps, 'validations' | 'aspectRatio' | 'options' | 'path' | 'onSearch' | 'noSearch' | 'noUnset' | 'type'>) {
    const [getter, setter] = stateHandler ?? useState<typeStateForm>({})

    /**
     * Render JSX
     */
    color = color ?? (getter?.invalids?.[name]?.length ? 'failure' : 'gray');
    return (
        <>
            <Radio
                id={id ?? name}
                name={name}
                onChange={(e) => {
                    if (onChange) onChange(e)
                    setter((prev: typeStateForm) => ({
                        ...prev,
                        values: { ...((prev)?.values ?? {}), [name]: (e.target.value) }
                    }))
                }}
                value={value}
                checked={checked ?? (getter?.values?.[name] == value)}
                {...props}
                color={color}
            />
            {!noLabel && (
                <Label
                    htmlFor={id ?? name}
                    className="mb-2 block capitalize"
                    color={color}
                    children={label ?? name}
                />
            )}
        </>
    )
}
