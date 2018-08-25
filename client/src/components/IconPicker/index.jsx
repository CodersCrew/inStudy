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
      props: { disabled, name, value, placeholder, size },
    } = this;

    return (
      <Fragment>
        <Container hasValue={!!value}>
          <Input
            disabled={disabled}
            name={name}
            placeholder={placeholder}
            size={size}
            value={value}
            onClick={openModal}
          />
          {value && (
            <IconWrapper>
              <i className={`fal fa-${value}`} />
            </IconWrapper>
          )}
        </Container>
        {isModalOpen && (
          <Modal onSubmit={handleChange} open={isModalOpen} close={closeModal} icon={value} />
        )}
      </Fragment>
    );
  }
}

IconPicker.propTypes = {
  disabled: bool,
  label: string,
  name: string.isRequired,
  placeholder: string,
  size: string,
  value: string,
  onBlur: func,
  onChange: func,
  onFocus: func,
};

IconPicker.defaultProps = {
  disabled: false,
  placeholder: '',
  size: 'default',
  value: '',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
};

export default IconPicker;
