import React, {FC, ReactNode} from 'react'
import {Group, Table} from "@mantine/core"
import TransactionType from "../types/TransactionType"

interface Props {
    transactions: TransactionType[]
}

const TransactionsTable: FC<Props> = ({transactions}) => {

    const rows = transactions.map(transaction =>
        <tr key={transaction.id}>
            <td>{transaction.name}</td>
            <td>{transaction.type.toUpperCase()}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.date}</td>
            <td>{transaction.category}</td>
            <td>{transaction.reference}</td>
            <th>
                <Group>
                    <i className="ri-pencil-line"></i>
                    <i className="ri-delete-bin-line"></i>
                </Group>
            </th>
        </tr>)

    return (
        <Table verticalSpacing="md" fontSize="sm" striped highlightOnHover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>Reference</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </Table>
    )
}

export default TransactionsTable
