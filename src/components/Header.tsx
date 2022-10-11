import React from 'react'
import {Card, Group, Text} from '@mantine/core'
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import {setUser} from "../redux/userSlice"

const Header = () => {

    const {user} = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    return (
        <Card shadow="md" withBorder p={20}>
            <div className="flex justify-between">
                <Text size="xl" color="teal" variant="text" weight={600}>SHEYMONEY LITE</Text>
                <Group>
                    {user?.name}
                    <i className="ri-logout-circle-r-line" onClick={() => dispatch(setUser(null))}></i>
                </Group>
            </div>
        </Card>
    )
}

export default Header
