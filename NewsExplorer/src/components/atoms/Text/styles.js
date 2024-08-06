import styled from "styled-components/native";

export const CustomText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${({color}) => color || '#fff'}; 
    margin-top: 12px;
`;
// color: ${({color}) => color || '#fff'}; / se a cor for passada, ela será usada, senão, a cor padrão será branca.