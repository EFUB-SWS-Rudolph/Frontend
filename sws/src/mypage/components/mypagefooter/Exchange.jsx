import ExchangeIcon from '../../assets/ExchangeIcon';
import Switch from '../../assets/Switch';
import { FooterContainer, TitleContainer } from './FooterContainer';

export default function Exchange() {
  return (
    <FooterContainer>
      <TitleContainer>
        <ExchangeIcon />
        <p>재능교환</p>
      </TitleContainer>
      <Switch />
    </FooterContainer>
  );
}
