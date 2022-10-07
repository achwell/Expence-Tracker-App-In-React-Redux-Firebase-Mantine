import React, {FC} from 'react'
import {useForm} from "@mantine/form"
import {Button, Group, Select, Stack, TextInput} from "@mantine/core"
import {showNotification} from "@mantine/notifications"
import {addDoc, collection} from "firebase/firestore"
import TransactionType from "../types/TransactionType"
import {HideLoading, ShowLoading} from "../redux/alertsSlice"
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import {db} from "../firebase"

interface Props {
    formMode: "add"|"edit"
    setFormMode :(mode: "add"|"edit") => void
    setShowForm :(show: boolean) => void
}

const TransactionForm:FC<Props> = ({formMode, setFormMode, setShowForm}) => {

    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state) => state.user)

    const transactionForm = useForm<TransactionType>({
        initialValues: {
            name: "",
            type: "expense",
            amount: 0,
            date: "",
            category: "food",
            reference: ""
        }
    })

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            dispatch(ShowLoading())
            await addDoc(collection(db, `users/${user?.id}/transactions`), transactionForm.values)
            showNotification({
                message: "Transaction added successfully",
                title: "Transaction added successfully",
                color: "green"
            })
            dispatch(HideLoading())
            setShowForm(false)
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
                    <TextInput label="Amount" placeholder="Enter transaction amount" type="number"
                               name="amount" {...transactionForm.getInputProps("amount")}/>
                    <TextInput label="Date" placeholder="Enter transaction date" type="date"
                               name="date" {...transactionForm.getInputProps("date")}/>
                </Group>
                <TextInput label="Reference" placeholder="Enter transaction reference"
                           name="reference" {...transactionForm.getInputProps("reference")}/>

                <Button color="cyan" type="submit">ADD</Button>
            </Stack>
        </form>
    </div>
}

export default TransactionForm
