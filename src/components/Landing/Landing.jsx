import React from "react";
import Login from "../Login/Login";
import styled from "styled-components";

const DivLeft = styled.div`
    height: 100vh;
    width: 50vw;
`;

const DivRight = styled.div`
    height: 100vh;
    width: 50vw;
`;

const DivGeneral = styled.div`
    display: flex;
`;

export default function Landing({ login, message, setMessage}){
    return(
        <DivGeneral>
            <DivLeft>
                
            </DivLeft>
            
            <DivRight> 
                <Login login={login} message={message} setMessage={setMessage}/> 
            </DivRight>
        </DivGeneral>
    );
}