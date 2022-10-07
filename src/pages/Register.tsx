import React from 'react'
import {useForm} from "@mantine/form"
import {Anchor, Button, Card, Divider, Stack, TextInput, Title} from '@mantine/core'
import {showNotification} from "@mantine/notifications"
import {addDoc, getDocs, query, where} from "firebase/firestore"
import * as cryptojs from "crypto-js"
import {users} from "../firebase"
import {HideLoading, ShowLoading} from "../redux/alertsSlice"
import {useAppDispatch} from "../redux/hooks"

interface RegisterItem {
    name: string
    email: string
    password: string
}

const Register = () => {

    const dispatch = useAppDispatch()

    const registerForm = useForm<RegisterItem>({
        initialValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            dispatch(ShowLoading())
            const userToRegister = registerForm.values
            const existingUser = await getDocs(query(users, where("email", "==", userToRegister.email)))
            if (existingUser.size > 0) {
                showNotification({
                    message: "User already exist",
                    title: "User already exist",
                    color: "red"
                })
                return
            }
            const secretKey = process.env.REACT_APP_SECRET_KEY
            if (secretKey) {
                userToRegister.password = cryptojs.AES.encrypt(userToRegister.password, secretKey).toString()
            }
            const response = await addDoc(users, userToRegister)
            if (response.id) {
                showNotification({
                    message: "User created successfully",
                    title: "User created successfully",
                    color: "green"
                })
                alert("User created successfully")
            } else {
                showNotification({
                    message: "User creation failed",
                    title: "User creation failed",
                    color: "red"
                })
            }
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
        <div className="flex h-screen justify-center items-center">
            <Card sx={{width: 400}} shadow="lg" withBorder>
                <Title order={2} mb={5}>REGISTER</Title>
                <Divider variant="dotted" color="grey"/>
                <form action="" onSubmit={(e) => onSubmit(e)}>
                    <Stack mt={5}>
                        <TextInput label="Name" placeholder="Enter your name"
                                   name="name" {...registerForm.getInputProps("name")}/>
                        <TextInput label="Email" placeholder="Enter your email" type="email"
                                   name="email" {...registerForm.getInputProps("email")}/>
                        <TextInput label="Password" placeholder="Enter your password" type="password"
                                   name="password" {...registerForm.getInputProps("password")}/>
                        <Button type="submit" color="violet">Register</Button>
                        <Anchor href="/login">Already have an account? Log in</Anchor>
                    </Stack>
                </form>
            </Card>
        </div>
    )
}

export default Register
