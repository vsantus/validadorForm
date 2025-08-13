import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../../lib/firebase";
import { Button, Container, ErrorText, FormContainer, Input, Title } from "./style";

const schema = z
    .object({
        name: z.string().min(3, "Name is required (3+ characters)"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "At least 6 characters"),
        confirmPassword: z.string().min(6, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });


type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
    });

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);

            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user, { displayName: data.name });

            alert("Account created successfully. You are now signed in.");
            navigate("/profile");
        } catch (err: any) {
            const code = err?.code as string | undefined;
            const map: Record<string, string> = {
                "auth/email-already-in-use": "Email is already in use.",
                "auth/invalid-email": "Invalid email address.",
                "auth/weak-password": "Weak password. Use at least 6 characters.",
                "auth/operation-not-allowed": "Email/password sign-in is disabled in your project.",
                "auth/network-request-failed": "Network error. Check your connection.",
            };
            alert(map[code ?? ""] ?? "Could not create your account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <Title>Register Account</Title>

                <Input
                    {...register("name")}
                    placeholder="Name"
                    autoComplete="name"
                />
                {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

                <Input
                    {...register("email")}
                    placeholder="Email"
                    autoComplete="email"
                    inputMode="email"
                />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

                <Input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    autoComplete="new-password"
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

                <Input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                />
                {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}

                <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Register"}
                </Button>

                <Button type="button" onClick={() => navigate("/")} disabled={loading}>
                    Login
                </Button>
            </FormContainer>
        </Container>
    );


}
