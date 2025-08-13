import styled from 'styled-components';

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 4rem auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
`;

export const ErrorText = styled.span`
    color: red;
    font-size: 0.9rem;
    margin-top: -0.5rem;
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        &:focus {
            outline: none;
            border-color: #4f46e5;
        }
`;

export const Button = styled.button`
        background: #0082fb;
        color: white;
        padding: 0.75rem;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;

        &:hover {
            background-color: #0064e0;
        }
`;
