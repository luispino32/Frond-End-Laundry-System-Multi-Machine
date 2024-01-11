import { GrUpdate } from "react-icons/gr";
import styled from "styled-components";

const DivUpdate = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;

    animation: charging 2s infinite;

    @keyframes charging{
        from {transform: rotate(0deg)}
        to {transform: rotate(360deg)}
    }
`;

export default function Updating(){
    return(
        <DivUpdate>
            <GrUpdate size={'5em'}/>
        </DivUpdate>
    )
}