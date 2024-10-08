'use client'

import { api } from '@/utilities/utils/frontend';
import { usePathname } from 'next/navigation';
import { CSSProperties, Fragment, ReactNode, useEffect, useState } from 'react'
import Search from './Search';
import Confirm from './Confirm';
import { Button, Pagination, Table } from 'flowbite-react';
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";



interface typeDataTable {
    dataRows?: (Record<string, any>)[];
    paginate?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    primaryKey?: string;
    statusCode?: number;
}
interface typeTableProps {
    className?: string,

    prototypeTable: Array<{
        title: string,
        keyData: string | ((dataRow: Record<string, any>, primaryKey?: any) => any),
        className?: string,
        style?: CSSProperties
    }>,
    path?: string,
    data?: typeDataTable,
    actions?: (
        'show' | 'edit' | 'delete' | ((dataRow: Record<string, any>, valuePrimaryKey?: any) => any)
    )[],
    objParams?: Record<string, any>,

    onDelete?: (idItem: any) => void,
    onSearch?: (value: string) => void,
    onChangeParams?: (objectParams: any) => ReactNode,

    noHeader?: boolean,
    noNumber?: boolean,
    noSearch?: boolean,
    noPaginate?: boolean,

    leftElement?: ReactNode,
    rightElement?: ReactNode
}
export default function TableCompnent({
    className,

    prototypeTable,
    path,
    data,
    actions,
    objParams,

    onDelete,
    onSearch,
    onChangeParams,

    noHeader,
    noNumber,
    noSearch,
    noPaginate,

    leftElement,
    rightElement,
}: typeTableProps) {
    const pathName = usePathname();
    const [DataTables, setDataTables] = useState<typeDataTable>({});
    const [ShowConfirmDelete, setShowConfirmDelete] = useState(null);
    const [ObjectParams, setObjectParams] = useState<any>({});




    /**
     * Function Handler
     */
    function loadData() {
        if (path) {
            setDataTables((prev) => ({ ...prev, statusCode: 202 }))
            api({
                path,
                objParams: ObjectParams,
                staleTime: 60
            }).then(async (res) => {
                if (res.status == 200) {
                    const { dataTable } = (await res.json()).data
                    setDataTables({ ...dataTable, statusCode: 200 })
                }
            })
        }
    }

    function handleDelete() {
        const idDeleted = ShowConfirmDelete
        if (onDelete) {
            onDelete(idDeleted);
        } else if (!data && path) {
            api({
                path: `${path}/${idDeleted}`,
                method: 'DELETE'
            }).then(async (res) => {
                if (res.status == 200) {
                    (window as any).fetchDataCached = {}
                    setShowConfirmDelete(null);
                    loadData();
                }
            })
        } else {
            setShowConfirmDelete(null);
        }
    };

    function handleSearch(searchWord: string) {
        if (data) {
            setDataTables(() => ({
                ...data,
                dataRows: data.dataRows?.filter((dataRow) => {
                    return prototypeTable?.filter(({ keyData }) => (
                        (typeof (keyData) == 'function' ? keyData(dataRow) : dataRow[keyData])
                            .toLowerCase()
                            .match(searchWord.toLowerCase())
                    )).length
                })
            }))
        }
        if (onSearch) onSearch(searchWord)
        setObjectParams((prev: typeDataTable) => ({
            ...prev,
            page: 1,
            search: searchWord
        }))
    }



    /**
     * useEffect
     */
    useEffect(() => {
        if (data) setDataTables(data);
    }, [data])

    useEffect(() => {
        if (!data) loadData();
    }, [path, ObjectParams])

    useEffect(() => {
        if (objParams != ObjectParams) {
            setObjectParams((prev: typeDataTable) => ({
                ...prev,
                page: 1,
                ...(objParams ?? {})
            }))
        }
    }, [objParams])

    useEffect(() => {
        if (onChangeParams && objParams != ObjectParams) {
            onChangeParams(ObjectParams)
        }
    }, [ObjectParams])



    /**
     * Rendered JSX
     */
    return (
        <>
            <div className="flex gap-4 flex-col-reverse md:flex-row pb-2">
                <div className="flex gap-2 text-xs">
                    {!noSearch && <Search onSubmit={handleSearch} />}
                    {leftElement}
                </div>
                <div className='flex gap-2 md:ml-auto'>
                    {rightElement}
                </div>
            </div>
            <div>
                <div className={`overflow-auto ${className}`}>
                    <Table hoverable>
                        {!noHeader && (
                            <Table.Head>
                                {!noNumber && <Table.HeadCell style={{ width: "1px" }}>#</Table.HeadCell>}
                                {prototypeTable?.map((column, indexColumn) => {
                                    return (
                                        <Table.HeadCell key={indexColumn} className={column.className} style={column.style}>
                                            {column.title}
                                        </Table.HeadCell>
                                    );
                                })}
                                <Table.HeadCell>
                                    <span className="sr-only">Action</span>
                                </Table.HeadCell>
                            </Table.Head>
                        )}
                        <Table.Body className="divide-y">
                            {((!DataTables?.dataRows?.length) || (DataTables?.statusCode == 202)) ? (
                                <Table.Row>
                                    <Table.Cell
                                        colSpan={(prototypeTable?.length ?? 0) + (noNumber ? 1 : 2)}
                                        className="text-center text-gray-500"
                                        style={{ padding: "4rem 0" }}
                                    >
                                        {(DataTables?.statusCode == 202) ? 'Loading...' : 'Data Kosong'}
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                DataTables.dataRows?.map((dataRow: Record<string, any>, indexDataRow) => {
                                    const valuePrimaryKey = dataRow?.[DataTables.primaryKey ?? 'id'];
                                    return (
                                        <Table.Row key={indexDataRow}>
                                            {!noNumber && (
                                                <Table.Cell>
                                                    {((ObjectParams?.perPage ?? 10) * ((ObjectParams?.page ?? 1) > 0 ? (ObjectParams?.page ?? 1) - 1 : 0)) + indexDataRow + 1}
                                                </Table.Cell>
                                            )}

                                            {/* data rows */}
                                            {prototypeTable?.map((column, indexColumn) => {
                                                const { keyData } = column;
                                                return (
                                                    <Table.Cell key={indexColumn}>
                                                        {typeof (keyData) == 'function' ? keyData(dataRow) : dataRow[keyData]}
                                                    </Table.Cell>
                                                )
                                            })}

                                            <Table.Cell className="inline-flex items-center gap-3 text-base">
                                                {actions?.map((action, indexAction) => {
                                                    if (typeof (action) == 'function') {
                                                        return (
                                                            <Fragment key={indexAction}>
                                                                {action(dataRow, valuePrimaryKey) as ReactNode}
                                                            </Fragment>
                                                        );
                                                    } else if (action == 'edit') {
                                                        return (
                                                            <Button
                                                                key={indexAction}
                                                                href={`${pathName}/${valuePrimaryKey}`}
                                                            >
                                                                <HiPencilAlt className="mr-2 h-5 w-5" /> Edit
                                                            </Button>
                                                        );
                                                    } else if (action == 'show') {
                                                        return (
                                                            <Button
                                                                key={indexAction}
                                                                color='light'
                                                                outline
                                                                href={`${pathName}/data/${valuePrimaryKey}`}
                                                            >
                                                                <HiEye className="mr-2 h-5 w-5" /> Detail
                                                            </Button>
                                                        );
                                                    } else if (action == 'delete') {
                                                        return (
                                                            <Button
                                                                key={indexAction}
                                                                color="red"
                                                                onClick={() => setShowConfirmDelete(valuePrimaryKey)}
                                                            >
                                                                <HiTrash className="mr-2 h-5 w-5" /> Hapus
                                                            </Button>
                                                        );
                                                    }
                                                })}
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })
                            )}
                        </Table.Body>
                    </Table>
                </div>
                <Confirm
                    show={ShowConfirmDelete != null}
                    toHide={() => setShowConfirmDelete(null)}
                    onApproved={handleDelete}
                />
            </div>
            {!noPaginate && (
                <div className="border-t py-4 flex items-center">
                    <div>
                        <Pagination
                            layout="table"
                            currentPage={ObjectParams?.page ?? 1}
                            totalPages={DataTables.paginate?.last_page ?? 1}
                            onPageChange={() => { }}
                            theme={{ pages: { base: 'hidden' } }}
                        />
                    </div>
                    <div className="ml-auto">
                        <Pagination
                            currentPage={ObjectParams?.page ?? 1}
                            totalPages={DataTables.paginate?.last_page ?? 1}
                            onPageChange={(page) => {
                                setObjectParams((prev: typeDataTable) => ({ ...prev, page }))
                            }}
                            showIcons={true}
                            nextLabel=""
                            previousLabel=""
                        />
                    </div>
                </div>
            )}
        </>
    )
}
