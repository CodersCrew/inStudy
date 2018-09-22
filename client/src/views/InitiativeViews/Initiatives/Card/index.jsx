/* eslint-disable react/no-children-prop */

import React from 'react';
import { string, object, bool, func } from 'prop-types';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Spring } from 'react-spring';
import { sliceText, omit } from 'utils';
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

const CardItem = ({ name, image, description, university, profileCompleted, shortUrl, color, styles, onClick }) => (
  <Container
    to={`/inicjatywy/${shortUrl}`}
    style={omit(styles, ['opacity'])}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    <Head style={{ opacity: styles.opacity }} color={color}>
      <Title>{name}</Title>
      {/* <MoreIcon className="fal fa-ellipsis-v moreIcon" /> */}
    </Head>
    <Content style={{ opacity: styles.opacity }}>
      <Left>
        <Logo src={image} alt={`Logo inicjatywy ${name}`} />
      </Left>
      <Right>
        <Description>{sliceText(description, 260)}</Description>
        <Footer>
          <UniversityLogo src={university.image} />
          <FeatureIcons>
            <FeatureIcon color={color}>
              <i className="fal fa-user-plus" />
            </FeatureIcon>
            <FeatureIcon active={profileCompleted} color={color}>
              <i className="fal fa-star" />
            </FeatureIcon>
          </FeatureIcons>
        </Footer>
      </Right>
    </Content>
  </Container>
);

CardItem.propTypes = {
  name: string.isRequired,
  image: string.isRequired,
  description: string.isRequired,
  university: object.isRequired,
  profileCompleted: bool.isRequired,
  shortUrl: string.isRequired,
  styles: object.isRequired,
  onClick: func.isRequired,
  color: string.isRequired,
};

const handleFrame = ({ opacity }, pushNewUrl, shortUrl) => {
  if (opacity < 0) {
    pushNewUrl(`/inicjatywy/${shortUrl}`);
  }
};

const Card = props => !props.clicked
  ? (
    <Fade>
      <CardItem
        {...props}
        onClick={props.onClick}
        styles={{
          backgroundColor: 'hsl(0, 100%, 100%)',
          transform: 'scale(1)',
          opacity: 1,
        }}
      />
    </Fade>
  ) : (
    <Spring
      {...props}
      from={{ transform: 'scale(1)', opacity: 1, backgroundColor: 'hsl(0, 100%, 100%)' }}
      to={{ transform: 'scale(12)', opacity: -0.1, backgroundColor: 'hsl(240, 100%, 99%)' }}
      onFrame={styles => handleFrame(styles, props.push, props.shortUrl)}
    >
      {styles => <CardItem {...props} styles={{ ...styles, zIndex: 1 }} />}
    </Spring>
  );

Card.propTypes = {
  onClick: func.isRequired,
  clicked: bool.isRequired,
  push: func.isRequired,
  shortUrl: string.isRequired,
};

export default connect(null, { push })(Card);
