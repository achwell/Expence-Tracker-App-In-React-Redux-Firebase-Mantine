import React, {FC, useEffect} from 'react'
import {useForm} from "@mantine/form"
import {Button, Group, NumberInput, Select, Stack, TextInput} from "@mantine/core"
import {showNotification} from "@mantine/notifications"
import {addDoc, collection, doc, updateDoc} from "firebase/firestore"
import moment from "moment"
import TransactionType from "../types/TransactionType"
import {HideLoading, ShowLoading} from "../redux/alertsSlice"
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import {db} from "../firebase"
import {emptyTransaction} from "../pages/Home"

interface Props {
    transaction: TransactionType
    setTransaction: (transaction: TransactionType) => void
    setShowForm :(show: boolean) => void
    getData: () => void
}

const TransactionForm:FC<Props> = ({transaction , setShowForm, getData}) => {

    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state) => state.user)

    useEffect(() => {
        if (transaction.id) {
            transactionForm.setValues(transaction)
            transactionForm.setFieldValue("date", moment(transaction.date).format("YYYY-MM-DD"))
        }
    }, [transaction])

    const transactionForm = useForm<TransactionType>({
        initialValues: emptyTransaction
    })

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            dispatch(ShowLoading())
            const values = transactionForm.values
            const path = `users/${user?.id}/transactions`
            let message
            if (values.id) {
                message = "Transaction updated successfully"
                const {id, ...data} = values
                const docRef = doc(db, path, id)
                await updateDoc(docRef, data)
            } else {
                message = "Transaction added successfully"
                await addDoc(collection(db, path), values)
            }
            showNotification({
                message: message,
                title: message,
                color: "green"
            })
            dispatch(HideLoading())
            setShowForm(false)
            getData()
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

    return <div>
        <form action="" onSubmit={(e) => onSubmit(e)}>
            <Stack mt={5}>
                <TextInput label="Name" placeholder="Enter transaction name"
                           name="name" {...transactionForm.getInputProps("name")}/>
                <Group position="apart" grow>
                    <Select name="type" data={[
                        {label: "Income", value: "income"},
                        {label: "Expense", value: "expense"}
                    ]} label="Type" placeholder="Select Transaction Type" {...transactionForm.getInputProps("type")}/>
                    <Select name="category" data={[
                        {label: "Food", value: "food"},
                        {label: "Transport", value: "transport"},
                        {label: "Shopping", value: "shopping"},
                        {label: "Entertainment", value: "entertainment"},
                        {label: "Health", value: "health"},
                        {label: "Education", value: "education"},
                        {label: "Salary", value: "salary"},
                        {label: "Freelance", value: "freelance"},
                        {label: "Business", value: "business"}
                    ]} label="Category"
                            placeholder="Select Transaction Category" {...transactionForm.getInputProps("category")}/>
                </Group>
                <Group position="apart" grow>
                    <NumberInput label="Amount" placeholder="Enter transaction amount"
                               name="amount" {...transactionForm.getInputProps("amount")}/>
                    <TextInput label="Date" placeholder="Enter transaction date" type="date"
                               name="date" {...transactionForm.getInputProps("date")}/>
                </Group>
                <TextInput label="Reference" placeholder="Enter transaction reference"
                           name="reference" {...transactionForm.getInputProps("reference")}/>

                <Button color="cyan" type="submit">{transaction.id ? "SAVE" : "ADD"}</Button>
            </Stack>
        </form>
    </div>
}

export default TransactionForm
