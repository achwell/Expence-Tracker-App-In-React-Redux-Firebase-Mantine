import React, {useEffect, useState} from 'react'
import {Box, Button, Card, Modal} from '@mantine/core'
import {showNotification} from "@mantine/notifications"
import {collection, getDocs, query} from "firebase/firestore"
import Header from "../components/Header"
import TransactionForm from "../components/TransactionForm"
import TransactionType from "../types/TransactionType"
import {HideLoading, ShowLoading} from "../redux/alertsSlice"
import {db} from "../firebase"
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import TransactionsTable from "../components/TransactionsTable";

const Home = () => {

    const [transactions, setTransactions] = useState<TransactionType[]>([])
    const [showForm, setShowForm] = useState(false)
    const [formMode, setFormMode] = useState<"add"|"edit">("add")
    const {user} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const getTransactions = async () => {
        try {
            dispatch(ShowLoading())
            const response = await getDocs(query(collection(db, `users/${user?.id}/transactions`)))
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

    return (
        <Box>
            <Header/>
            <Card>
                <div className="flex justify-between">
                    <div>Filters</div>
                    <div><Button color="green" onClick={() => {
                        setShowForm(true)
                        setFormMode("add")
                    }}>Add Transaction</Button></div>
                </div>
                <TransactionsTable transactions={transactions}/>
            </Card>
            <Modal
                title={formMode === "add" ? "Add Transaction" : "Edit Transaction"}
                size="lg"
                centered
                opened={showForm}
                onClose={() => setShowForm(false)}>
                <TransactionForm formMode={formMode} setFormMode={setFormMode} setShowForm={setShowForm} />
            </Modal>
        </Box>
    )
}

export default Home
