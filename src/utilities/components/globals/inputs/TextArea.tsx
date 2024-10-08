'use client'

import { inputValidator } from '@/utilities/utils/frontend';
import { Label, Textarea } from 'flowbite-react';
import React, { DetailedHTMLProps, Dispatch, ReactNode, SetStateAction, TextareaHTMLAttributes, useEffect, useRef, useState } from 'react'

export interface typeTextAreaProps extends Omit<DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>, 'defaultValue' | 'label'> {
    name: string;
    label?: ReactNode;
    noLabel?: boolean;
    isCleanup?: boolean;
    validations?: typeValidations;
    stateHandler: [typeStateForm, Dispatch<SetStateAction<typeStateForm>>];
}

export default function TextArea({
    label,
    noLabel,
    isCleanup,
    validations,
    stateHandler,

    className,
    onInput,
    value,
    name,
    id,

    // flowbite props
    color,

    ...props
}: typeTextAreaProps) {
    const refInput = useRef<HTMLTextAreaElement>(null)
    const [getter, setter] = stateHandler ?? useState<typeStateForm>({})



    /**
     * useEffect
     */
    useEffect(() => {
        const currentValue = getter?.values?.[name];

        // adjust list uncompleteds column
        const addToUncompleteds = validations?.required && !currentValue && !getter?.uncompleteds?.includes(name);
        const removeFromUncompleteds = validations?.required && currentValue && getter?.uncompleteds?.includes(name);

        // validating value column
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
                    invalids: { ...(prev?.invalids ?? {}), [name]: invalidMessages }
                })
            })
        }
    }, [getter?.values?.[name], value]);


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
            <Textarea
                ref={refInput}
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