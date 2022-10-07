export default interface TransactionType {
    id?: string
    name: string
    type: "income" | "expense"
    amount: number
    date: string
    category: "food"|"transport"|"shopping"|"entertainment"|"health"|"education"|"salary"|"freelance"|"business"
    reference: string
}
