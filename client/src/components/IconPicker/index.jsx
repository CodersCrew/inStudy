import React, { PureComponent, Fragment } from 'react';
import { string, bool, func } from 'prop-types';
import { Input } from 'antd';
import Modal from './Modal';
import { Container, IconWrapper } from './styles';

class IconPicker extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      isModalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true, focused: true });
    this.props.onFocus();
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, focused: false });
    this.props.onBlur();
  };

  handleChange = value => this.props.onChange(value);

  render() {
    const {
      openModal,
      closeModal,
      handleChange,
      state: { isModalOpen },
      props: { className, label, name, value, placeholder },
    } = this;

    return (
      <Fragment>
        <Container className={className} hasValue={!!value}>
          <Input
            onClick={openModal}
            name={name}
            label={label}
            value={value}
            placeholder={placeholder}
          />
          {value && (
            <IconWrapper>
              <i className={`fal fa-${value}`} />
            </IconWrapper>
          )}
        </Container>
        <Modal onSubmit={handleChange} open={isModalOpen} close={closeModal} data={value} />
      </Fragment>
    );
  }
}

IconPicker.propTypes = {
  className: string,
  disabled: bool,
  error: string,
  fullWidth: bool,
  label: string,
  name: string.isRequired,
  onBlur: func,
  onChange: func,
  onFocus: func,
  placeholder: string,
  value: string,
};

IconPicker.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  fullWidth: false,
  label: '',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: '',
  value: '',
};

export default IconPicker;
