/* eslint-disable no-new */

import React, { PureComponent } from 'react';
import { object, func, oneOfType, string, number } from 'prop-types';
import ImageCompressor from 'image-compressor.js';
import resizeeImage from 'resize-image';
import FieldWrapper from '../FieldWrapper';
import CropModal from './CropModal';
import { StyledDropzone, StyledOverlay } from './styles';

const DefaultOverlay = ({ preview }) => <StyledOverlay preview={preview}><i className="fal fa-edit" /></StyledOverlay>;

DefaultOverlay.propTypes = {
  preview: oneOfType([string, object]),
};

DefaultOverlay.defaultProps = {
  preview: null,
};

const convertBlobToImageSource = (file, callback) => {
  new ImageCompressor(file, {
    quality: 0.8,
    success: (result) => {
      const reader = new FileReader();
      reader.readAsDataURL(result);

      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (imageSource) => {
          callback(imageSource, image);
        };
      };
    },
    error: (e) => {
      console.log(e.message);
    },
  });
};

const resizeImage = (image, { width, height }) => {
  const isPng = image.src.slice(11, 20).split(';base')[0] === 'png';

  if (height) {
    return resizeeImage.resize(image, width, height, resizeeImage[isPng ? 'PNG' : 'JPEG']);
  }

  const calculatedHeight = width * (image.height / image.width);
  return resizeeImage.resize(image, width, calculatedHeight, resizeeImage[isPng ? 'PNG' : 'JPEG']);;
};

const imageFromFile = (initialBlob, resizeObj) => new Promise((resolve) => {
  convertBlobToImageSource(initialBlob, (initialImageSource, image) => {
    if (resizeObj && image.width > resizeObj.width) {
      const base64Url = resizeImage(image, resizeObj);
      resolve({ base64Url });
    } else {
      const newImage = initialImageSource.path ? initialImageSource.path[0] : initialImageSource.target;
      resolve({ base64Url: newImage.src, image: newImage });
    }
  });
});

class ImagePicker extends PureComponent {
  state = {
    imageToCrop: null,
  }

  onDrop = async (acceptedFiles) => {
    let [file] = acceptedFiles;
    const { input, aspect, width } = this.props;
    const { image } = await imageFromFile(file);

    if (aspect && image.width / image.height !== aspect) {
      file = await this.openCropModal(image);
      if (!file) { return null; }
      this.setState({ imageToCrop: null });
    }

    if (aspect && width) {
      file = await imageFromFile(file, { width, height: width / aspect });
    } else if (width) {
      file = await imageFromFile(file, { width });
    } else {
      file = await imageFromFile(file);
    }

    input.onChange(file.base64Url);
    input.onBlur();
  }

  openCropModal = image => new Promise((resolve) => {
    this.resolveCrop = resolve;
    this.setState({ imageToCrop: image });
  });

  closeCropModal = () => this.setState({ imageToCrop: null });

  render() {
    const { props } = this;
    const { value, onBlur, onFocus } = props.input;
    const { imageToCrop } = this.state;
    const Overlay = props.overlay || DefaultOverlay;

    return (
      <FieldWrapper {...props}>
        <StyledDropzone
          preview={value}
          onDrop={this.onDrop}
          onFileDialogCancel={onBlur}
          onClick={onFocus}
        >
          <Overlay preview={value} />
        </StyledDropzone>
        <CropModal
          onCancel={this.closeCropModal}
          visible={!!imageToCrop}
          imageToCrop={imageToCrop}
          resolveCrop={this.resolveCrop}
          aspect={this.props.aspect}
          name="picture"
        />
      </FieldWrapper>
    );
  }
}

ImagePicker.propTypes = {
  aspect: number,
  input: object.isRequired,
  overlay: func,
  width: number,
};

ImagePicker.defaultProps = {
  aspect: null,
  overlay: null,
  width: null,
};

export default ImagePicker;
