'use client'

import Table from '@/utilities/components/globals/Table'
import { Button, Card, Drawer } from 'flowbite-react'
import React, { FormEvent, useEffect, useState } from 'react'
import { HiBookOpen, HiEye, HiPencilAlt, HiPlus } from "react-icons/hi";
import Form from '@/utilities/components/globals/Form'
const sampleBooks = [
  {
    id: 1,
    title: 'Kancil dan Buaya',
    writer: 'Orang Melayu'
  },
  {
    id: 2,
    title: 'Malin Kundang',
    writer: 'Orang Sumatra'
  },
  {
    id: 3,
    title: 'Legenda Surabaya',
    writer: 'Orang Surabaya'
  },
];


export default function TableExample() {
  const [StateFormBook, setStateFormBook] = useState<typeStateForm>({ valuePrimaryKey: undefined });
  const [StateDetailBook, setStateDetailBook] = useState<typeStateForm>({ valuePrimaryKey: undefined });
  const [Books, setBooks] = useState<any[]>([]);



  /**
   * Function Handler
   */
  function onShowEditBook(dataRow: any) {
    const values = Books.find((book) => (book.id == dataRow.id))
    setStateFormBook({ values, valuePrimaryKey: dataRow.id });
  }

  function onStateDetailBookBook(dataRow: any) {
    const values = Books.find((book) => (book.id == dataRow.id))
    setStateDetailBook({ values, valuePrimaryKey: dataRow.id });
  }

  function onSubmitBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBooks((prev) => {
      let id = Number(StateFormBook.values?.id);
      const newBooks = prev.filter((newBook) => newBook.id != id);
      if (isNaN(id)) id = Date.now();
      newBooks.unshift({ ...(StateFormBook.values ?? {}), id });
      return newBooks;
    })
    setStateFormBook({ valuePrimaryKey: undefined });
  }



  /**
   * Use Effect
   */
  useEffect(() => {
    setBooks(sampleBooks)
  }, [])



  /**
   * Rendered JSX
   */
  return (
    <>
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">List Buku</h5>
        </div>
        <Table
          rightElement={
            <div className="ml-auto">
              <div className="flex gap-2">
                <Button onClick={() => setStateFormBook({ valuePrimaryKey: true })}>
                  <HiPlus className="mr-2 h-5 w-5" /> Buat buku
                </Button>
              </div>
            </div>
          }
          prototypeTable={[
            { keyData: 'title', title: 'Judul' },
            { keyData: 'writer', title: 'Penulis' },
          ]}
          data={{
            dataRows: Books,
          }}
          actions={[
            ((dataRow) => {
              return (
                <>
                  <Button onClick={() => onShowEditBook(dataRow)}>
                    <HiPencilAlt className="mr-2 h-5 w-5" /> Edit
                  </Button>
                  <Button color="light" outline onClick={() => onStateDetailBookBook(dataRow)}>
                    <HiEye className="mr-2 h-5 w-5" /> Preview
                  </Button>
                </>
              )
            }),
            'delete'
          ]}
        />
      </Card>



      <Drawer open={StateFormBook.valuePrimaryKey != undefined} onClose={() => setStateFormBook({})}>
        <Drawer.Header
          title={`FORM ${((typeof StateDetailBook.valuePrimaryKey) == 'boolean' ? 'TAMBAH' : 'EDIT')} BUKU`}
          titleIcon={HiBookOpen}
        />
        <Drawer.Items>
          <Form
            stateHandler={[StateFormBook, setStateFormBook]}
            onSubmit={onSubmitBook}
            fields={[
              {
                name: 'title',
                label: 'Judul',
              },
              {
                name: 'writer',
                label: 'penulis',
              }
            ]}
          />
        </Drawer.Items>
      </Drawer>



      <Drawer open={StateDetailBook.valuePrimaryKey != undefined} onClose={() => setStateDetailBook({})}>
        <Drawer.Header
          title={`DETAIL BUKU`}
          titleIcon={HiBookOpen}
        />
        <Drawer.Items>
          <div>
            <div className='text-xs font-bold'>Judul Buku:</div>
            <div>{StateDetailBook.values?.title ?? ''}</div>
          </div>
          <div className='mt-4'>
            <div className='text-xs font-bold'>Penulis</div>
            <div>{StateDetailBook.values?.writer ?? ''}</div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  )
}
