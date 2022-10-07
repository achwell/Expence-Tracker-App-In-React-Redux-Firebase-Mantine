import React from 'react'
import {useNavigate} from "react-router-dom"
import {useForm} from "@mantine/form"
import {Anchor, Button, Card, Divider, Stack, TextInput, Title} from "@mantine/core"
import {showNotification} from "@mantine/notifications"
import {getDocs, query, where} from "firebase/firestore"
import * as cryptojs from "crypto-js";
import {users} from "../firebase"
import {useAppDispatch} from "../redux/hooks"
import {setUser} from "../redux/userSlice";
import {HideLoading, ShowLoading} from "../redux/alertsSlice";


interface LoginItem {
    email: string
    password: string
}

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const loginForm = useForm<LoginItem>({
        initialValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            dispatch(ShowLoading())
            const loginData = loginForm.values
            const user = await getDocs(query(users, where("email", "==", loginData.email)))
            if (user.size > 0) {
                const secretKey = process.env.REACT_APP_SECRET_KEY
                const documentData = user.docs[0].data();
                const password: string = documentData.password;
                const decryptedPassword = !!secretKey ? cryptojs.AES.decrypt(password, secretKey).toString(cryptojs.enc.Utf8) : password
                if (decryptedPassword === loginData.password) {
                    showNotification({
                        message: "User logged in successfully",
                        title: "User logged in successfully",
                        color: "green"
                    })
                    const currentUser = {id: user.docs[0].id, name: documentData.name, email: documentData.email};
                    dispatch(setUser(currentUser))
                    navigate("/")
                } else {
                    showNotification({
                        message: "Invalid credentials",
                        title: "Invalid credentials",
                        color: "red"
                    })
                }
            } else {
                showNotification({
                    message: "Invalid credentials",
                    title: "Invalid credentials",
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
                <Title order={2} mb={5}>LOGIN</Title>
                <Divider variant="dotted" color="grey"/>
                <form action="" onSubmit={(e) => onSubmit(e)}>
                    <Stack mt={5}>
                        <TextInput label="Email" placeholder="Enter your email" type="email"
                                   name="email" {...loginForm.getInputProps("email")}/>
                        <TextInput label="Password" placeholder="Enter your password" type="password"
                                   name="password" {...loginForm.getInputProps("password")}/>
                        <Button type="submit" color="violet">Login</Button>
                        <Anchor href="/register">Don't have an account? Register</Anchor>
                    </Stack>
                </form>
            </Card>
        </div>
    )

}

export default Login
