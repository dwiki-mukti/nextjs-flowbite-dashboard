'use client'

import { useEffect, useState } from "react"
import { typeInputProps } from "./Input"
import { Checkbox, Label } from "flowbite-react"

export default function InputCheck({
    label,
    noLabel,
    stateHandler,

    defaultChecked,
    onChange,
    checked,
    name,
    id,

    // flowbite props
    color,

    ...props
}: Omit<typeInputProps, 'validations' | 'aspectRatio' | 'options' | 'path' | 'onSearch' | 'noSearch' | 'noUnset' | 'type'>) {
    const defaultStateHandler = useState<typeStateForm>({});
    const [getter, setter] = stateHandler ?? defaultStateHandler;


    useEffect(() => {
        if (defaultChecked != undefined && getter.values?.[name] == undefined) {
            setter((prev: typeStateForm) => {
                return ({
                    ...prev,
                    values: {
                        ...(prev.values ?? {}),
                        [name]: (defaultChecked) ? 'on' : ''
                    }
                })
            })
        }
    }, [defaultChecked])


    /**
     * Render JSX
     */
    color = color ?? (getter?.invalids?.[name]?.length ? 'failure' : 'gray');
    return (
        <>
            <div className={`flex items-center gap-2`}>
                <Checkbox
                    id={id ?? name}
                    name={name}
                    onChange={(e) => {
                        if (onChange) onChange(e)
                        setter((prev: typeStateForm) => {
                            return ({
                                ...prev,
                                values: {
                                    ...(prev.values ?? {}),
                                    [name]: (e.target.checked) ? 'on' : ''
                                }
                            })
                        })
                    }}
                    checked={Boolean(checked ?? getter?.values?.[name])}
                    {...props}
                    color={color}
                />
                {!noLabel && (
                    <Label
                        htmlFor={id ?? name}
                        className="block"
                        color={color}
                    >{label ?? name}</Label>
                )}
            </div>
        </>
    )
}
