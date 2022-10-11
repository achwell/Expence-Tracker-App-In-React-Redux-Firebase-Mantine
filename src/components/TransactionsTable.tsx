import React, {FC} from 'react'
import {Group, Table} from "@mantine/core"
import TransactionType from "../types/TransactionType"
import moment from "moment";

interface Props {
    transactions: TransactionType[]
    setTransaction: (transaction: TransactionType) => void
    setShowForm: (show: boolean) => void
    deleteTransaction: (id: string) => void
}

const TransactionsTable: FC<Props> = ({transactions, setTransaction, setShowForm, deleteTransaction}) => {

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
            {transactions.map((transaction) => (
                <tr key={Math.random()}>
                    <td>{transaction.name}</td>
                    <td>{transaction.type.toUpperCase()}</td>
                    <td>{transaction.amount}</td>
                    <td>{moment(transaction.date, "YYYY-MM-DD").format("DD.MM.YYYY")}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.reference}</td>
                    <th>
                        <Group>
                            <i className="ri-pencil-line" onClick={() => {
                                setTransaction(transaction)
                                setShowForm(true)
                            }}></i>
                            <i className="ri-delete-bin-line" onClick={() => deleteTransaction(transaction.id!)}></i>
                        </Group>
                    </th>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}

export default TransactionsTable
