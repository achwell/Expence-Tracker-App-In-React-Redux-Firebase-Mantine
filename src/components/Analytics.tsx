import React, {FC} from 'react'
import {Divider, Group, Progress, RingProgress, Text} from "@mantine/core"
import TransactionType from "../types/TransactionType"


import "../stylesheets/Analytics.css"

interface Props {
    transactions: TransactionType[]
}

const Analytics: FC<Props> = ({transactions}) => {

    const totalTransactions = transactions.length
    const totalIncomeTransactions = transactions.filter(t => t.type === "income").length
    const totalExpenseTransactions = transactions.filter(t => t.type === "expense").length
    const totalIncomeTransactionsPercentage = (totalIncomeTransactions / totalTransactions) * 100
    const totalExpenseTransactionsPercentage = (totalExpenseTransactions / totalTransactions) * 100


    const totalTransactionsAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTransactionsAmount = transactions.filter(t => t.type === "income").reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenseTransactionsAmount = transactions.filter(t => t.type === "expense").reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTransactionsAmountPercentage = (totalIncomeTransactionsAmount / totalTransactionsAmount) * 100
    const totalExpenseTransactionsAmountPercentage = (totalExpenseTransactionsAmount / totalTransactionsAmount) * 100

    const categories = [
        {label: "Food", value: "food"},
        {label: "Transport", value: "transport"},
        {label: "Shopping", value: "shopping"},
        {label: "Entertainment", value: "entertainment"},
        {label: "Health", value: "health"},
        {label: "Education", value: "education"},
        {label: "Salary", value: "salary"},
        {label: "Freelance", value: "freelance"},
        {label: "Business", value: "business"}
    ]
    return <>
        <Group mt={20}>
            <div className="total-transactions">
                <h1 className="card-title">Total Transactions: {totalTransactions}</h1>
                <Divider my={20}/>
                <p>Income Transactions: {totalIncomeTransactions}</p>
                <p>Expense Transactions: {totalExpenseTransactions}</p>
                <Group>
                    <RingProgress
                        label={<Text size="xs"
                                     align={"center"}>Inncome {totalIncomeTransactionsPercentage.toFixed(2)}%</Text>}
                        roundCaps
                        sections={[
                            {value: 100 - totalIncomeTransactionsPercentage, color: "gray"},
                            {value: totalIncomeTransactionsPercentage, color: "red"}
                        ]}/>
                    <RingProgress
                        label={<Text size="xs"
                                     align={"center"}>Expense {totalExpenseTransactionsPercentage.toFixed(2)}%</Text>}
                        roundCaps
                        sections={[
                            {value: 100 - totalExpenseTransactionsPercentage, color: "gray"},
                            {value: totalExpenseTransactionsPercentage, color: "teal"}
                        ]}/>
                </Group>
            </div>
            <div className="total-turnover">
                <h1 className="card-title">Total Turnover: {totalTransactionsAmount}</h1>
                <Divider my={20}/>
                <p>Income: {totalIncomeTransactionsAmount}</p>
                <p>Expense: {totalExpenseTransactionsAmount}</p>
                <Group>
                    <RingProgress
                        label={<Text size="xs"
                                     align={"center"}>Inncome {totalIncomeTransactionsAmountPercentage.toFixed(2)}%</Text>}
                        roundCaps
                        sections={[
                            {value: 100 - totalIncomeTransactionsAmountPercentage, color: "gray"},
                            {value: totalIncomeTransactionsAmountPercentage, color: "red"}
                        ]}/>
                    <RingProgress
                        label={<Text size="xs"
                                     align={"center"}>Expense {totalExpenseTransactionsAmountPercentage.toFixed(2)}%</Text>}
                        roundCaps
                        sections={[
                            {value: 100 - totalExpenseTransactionsAmountPercentage, color: "gray"},
                            {value: totalExpenseTransactionsAmountPercentage, color: "green"}
                        ]}/>
                </Group>
            </div>
        </Group>
        <Group mt={20} grow>
            <div className="income-categories">
                <h1 className="card-title">Income Categories</h1>
                <Divider my={20}/>
                {
                    categories.map((category) => {
                        const incomeCategoryTransactionsAmount = transactions
                            .filter(transaction => transaction.type === "income" && transaction.category === category.value)
                            .reduce((acc, transaction) => acc + transaction.amount, 0)
                        const incomeCategoryTransactionsPersentage = (incomeCategoryTransactionsAmount / totalIncomeTransactionsAmount) * 100
                        if (incomeCategoryTransactionsAmount <= 0) {
                            return null
                        }
                        return <div>
                            <p>{category.label}</p>
                            <Progress
                                size={25}
                                color="teal"
                                value={incomeCategoryTransactionsPersentage}
                                label={incomeCategoryTransactionsPersentage.toFixed(2) + "%"}/>
                        </div>;
                    })
                }
            </div>
            <div className="expense-categories">
                <h1 className="card-title">Expense Categories</h1>
                <Divider my={20}/>
                {
                    categories.map((category) => {
                        const expenseCategoryTransactionsAmount = transactions
                            .filter(transaction => transaction.type === "expense" && transaction.category === category.value)
                            .reduce((acc, transaction) => acc + transaction.amount, 0)
                        const expenseCategoryTransactionsPersentage = (expenseCategoryTransactionsAmount / totalExpenseTransactionsAmount) * 100
                        if (expenseCategoryTransactionsAmount <= 0) {
                            return null
                        }
                        return <div>
                            <p>{category.label}</p>
                            <Progress
                                size={25}
                                color="red"
                                value={expenseCategoryTransactionsPersentage}
                                label={expenseCategoryTransactionsPersentage.toFixed(2) + "%"}/>
                        </div>;
                    })
                }
            </div>
        </Group>
    </>
}

export default Analytics
