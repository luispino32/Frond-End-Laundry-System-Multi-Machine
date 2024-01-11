import styled from "styled-components";

/*const DivTemplate = styled.div`
    width: 100%;
    display: flex;
    height: 100vh;
    overflow: auto;
    margin-left: 140px;
    align-items: center;
    justify-content: center;
    background-color: rgb(245, 243, 243);

    & > div{
        margin-right: 140px;
    }
`;*/

export default function Template({styleNav, navHidden, children}){
    const widthNavBar = navHidden ? styleNav.min_WidthNav[0] : styleNav.min_WidthNav[1];

    const DivTemplate = styled.div`
        width: 100%;
        display: flex;
        height: calc(100vh - ${styleNav.heigh_Header});
        margin-left: ${widthNavBar};
        margin-top: ${styleNav.heigh_Header};
        align-items: center;
        justify-content: center;
        overflow: auto;
        background-color: rgb(245, 243, 243);

        & > div{
            margin-right: ${widthNavBar};
        }
    `;

    return(
        <DivTemplate>
            {children}
        </DivTemplate>
    );
}