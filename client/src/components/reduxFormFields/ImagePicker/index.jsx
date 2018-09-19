import React, { PureComponent } from 'react';
import { object, func, oneOfType, string, number } from 'prop-types';
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

const imageFromFile = file => new Promise((resolve) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    const image = new Image();
    image.src = e.target.result;
    image.onload = ({ path }) => {
      resolve(path[0]);
    };
  };
});

class ImagePicker extends PureComponent {
  state = {
    imageToCrop: null,
  }

  onDrop = async (acceptedFiles) => {
    let [file] = acceptedFiles;
    const { input, aspect } = this.props;
    const image = await imageFromFile(file);

    if (aspect && image.width / image.height !== aspect) {
      file = await this.openCropModal(image);
      if (!file) { return null; }
      this.setState({ imageToCrop: null });
    }

    file = await imageFromFile(file);

    input.onChange(file.src);
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
};

ImagePicker.defaultProps = {
  aspect: null,
  overlay: null,
};

export default ImagePicker;
