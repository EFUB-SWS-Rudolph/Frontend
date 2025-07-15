import CoffeeChatIcon from '../../assets/CoffeeChatIcon';
import Switch from '../../assets/Switch';
import { FooterContainer, TitleContainer } from './FooterContainer';

export default function CoffeeChat() {
  return (
    <FooterContainer>
      <TitleContainer>
        <CoffeeChatIcon />
        <p>커피챗</p>
      </TitleContainer>

      <Switch />
    </FooterContainer>
  );
}
