import React from 'react';
import { string } from 'prop-types';
import { Container, Image, Name, Description, Socials, Social } from './styles';

const renderSocial = ({ link, iconName }) => <Social to={link} className={`fab fa-${iconName}`} />;

const MyComponentName = props => {
  console.log(props);

  return (
    <Container>
      <Image src={props.image} />
      <Name>{`${props.firstName} ${props.lastName}`}</Name>
      <Description>{props.description}</Description>
      <Socials>{props.socials.map(renderSocial)}</Socials>
    </Container>
  );
};

MyComponentName.propTypes = {
  text: string,
};

MyComponentName.defaultProps = {
  text: 'Card',
};

export default MyComponentName;
