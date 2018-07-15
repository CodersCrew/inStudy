import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { sliceText } from '../../../utils';
import {
  Container,
  Head,
  Title,
  MoreIcon,
  Content,
  Right,
  Logo,
  Left,
  Description,
  Footer,
  UniversityLogo,
  FeatureIcons,
  FeatureIcon,
} from './styles';

class Card extends PureComponent {
  render() {
    return (
      <Container>
        <Head>
          <Title>{this.props.name}</Title>
          <MoreIcon className="fal fa-ellipsis-v moreIcon" />
        </Head>
        <Content>
          <Left>
            <Logo src={this.props.image} alt={`Logo inicjatywy ${name}`} />
          </Left>
          <Right>
            <Description>{sliceText(this.props.description, 260)}</Description>
            <Footer>
              <UniversityLogo src={this.props.university.image} />
              <FeatureIcons>
                <FeatureIcon active={this.props.profileCompleted}>
                  <i className="fal fa-user-plus" />
                </FeatureIcon>
                <FeatureIcon>
                  <i className="fal fa-star" />
                </FeatureIcon>
              </FeatureIcons>
            </Footer>
          </Right>
        </Content>
      </Container>
    );
  }
}

Card.propTypes = {
  text: string,
};

Card.defaultProps = {
  text: 'Hello World',
};

export default Card;
