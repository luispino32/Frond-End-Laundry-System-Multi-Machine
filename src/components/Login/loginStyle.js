import styled from "styled-components";

export const LoginBox = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 45vw;
    max-width: 350px;
    background: white;
    border: 2px solid rgba(0,0,0,0.1);
    border-radius: 30px;
    box-shadow: 10px 10px 15px rgba(0,0,0,0.05);

    h1{
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid silver;
    }
`;

export const Loginform = styled.form`
    padding: 0 4vw;
    box-sizing: border-box;

    button{
        width: 100%;
        height: 50px;
        margin: 20px 0;
        border: 1px solid;
        background: #2691d9;
        border-radius: 25px;
        font-size: 18px;
        color: #e9f4fb;
        font-weight: 700;
        cursor: pointer;
        outline: none;

        &:hover{
            border-color: #2691d9;
            transition: .5s;
        }
    }
`;

export const InputBox = styled.div`
    position: relative;
    border-bottom: 2px solid #adadad;
    margin: 8vh 0;

    input{
        width: 100%;
        padding: 0 5px;
        height: 40px;
        font-size: 16px;
        border: none;
        background: none;
        outline: none;

        &:focus ~ label, 
        &:valid ~ label{
            top: -5px;
            color: #2691d9;
        }

        &:focus ~ span, 
        &:valid ~ span{
            width: 100%;
        }
    }

    span{
        content: '';
        position: absolute;
        top: 40px;
        left: 0;
        width: 0%;
        height: 2px;
        background: #2691d9;
        transition: .5s;
    }

    label{
        position: absolute;
        top: 50%;
        left: 5px;
        color: #adadad;
        transform: translateY(-50%);
        font-size: 16px;
        pointer-events: none;
        transition: .5s;
    }
`;

export const Forgot = styled.div`
    margin: 0px 0 20px 5px;
    text-align: right;
    color: #a6a6a6;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
        color: #2691d9;;
    }
`;

export const Error = styled.div`
    color: red;
    text-align: center;
`;

export const IconDiv = styled.div`
    animation: rotacion 2s infinite;

    @keyframes rotacion{
        from {transform: rotate(0deg)}
        to {transform: rotate(360deg)}
    }
`;