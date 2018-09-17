import React, { PureComponent } from 'react';
import { object, func, oneOfType, string } from 'prop-types';
import FieldWrapper from '../FieldWrapper';
import { StyledDropzone, StyledOverlay } from './styles';
import blobToBase64 from 'utils/blobToBase64';

const DefaultOverlay = ({ preview }) => <StyledOverlay preview={preview}><i className="fal fa-edit" /></StyledOverlay>;

DefaultOverlay.propTypes = {
  preview: oneOfType([string, object]),
};

DefaultOverlay.defaultProps = {
  preview: null,
};

const getPreview = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.preview;
};

class ImagePicker extends PureComponent {
  onDrop = (acceptedFiles) => {
    blobToBase64(acceptedFiles[0], (base64) => {
      this.props.input.onChange({blob: base64, imageName: acceptedFiles[0].name});
      this.props.input.onBlur();
    })
  };

  render() {
    const { props } = this;
    const { value } = props.input;
    const preview = getPreview(value);
    const Overlay = props.overlay || DefaultOverlay;

    return (
      <FieldWrapper {...props}>
        <StyledDropzone
          preview={preview}
          onDrop={this.onDrop}
          onFileDialogCancel={props.input.onBlur}
          onClick={props.input.onFocus}
        >
          <Overlay preview={preview} />
        </StyledDropzone>
      </FieldWrapper>
    );
  }
}

ImagePicker.propTypes = {
  input: object.isRequired,
  overlay: func,
};

ImagePicker.defaultProps = {
  overlay: null,
};

export default ImagePicker;
