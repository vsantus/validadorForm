import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { Button, ErrorText, FormContainer, Input } from './style';

const schema = z
    .object({
        name: z.string().min(3, "Required name"),
        email: z.string().email("Email inválid"),
        password: z.string().min(6, "Minimum 6 characters"),
        confirmPassword: z.string().min(6, "Password confirmation"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });


type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        localStorage.setItem('user', JSON.stringify(data));
        alert("Usuário registrado.");
        navigate('/profile');
        console.log(localStorage, 'localStorage');
        console.log(localStorage.user, 'user');
        console.log(onSubmit, 'onSubit');

    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>

            <Input {...register("name")} placeholder="Name" />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

            <Input {...register("email")} placeholder="Email" />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

            <Input type="password" {...register("password")} placeholder="Password" />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

            <Input type="password" {...register("confirmPassword")} placeholder="Confirm Password" />
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}


            <Button type="submit">Register</Button>


        </FormContainer>
    );


}
