import React, { PureComponent } from 'react';
import { string, arrayOf, object } from 'prop-types';
import { pick } from 'utils';
import { socials } from 'data';
import CardEditModal from './CardEditModal';
import { Container, Image, Name, Description, Socials, Social, EditIcon } from './styles';

const renderSocial = ({ type, url }) => (
  <Social color={socials[type].color} href={url} className={socials[type].icon} />
);

renderSocial.propTypes = {
  type: string.isRequired,
  url: string.isRequired,
};

const userDataToPick = ['firstName', 'lastName', 'image', 'email', 'description', 'socials'];

class Card extends PureComponent {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { image, firstName, lastName, description, socials } = this.props;

    return (
      <Container>
        <Image src={image} />
        <Name>{`${firstName} ${lastName}`}</Name>
        <Description>{description}</Description>
        {socials.length > 0 && <Socials>{socials.map(renderSocial)}</Socials>}
        <EditIcon className="fal fa-edit" onClick={this.openModal} />
        <CardEditModal
          visible={this.state.isModalOpen}
          onClose={this.closeModal}
          userData={pick(this.props, userDataToPick)}
        />
      </Container>
    );
  }
}

Card.propTypes = {
  image: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  description: string,
  socials: arrayOf(object),
};

Card.defaultProps = {
  description: '',
  socials: [],
};

export default Card;
