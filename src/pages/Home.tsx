import React, {useEffect, useState} from 'react'
import {Box, Button, Card, Modal} from '@mantine/core'
import {showNotification} from "@mantine/notifications"
import {collection, deleteDoc, doc, getDocs, orderBy, query} from "firebase/firestore"
import Header from "../components/Header"
import TransactionForm from "../components/TransactionForm"
import TransactionType from "../types/TransactionType"
import {HideLoading, ShowLoading} from "../redux/alertsSlice"
import {db} from "../firebase"
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import TransactionsTable from "../components/TransactionsTable"

export const emptyTransaction: TransactionType = {name: "", type: "expense", amount: 0, date: "", category: "food", reference: ""};

const Home = () => {

    const [transactions, setTransactions] = useState<TransactionType[]>([])
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>(emptyTransaction)
    const [showForm, setShowForm] = useState(false)
    const [formMode, setFormMode] = useState<"add"|"edit">("add")
    const {user} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const getTransactions = async () => {
        try {
            dispatch(ShowLoading())
            const response = await getDocs(query(collection(db, `users/${user?.id}/transactions`), orderBy("date", "desc")))
            // @ts-ignore
            const data: TransactionType[] = response.docs.map(doc => ({id: doc.id, ...doc.data()}))
            dispatch(HideLoading())
            setTransactions(data)
        } catch (e) {
            dispatch(HideLoading())
            console.error(e)
            showNotification({
                message: "Something went wrong",
                title: "Something went wrong",
                color: "red"
            })
        }

    }

    useEffect(() => {
        getTransactions()
    }, [])

    const deleteTransaction = async (id: string) => {
        try {
            dispatch(ShowLoading())
            const path = `users/${user?.id}/transactions`
            await deleteDoc(doc(db, path, id))
            getTransactions()
            showNotification({
                message: "Transaction deleted successfully",
                title: "Transaction deleted successfully",
                color: "green"
            })
            dispatch(HideLoading())
        } catch (e) {
            dispatch(HideLoading())
            console.error(e)
            showNotification({
                message: "Something went wrong",
                title: "Something went wrong",
                color: "red"
            })
        }
    }

    return (
        <Box>
            <Header/>
            <Card>
                <div className="flex justify-between">
                    <div>Filters</div>
                    <div><Button color="green" onClick={() => {
                        setSelectedTransaction(emptyTransaction)
                        setShowForm(true)
                        setFormMode("add")
                    }}>Add Transaction</Button></div>
                </div>
                <TransactionsTable
                    transactions={transactions}
                    setTransaction={setSelectedTransaction}
                    setFormMode={setFormMode}
                    setShowForm={setShowForm}
                    deleteTransaction={deleteTransaction}
                />
            </Card>
            <Modal
                title={formMode === "add" ? "Add Transaction" : "Edit Transaction"}
                size="lg"
                centered
                opened={showForm}
                onClose={() => setShowForm(false)}>
                <TransactionForm
                    transaction={selectedTransaction}
                    setTransaction={setSelectedTransaction}
                    setShowForm={setShowForm}
                    getData={getTransactions}
                />
            </Modal>
        </Box>
    )
}

export default Home
