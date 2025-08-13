import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Button, ErrorText, FormContainer, Input } from "./style";
import { Container, Title } from "../Register/style";
import { auth } from "../../lib/firebase";


export const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "At least 6 characters"),
});

export type FormData = z.infer<typeof schema>;

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
    });

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, data.email, data.password);
            alert("Signed in successfully.");
            navigate("/profile");
        } catch (err: any) {
            const code = err?.code as string | undefined;
            const map: Record<string, string> = {
                "auth/invalid-credential": "Incorrect email or password.",
                "auth/user-not-found": "User not found.",
                "auth/wrong-password": "Incorrect password.",
                "auth/too-many-requests": "Too many attempts. Try again later.",
                "auth/network-request-failed": "Network error. Check your connection.",
            };
            alert(map[code ?? ""] ?? "Could not sign in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>

            <FormContainer onSubmit={handleSubmit(onSubmit)}>

                <Title>Login</Title>

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
                    autoComplete="current-password"
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}


                <Button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Login"}
                </Button>

                <Button type="button" onClick={() => navigate("/register")} disabled={loading}>
                    Register
                </Button>


            </FormContainer>
        </Container>
    );

}
