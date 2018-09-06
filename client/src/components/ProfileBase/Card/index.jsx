import React from 'react';
import { string, arrayOf, object, bool, func } from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { socials } from 'data';
import { Container, Image, Name, Description, Socials, SocialItem, EditIcon, StyledAvatar } from './styles';

const staticProps = {
  image: string.isRequired,
  name: string.isRequired,
  description: string,
  socials: arrayOf(object),
};

const dynamicProps = {
  isModalOpen: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
};

const Social = ({ socialType, url }) =>
  <SocialItem color={socials[socialType].color} href={url} className={socials[socialType].icon} />;

Social.propTypes = {
  socialType: string.isRequired,
  url: string.isRequired,
};

const withHocs = compose(
  withState('isModalOpen', 'setModal', false),
  withHandlers({
    openModal: ({ setModal }) => () => setModal(() => true),
    closeModal: ({ setModal }) => () => setModal(() => false),
  }),
);

const EditableCard = (props) => {
  const EditModal = props.cardEditModal;

  return (
    <Container editable>
      {props.image ? (
        <Image src={props.image} alt={`${props.name} - zdjęcie profilowe`} />
      ) : (
        <StyledAvatar name={props.name} />
      )}
      <Name>{props.name}</Name>
      <Description>{props.description}</Description>
      {props.socials.length > 0 && <Socials>{props.socials.map(Social)}</Socials>}
      <EditIcon className="fal fa-edit" onClick={props.openModal} />
      <EditModal visible={props.isModalOpen} onClose={props.closeModal} data={props} />
    </Container>
  );
};

EditableCard.propTypes = { ...staticProps, ...dynamicProps };

const EnhancedEditableCard = withHocs(EditableCard);

const StaticCard = ({ name, description, image, socials }) => (
  <Container>
    {image ? <Image src={image} alt={`${name} - zdjęcie profilowe`} /> : <StyledAvatar name={name} />}
    <Name>{name}</Name>
    <Description>{description}</Description>
    {socials.length > 0 && <Socials>{socials.map(Social)}</Socials>}
  </Container>
);

StaticCard.propTypes = staticProps;

const Card = props => (props.editable ? <EnhancedEditableCard {...props} /> : <StaticCard {...props} />);

Card.propTypes = {
  editable: bool.isRequired,
};

Card.defaultProps = {
  description: '',
  socials: [],
};

export default Card;
