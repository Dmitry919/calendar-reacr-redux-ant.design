import React, {FC, useState} from 'react';
import {Form, Input, Button} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useActions";


const LoginForm: FC = () => {
    const {login} = useAction();
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
    login(username,password)
    }
    return (
        <Form
            onFinish={submit}
        >
            {error && <div style={{color: 'red'}}>
                {error}
            </div>}
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required('Введите ваше имя пользователя!')]}
            >
                <Input value={username}
                       onChange={e => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="Password"
                rules={[rules.required('Введите ваш пароль!')]}
            >
                <Input value={password}
                       onChange={e => setPassword(e.target.value)}
                       type='password' />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;