import React from 'react';
import { string, object, bool } from 'prop-types';
import Fade from 'react-reveal/Fade';
import { sliceText } from 'utils';
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

const Card = ({ name, image, description, university, profileCompleted, shortUrl, style }) => (
  <Fade>
    <Container to={`/inicjatywy/${shortUrl}`}>
      <Head>
        <Title>{name}</Title>
        <MoreIcon className="fal fa-ellipsis-v moreIcon" />
      </Head>
      <Content>
        <Left>
          <Logo src={image} alt={`Logo inicjatywy ${name}`} />
        </Left>
        <Right>
          <Description>{sliceText(description, 260)}</Description>
          <Footer>
            <UniversityLogo src={university.image} />
            <FeatureIcons>
              <FeatureIcon active={profileCompleted}>
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
  </Fade>
);

Card.propTypes = {
  name: string.isRequired,
  image: string.isRequired,
  description: string.isRequired,
  university: object.isRequired,
  profileCompleted: bool.isRequired,
  shortUrl: string.isRequired,
};

export default Card;
