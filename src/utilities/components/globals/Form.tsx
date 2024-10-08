'use client'

import { DetailedHTMLProps, Dispatch, FormEvent, FormEventHandler, Fragment, HTMLAttributes, ReactNode, SetStateAction, isValidElement, useContext, useEffect, useState } from 'react'
import Input, { typeInputProps } from './inputs/Input'
import { api, isInvalidForm, onInvalidRequestAdonis } from '@/utilities/utils/frontend'
import { Button } from 'flowbite-react'
import { useGlobalContext } from '../layouts/global/_partials/GlobalContext'



export interface typeFormInputProps extends Omit<typeInputProps, 'stateHandler'> {
  parentProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
};
interface FormProps {
  fields: (typeFormInputProps | JSX.Element)[];
  disabled?: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  stateHandler?: [typeStateForm, Dispatch<SetStateAction<typeStateForm>>],
  submitConfig?: {
    path: string,
    method?: string,
    onSuccess: (responseJson?: Record<string, any>) => any
  };
  sourceDefaultValue?: {
    path: string,
    keyResponseJson: string
  };
}

export default function Form({ fields,
  onSubmit,
  stateHandler,
  submitConfig,
  sourceDefaultValue,
  disabled
}: FormProps) {
  const { setStatusCode } = useGlobalContext()
  const [getter, setter] = stateHandler ?? useState<typeStateForm>({})



  /**
   * function handler
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // check length invalid message
    const invalidColumns = Object.keys(getter.invalids ?? {})
      .filter((fieldName) => (getter.invalids?.[fieldName]?.length));

    // get empty required field
    const emptyFields = fields.filter((field) => {
      if (isValidElement(field)) return false;
      field = field as typeFormInputProps;
      const isRequired = field.validations?.required
      const valueColumn = getter.values?.[field.name]
      return isRequired && !valueColumn
    }) as typeFormInputProps[];

    // on submit
    if (!(invalidColumns.length || emptyFields?.length)) {
      if (onSubmit) onSubmit(event);
      if (submitConfig?.path) {
        setter((prev: any) => ({ ...prev, statusCode: 202 }))
        api({
          path: submitConfig?.path,
          method: submitConfig?.method ?? 'POST',
          body: new FormData(event.target as HTMLFormElement)
        }).then(async (res) => {
          if (res.status == 200) {
            setter((prev: any) => ({ ...prev, statusCode: res.status }))
            submitConfig.onSuccess(await res.json())
          } else if (res.status == 422) {
            const { errors } = (await res.json());
            onInvalidRequestAdonis(errors, setter)
          } else {
            setter((prev: any) => ({ ...prev, statusCode: res.status }))
          }
        })
      }
    } else {
      // push empty field to key invalids on state
      const newInvalids = emptyFields?.reduce((resultObj, emptyField) => (
        { ...resultObj, [emptyField.name]: ['Field tidak boleh kosong!'] }
      ), {})
      setter((prev: typeStateForm) => ({
        ...prev,
        invalids: { ...(prev.invalids), ...newInvalids }
      }))
    }
  }



  useEffect(() => {
    if (
      sourceDefaultValue?.path &&
      sourceDefaultValue?.path?.length &&
      !Object.values(getter?.values ?? {})?.length &&
      getter.statusCode != 202
    ) {
      setter((prev) => ({ ...(prev ?? {}), statusCode: 202 }))
      api({ path: sourceDefaultValue.path, staleTime: 60 }).then(async (res) => {
        if (res.status == 200) {
          const defaultValueForm = (await res.json())?.data?.[sourceDefaultValue?.keyResponseJson] ?? {}
          setter((prev: typeStateForm) => ({
            ...(prev ?? {}),
            values: {
              ...(prev?.values ?? {}),
              ...(defaultValueForm ?? {})
            },
            statusCode: res.status
          }))
        } else {
          setStatusCode(res.status)
          setter((prev) => ({ ...(prev ?? {}), statusCode: res.status }))
        }
      })
    }
  }, [sourceDefaultValue])



  /**
   * Rendered JSX
   */
  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-12 gap-x-4 gap-y-2'>
        {fields.map((field, indexField: number) => {
          if (isValidElement(field)) {
            return (<Fragment key={indexField}>{field}</Fragment>);
          } else {
            const { parentProps, ...fieldProps } = field as typeFormInputProps;
            return (
              <div key={indexField} {...parentProps} className={parentProps?.className ?? 'col-span-12'} >
                <Input {...fieldProps} stateHandler={[getter, setter]} readOnly={disabled ?? fieldProps?.readOnly} />
              </div>
            );
          }
        })}
      </div>
      <div className='py-8'>
        {!disabled && (
          <div className='border-t flex justify-end pt-4'>
            <Button
              children='Simpan'
              isProcessing={getter.statusCode == 202}
              disabled={isInvalidForm(getter)}
              type='submit'
            />
          </div>
        )}
      </div>
    </form >
  )
}