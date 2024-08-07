import { LogoImage } from './styles';
import logoimage from '../../../../assets/logoimage.png';

export const Logo = ({height, width}) => {
    return (
        <LogoImage source={logoimage} height={height} width={width}/>
    )
}