import React, { PureComponent } from 'react';
import { bool, func, object, string, number } from 'prop-types';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import { withCloseAnimation } from 'hocs';
import { Modal } from 'components';

@withCloseAnimation
class CropModal extends PureComponent {
  state = {
    crop: {
      x: 0,
      y: 0,
      aspect: this.props.aspect,
    },
  }

  onChange = crop => this.setState({ crop });

  onImageLoaded = image => this.setState({
    crop: makeAspectCrop({
      x: 0,
      y: 0,
      aspect: this.props.aspect,
      width: 50,
    }, image.width / image.height),
  });


  getCroppedImg = (image, pixelCrop) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width * image.width * 0.01;
    canvas.height = pixelCrop.height * image.height * 0.01;
    const { width, height } = canvas;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x * image.width * 0.01,
      pixelCrop.y * image.height * 0.01,
      width,
      height,
      0,
      0,
      width,
      height,
    );

    return new Promise((resolve) => {
      const isPng = this.props.imageToCrop.src.slice(11, 20).split(';base')[0] === 'png';

      canvas.toBlob((file) => {
        resolve(file);
      }, `image/${isPng ? 'png' : 'jpg'}`);
    });
  }

  save = async () => {
    let image = await this.getCroppedImg(this.props.imageToCrop, this.state.crop);
    const [ext, type] = image.type === 'image/png' ? ['png', 'image/png'] : ['jpg', 'image/jpeg'];

    image = new File([image], `${this.props.name}.${ext}`, { type, lastModified: Date.now() });

    this.props.resolveCrop(image);
  }

  cancel = () => {
    this.props.resolveCrop(false);
    this.props.onCancel();
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.cancel}
        type="complex"
        width={644}
        title="Przytnij zdjęcie"
        buttons={[
          {
            onClick: this.save,
            label: 'Zapisz',
            type: 'primary',
          },
          {
            onClick: this.cancel,
            label: 'Anuluj',
          },
        ]}
      >
        <ReactCrop
          src={this.props?.imageToCrop?.src}
          onChange={this.onChange}
          crop={this.state.crop}
          onImageLoaded={this.onImageLoaded}
        />
      </Modal>
    );
  }
}

CropModal.propTypes = {
  resolveCrop: func.isRequired,
  visible: bool.isRequired,
  onCancel: func.isRequired,
  imageToCrop: object,
  name: string,
  aspect: number.isRequired,
};

CropModal.defaultProps = {
  imageToCrop: null,
  name: 'picture',
};

export default CropModal;
