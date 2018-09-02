import React from 'react';
import { string, arrayOf, object, bool, func } from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { socials } from 'data';
import { Container, Image, Name, Description, Socials, SocialItem, EditIcon } from './styles';

const staticProps = {
  email: string.isRequired,
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

const Social = ({ type, url }) => <SocialItem color={socials[type].color} href={url} className={socials[type].icon} />;

Social.propTypes = {
  type: string.isRequired,
  url: string.isRequired,
};

const withHocs = compose(
  withState('isModalOpen', 'setModal', false),
  withHandlers({
    openModal: ({ setModal }) => () => setModal(() => true),
    closeModal: ({ setModal }) => () => setModal(() => false),
  }),
);

const EditableCard = props => {
  const EditModal = props.cardEditModal;

  return (
    <Container editable>
      <Image src={props.image} />
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
    <Image src={image} />
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
