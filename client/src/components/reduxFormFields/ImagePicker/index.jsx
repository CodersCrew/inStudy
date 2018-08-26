import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import FieldWrapper from '../FieldWrapper';
import { StyledDropzone } from './styles';

class ImagePicker extends PureComponent {
  onDrop = (acceptedFiles, rejectedFiles) => {
    this.props.input.onChange(acceptedFiles[0]);
  };

  render() {
    const props = this.props;
    const value = props.input.value;
    const preview = typeof value === 'string' ? value : value.preview;

    return (
      <FieldWrapper {...props}>
        <StyledDropzone preview={preview} onDrop={this.onDrop} />
      </FieldWrapper>
    );
  }
}

ImagePicker.propTypes = {
  input: object.isRequired,
};

ImagePicker.defaultProps = {
  text: 'Hello World',
};

export default ImagePicker;
