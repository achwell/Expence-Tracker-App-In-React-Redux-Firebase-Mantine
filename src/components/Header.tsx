import React from 'react'
import {Card, Text} from '@mantine/core'
import {useAppSelector} from "../redux/hooks"

const Header = () => {

    const {user} = useAppSelector((state) => state.user)

    return (
        <Card shadow="md" withBorder p={20}>
            <div className="flex justify-between">
                <Text size="xl" color="violet" variant="text" weight={600}>SheyMoney Lite</Text>
                <Text>{user?.name}</Text>
            </div>
        </Card>
    )
}

export default Header
