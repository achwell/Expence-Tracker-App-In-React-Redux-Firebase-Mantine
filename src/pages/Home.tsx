import React, {useEffect, useState} from 'react'
import {Box, Button, Card, Group, Modal} from '@mantine/core'
import {showNotification} from "@mantine/notifications"
import {collection, deleteDoc, doc, getDocs, orderBy, query, QueryConstraint, where} from "firebase/firestore"
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import {HideLoading, ShowLoading} from "../redux/alertsSlice"
import {db} from "../firebase"
import Header from "../components/Header"
import TransactionForm from "../components/TransactionForm"
import TransactionsTable from "../components/TransactionsTable"
import Filters, {FiltersType} from "../components/Filters"
import TransactionType from "../types/TransactionType"
import moment from "moment";
import Analytics from "../components/Analytics";

export const emptyTransaction: TransactionType = {
    name: "",
    type: "expense",
    amount: 0,
    date: "",
    category: "food",
    reference: ""
};

const Home = () => {

    const [filters, setFilters] = useState<FiltersType>({frequency: "", dateRange: [null, null], type: ""})
    const [transactions, setTransactions] = useState<TransactionType[]>([])
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>(emptyTransaction)
    const [showForm, setShowForm] = useState(false)
    const [view, setView] = useState<"table" | "chart">("table")
    const {user} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const getWhereConditions = (filters: FiltersType): QueryConstraint[] => {
        const conditions = []
        if (filters.type) {
            conditions.push(where("type", "==", filters.type))
        }
        if (filters.frequency) {
            if (filters.frequency === "custom-range") {
                const dateRange = filters.dateRange;
                if (dateRange) {
                    conditions.push(where("date", ">=", moment(dateRange[0]).subtract(Number(filters.frequency), "days").format("YYYY-MM-DD")))
                    conditions.push(where("date", "<=", moment(dateRange[1]).subtract(Number(filters.frequency), "days").format("YYYY-MM-DD")))
                }

            } else if (typeof Number(filters.frequency) === "number") {
                conditions.push(where("date", ">=", moment().subtract(Number(filters.frequency), "days").format("YYYY-MM-DD")))
            }
        }
        return conditions
    }

    const getTransactions = async () => {
        try {
            dispatch(ShowLoading())
            const whereConditions = getWhereConditions(filters);
            const response = await getDocs(
                query(
                    collection(db, `users/${user?.id}/transactions`),
                    orderBy("date", "desc"),
                    ...whereConditions
                )
            )
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
        <Box mx={50}>
            <Header/>
            <div className="container">
                <Card className="height-100">
                    <div className="flex justify-between items-end">
                        <Filters filters={filters} setFilters={setFilters} getTransactions={getTransactions}/>
                        <Group>
                            <Button.Group>
                                <Button
                                    color="blue"
                                    variant={view === "table" ? "filled" : "outline"}
                                    onClick={() => setView("table")}>
                                    Grid
                                </Button>
                                <Button
                                    color="blue"
                                    variant={view === "chart" ? "filled" : "outline"}
                                    onClick={() => setView("chart")}>
                                    Analytics
                                </Button>
                            </Button.Group>
                            <Button color="green" onClick={() => {
                                setSelectedTransaction(emptyTransaction)
                                setShowForm(true)
                            }}>Add Transaction</Button>
                        </Group>
                    </div>
                    {view === "chart" && <Analytics transactions={transactions}/>}
                    {view === "table" && <TransactionsTable
                        transactions={transactions}
                        setTransaction={setSelectedTransaction}
                        setShowForm={setShowForm}
                        deleteTransaction={deleteTransaction}
                    />}
                </Card>
            </div>
            <Modal
                title={selectedTransaction?.id ? "Edit Transaction" : "Add Transaction"}
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
