import React, {FC, useEffect} from 'react'
import {Group, Select} from "@mantine/core"
import {DateRangePicker, DateRangePickerValue} from "@mantine/dates"

export interface FiltersType {
    frequency: string
    dateRange: DateRangePickerValue
    type: "" | "income" | "expense"
}

interface Props {
    filters: FiltersType
    setFilters: (filters: FiltersType) => void
    getTransactions: () => void
}

const Filters: FC<Props> = ({filters, setFilters, getTransactions}) => {

    useEffect(() => {
        getTransactions()
    }, [filters])

    return (
        <Group>
            <Select
                label="Select Frequency"
                placeholder="Select Frequency"
                data={[
                    {label: "All", value: ""},
                    {label: "Last Week", value: "7"},
                    {label: "Last Moth", value: "30"},
                    {label: "Last Year", value: "365"},
                    {label: "Custom Range", value: "custom-range"}
                ]}
                value={filters.frequency}
                // @ts-ignore
                onChange={(value) => setFilters({...filters, frequency: value})}
                name="frequency"
            />
            {filters.frequency === "custom-range" && <DateRangePicker
                sx={{width: "350px"}}
                label="Select Date Range"
                placeholder="Pick dates range"
                value={filters.dateRange}
                onChange={(value) => setFilters({...filters, dateRange: value})}
            />}
            <Select
                label="Select Type"
                placeholder="Select Type"
                data={[
                    {label: "All", value: ""},
                    {label: "Income", value: "income"},
                    {label: "Expense", value: "expense"}
                ]}
                value={filters.type}
                // @ts-ignore
                onChange={(value) => setFilters({...filters, type: value})}
                name="type"
            />
        </Group>
    )
}

export default Filters
