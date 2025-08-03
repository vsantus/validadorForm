import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { Button, ErrorText, FormContainer, Input } from './style';
import { Container, Title } from '../Register/style';

const schema = z
    .object({
        email: z.string().email("Email inválid"),
        password: z.string().min(6, "Minimum 6 characters"),
    })


type FormData = z.infer<typeof schema>;

export default function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);

            const isValidUser =
                data.email === parsedUser.email && data.password === parsedUser.password;

            if (isValidUser) {
                alert('Login successful');
                navigate('/profile');
            } else {
                alert('Invalid email or password');
                navigate('/register')
            }

        };
    }

    return (
        <Container>

            <FormContainer onSubmit={handleSubmit(onSubmit)}>

                <Title>Login</Title>

                <Input {...register("email")} placeholder="Email" />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

                <Input type="password" {...register("password")} placeholder="Password" />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}


                <Button type="submit">Login</Button>
                <Button type="submit">Register</Button>


            </FormContainer>
        </Container>
    );

}
