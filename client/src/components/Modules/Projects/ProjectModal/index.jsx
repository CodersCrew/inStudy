import React from 'react';
import { string, arrayOf, func, exact, bool } from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { withCloseAnimation } from 'hocs';
import { Modal } from 'components';
import { socials as socialsData } from 'data';
import { Container, Content, Name, Header, Description, Socials, Social, Icon } from './styles';

const getImages = imagesArray => imagesArray
  .filter(img => !!img)
  .map(({ image }) => image);

const renderSocial = (social) => {
  if (social) {
    const { url, socialType } = social;
    const { icon, color } = socialsData[socialType];

    return (
      <Social href={url} color={color}>
        <Icon className={icon} />
      </Social>
    );
  }

  return null;
};

const ProjectModal = ({ onCancel, name, header, description, visible, image, images, socials }) => {
  const imagesArr = [image, ...getImages(images)].map(img => ({ original: img, thumbnail: img }));

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      type="empty"
      width={720}
    >
      <Container>
        <ImageGallery
          items={imagesArr}
          autoPlay
          showPlayButton={false}
          showFullscreenButton={false}
          slideInterval={5000}
          showThumbnails={false}
        />
        <Content>
          <Name>{name}</Name>
          <Header>{header}</Header>
          <Description dangerouslySetInnerHTML={{ __html: description }} />
          <Socials>
            {socials.map(renderSocial)}
          </Socials>
        </Content>
      </Container>
    </Modal>
  );
};

ProjectModal.propTypes = {
  description: string,
  header: string,
  image: string,
  images: arrayOf(exact({
    image: string,
  })),
  name: string,
  onCancel: func,
  socials: arrayOf(exact({
    socialType: string,
    url: string,
  })),
  visible: bool,
};

ProjectModal.defaultProps = {
  description: '',
  header: '',
  image: '',
  images: [],
  name: '',
  onCancel: () => {},
  socials: [],
  visible: false,
};

export default withCloseAnimation(ProjectModal);
