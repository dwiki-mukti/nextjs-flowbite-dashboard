'use client'
import { api, changeAttributeInput } from '@/utilities/utils/frontend';
import { ReactNode, useEffect, useRef, useState } from 'react'
import { typeInputProps } from './Input';
import { HiChevronDown } from "react-icons/hi";

export const classNameInputForm = 'input-form w-full h-[2.25rem] bg-white px-3 border rounded-md shadow-sm focus:outline-none';

interface typeSelect extends Omit<typeInputProps, 'aspectRatio' | 'placeholder'> {
    placeholder?: ReactNode,
    value?: string | number | readonly string[],
    noIcon?: boolean
}
export default function Select({
    stateHandler,

    noIcon,
    noLabel,
    noUnset,
    onSearch,
    isCleanup,
    validations,
    noSearch,
    options,
    path,

    label,
    disabled,
    readOnly,
    placeholder,
    className,
    onChange,
    value,
    name,

    ...props
}: typeSelect) {
    const [getter, setter] = stateHandler ?? useState<typeStateForm>({})
    const refInput = useRef<HTMLInputElement>(null);
    const [IsFocus, setIsFocus] = useState(false);
    const [Search, setSearch] = useState('');
    const [CurrentOptions, setCurrentOptions] = useState<Array<any>>()


    /**
     * Function Handler
     */
    const loadOptions = (defaultValue?: any) => {
        if (path && !options) {
            // Handle overlap on fetching data
            const now = Date.now();
            (window as any).fetchStartTime = {
                ...((window as any).fetchStartTime ?? {}),
                [`option@${name}:${path}`]: now
            }

            // Fetching data
            api({
                path,
                staleTime: 60,
                objParams: { search: Search, defaultValue: defaultValue ?? refInput.current?.value }
            })
                .then(async (response) => {
                    if ((response.status == 200) && (now == (window as any)?.fetchStartTime?.[`option@${name}:${path}`])) {
                        let { options: onlineOptions, labelKey, valueKey } = (await response.json()).data;
                        if (labelKey && valueKey) {
                            onlineOptions = onlineOptions?.map((option: any) => {
                                const label = option?.[labelKey]
                                const value = option?.[valueKey]
                                return (label && value) ? { label, value } : (value ?? option)
                            })
                        }

                        setCurrentOptions(onlineOptions);
                    }
                })
        }
    }



    /**
     * Use Effect
     */
    useEffect(() => {
        if (Array.isArray(options)) setCurrentOptions(options)
    }, [options])

    useEffect(() => loadOptions(), [path])

    useEffect(() => {
        let delaySearch = setTimeout(() => loadOptions(), 1000);
        return (() => clearTimeout(delaySearch));
    }, [Search])

    useEffect(() => {
        if ((validations?.required && !getter?.values?.[name] && !getter?.uncompleteds?.includes(name))) {
            setter((prev: typeStateForm) => ({
                ...prev,
                uncompleteds: [...(prev?.uncompleteds ?? []), name]
            }))
        }
    }, [validations])


    useEffect(() => {
        // select new value
        let newValue = getter?.values?.[name];
        if (![undefined, newValue].includes(value)) {
            newValue = value
        } else if (noUnset && !newValue && CurrentOptions?.length) {
            newValue = CurrentOptions[0]?.value ?? CurrentOptions[0]
        }

        // get selected option
        const selectedOption = CurrentOptions?.reduce((result, CurrentOption) => {
            const isSelectedOption = (CurrentOption?.value ?? CurrentOption) == newValue
            return ((isSelectedOption && !result) ? CurrentOption : result)
        }, null)

        if (newValue && !selectedOption) {
            // reload options
            loadOptions(newValue)
        } else {
            // set value hidden html input
            if (refInput.current && refInput.current.value != (newValue ?? '')) {
                refInput.current.value = newValue ?? ''
            }

            // set state form handler
            const newLabel = selectedOption?.label ?? selectedOption
            const isChangeValue = getter?.values?.[name] != newValue
            const isChangeLabel = getter?.labels?.[name] != newLabel
            if (isChangeValue || isChangeLabel) {
                setter((prev) => {
                    const values = { ...(prev?.values ?? {}) }
                    const labels = { ...(prev?.labels ?? {}) }
                    if (newValue == undefined) {
                        delete values[name]
                        delete labels[name]
                    } else {
                        values[name] = newValue
                        labels[name] = newLabel
                    }

                    let uncompleteds = prev?.uncompleteds ?? []
                    if (values?.[name] && uncompleteds?.includes(name)) {
                        uncompleteds = uncompleteds.filter((res) => (res != name))
                    }

                    return ({ ...(prev ?? {}), labels, values, uncompleteds })
                })
            }
        }
    }, [getter?.values?.[name], CurrentOptions, value, refInput])


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
     * Rendered JSX
     */
    return (
        <div className='relative'>
            <div className={`${getter?.invalids?.[name]?.length ? '[&_.label-input-form]:text-red-500 [&_.input-form:not(:disabled):focus]:text-red-500' : ''}`}>
                {(!noLabel) && (
                    <label onClick={() => { if (!(disabled || readOnly)) setIsFocus(true) }} className='label-input-form'>
                        {label ?? name}
                    </label>
                )}
                <div className="flex cursor-pointer">
                    <input
                        {...props}
                        ref={refInput}
                        name={name}
                        disabled={disabled}
                        readOnly={readOnly}
                        type='text'
                        style={{ display: 'none', ...(props?.style ?? {}) }}
                        onChange={(e) => {
                            if (onChange) onChange(e)
                            const newValue = e.target.value
                            setter((prev: typeStateForm) => {
                                const uncompleteds = prev?.uncompleteds?.filter((res) => (res != name)) ?? []
                                const invalids = { ...(prev.invalids ?? {}) }
                                const values = { ...(prev.values ?? {}) }
                                if (newValue) {
                                    delete invalids[name]
                                    values[name] = newValue
                                } else {
                                    if (validations?.required) invalids[name] = ['Field tidak boleh kosong!']
                                    delete values[name]
                                }
                                return {
                                    ...prev,
                                    uncompleteds,
                                    invalids,
                                    values,
                                }
                            })
                        }}
                    />
                    <div
                        className={`${classNameInputForm} ${(disabled || readOnly) ? 'cursor-default' : ''} ${disabled ? 'cursor-default bg-gray-100' : ''} ${IsFocus ? 'border-primary' : ''}`}
                        onClick={() => { if (!(disabled || readOnly)) setIsFocus(true) }}
                    >
                        <div className='h-full flex items-center'>
                            {getter?.labels?.[name] ?? (<span className='text-gray-400'>{placeholder}</span>)}
                        </div>
                    </div>
                    {!(noIcon || disabled || readOnly) && (
                        <div className='w-0 flex items-center'>
                            <HiChevronDown
                                className='ml-[-2rem] w-[1.5rem]'
                            />
                        </div>
                    )}
                </div>
                {Boolean(getter?.invalids?.[name]?.length) && (
                    <div className='invalid-message'>{getter?.invalids?.[name][0]}</div>
                )}
            </div>
            {IsFocus && (
                <div className="absolute inset-x-0 pt-2 z-10">
                    <div className="w-full bg-white lg:rounded-lg border">
                        <div className={noSearch ? 'opacity-0 h-0' : 'p-2'}>
                            <input
                                autoFocus={true}
                                className={`focus:border-gray-300 ${classNameInputForm}`}
                                onChange={(e) => {
                                    setSearch((e.target.value) ?? '')
                                    if (onSearch) onSearch(e.target.value ?? '')
                                }}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setIsFocus(false)
                                        setSearch('')
                                    }, 300)
                                }}
                                readOnly={noSearch}
                            />
                        </div>

                        <div className="relative overflow-y-auto overflow-x-hidden max-h-[10rem]">
                            <div className='divide-y border-t [&>*]:h-10 [&>*]:flex [&>*]:items-center [&>*]:px-3 [&>*]:cursor-pointer'>
                                {!(noUnset || validations?.required) && (
                                    <div
                                        onClick={() => {
                                            if (getter?.values?.[name] != undefined) {
                                                changeAttributeInput(refInput.current, 'value', '')
                                            }
                                        }}
                                        className={`text-gray-500 text-sm hover:bg-sky-200/30`}
                                    >unset</div>
                                )}
                                {CurrentOptions?.filter((option) => (
                                    String((option?.label ?? option)).toLowerCase().includes(String(Search).toLowerCase())
                                ))?.map((option, indexOption) => {
                                    const newValue = option.value ?? option
                                    return (
                                        <div
                                            key={indexOption}
                                            className={`truncate hover:bg-sky-200/30 ${(newValue == getter?.values?.[name]) ? 'bg-sky-200/30' : ''}`}
                                            onClick={() => {
                                                if (getter?.values?.[name] != newValue) {
                                                    changeAttributeInput(refInput.current, 'value', newValue)
                                                }
                                            }}
                                        >{option.label ?? option}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
