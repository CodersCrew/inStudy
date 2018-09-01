import React from 'react';
import { string, arrayOf, object, bool, func } from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { socials } from 'data';
import CardEditModal from './CardEditModal';
import { Container, Image, Name, Description, Socials, SocialItem, EditIcon } from './styles';

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

const Card = ({ firstName, lastName, description, image, email, socials, isModalOpen, openModal, closeModal }) => (
  <Container>
    <Image src={image} />
    <Name>{`${firstName} ${lastName}`}</Name>
    <Description>{description}</Description>
    {socials.length > 0 && <Socials>{socials.map(Social)}</Socials>}
    <EditIcon className="fal fa-edit" onClick={openModal} />
    <CardEditModal
      visible={isModalOpen}
      onClose={closeModal}
      userData={{ firstName, lastName, image, email, description, socials }}
    />
  </Container>
);

Card.propTypes = {
  email: string.isRequired,
  image: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  description: string,
  socials: arrayOf(object),
  isModalOpen: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
};

Card.defaultProps = {
  description: '',
  socials: [],
};

export default withHocs(Card);
