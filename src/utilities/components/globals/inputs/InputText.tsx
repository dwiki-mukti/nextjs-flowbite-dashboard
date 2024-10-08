'use client'

import React, { useEffect, useState } from 'react'
import { typeInputProps } from './Input'
import { inputValidator } from '@/utilities/utils/frontend/src/helperForm'
import { Label, TextInput } from 'flowbite-react'

export default function InputText({
    label,
    noLabel,
    isCleanup,
    validations,
    stateHandler,

    onInput,
    value,
    name,
    id,

    // flowbite props
    color,

    ...props
}: Omit<typeInputProps, 'aspectRatio' | 'options' | 'path' | 'onSearch' | 'noSearch' | 'noUnset'>) {
    const [getter, setter] = stateHandler ?? useState<typeStateForm>({})



    /**
     * useEffect
     */
    useEffect(() => {
        const currentValue = getter?.values?.[name];

        // adjust list uncompleteds column
        const addToUncompleteds = validations?.required && !currentValue && !getter?.uncompleteds?.includes(name);
        const removeFromUncompleteds = validations?.required && currentValue && getter?.uncompleteds?.includes(name);

        // adjust invalid
        const invalidMessages: string[] = inputValidator({ validations, fieldName: name, formControl: getter })
        const invalidMessagesIsChange = JSON.stringify(invalidMessages) != JSON.stringify(getter?.invalids?.[name])

        // sync value props component
        const isChangeValue = ![undefined, getter.values?.[name]].includes(value)

        // push to state
        if (addToUncompleteds || removeFromUncompleteds || invalidMessagesIsChange || isChangeValue) {
            setter((prev: typeStateForm) => {
                const uncompleteds = (prev?.uncompleteds ?? []).filter((uncompleted) => (uncompleted != name))
                if (addToUncompleteds) uncompleteds.push(name)

                const values = { ...(prev?.values ?? {}) }
                if (isChangeValue) values[name] = value

                return ({
                    ...(prev ?? {}), uncompleteds, values,
                    invalids: { ...(prev?.invalids ?? {}), [name]: invalidMessages },
                })
            })
        }
    }, [getter?.values, value]);


    useEffect(() => () => {
        if (isCleanup) {
            setter((prev) => {
                const result = { ...prev };
                delete result?.invalids?.[name];
                delete result?.labels?.[name];
                delete result?.values?.[name];
                result.uncompleteds = (result.uncompleteds ?? []).filter((res) => res != name)
                return result;
            });
        }
    }, []);


    /**
     * Render JSX
     */
    color = color ?? (getter?.invalids?.[name]?.length ? 'failure' : 'gray');
    return (
        <>
            {!noLabel && (
                <Label
                    htmlFor={id ?? name}
                    className="mb-2 block capitalize"
                    color={color}
                    children={label ?? name}
                />
            )}
            <TextInput
                value={getter?.values?.[name] ?? ''}
                onInput={(e) => {
                    if (onInput) onInput(e)
                    setter((prev: typeStateForm) => ({
                        ...prev,
                        values: { ...(prev.values), [name]: (e.target as HTMLInputElement).value }
                    }))
                }}
                name={name}
                className={`input-form`}
                {...props}
                id={id ?? name}
                color={color}
                helperText={(
                    (getter?.invalids?.[name]?.length)
                        ? (<div className='invalid-message'>{getter?.invalids?.[name][0]}</div>)
                        : undefined
                )}
            />
        </>
    )
}