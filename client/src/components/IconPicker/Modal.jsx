import React, { PureComponent } from 'react';
import { func, string } from 'prop-types';
import { Modal } from 'components';
import { Input } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import icons from './icons';
import { Content, Icons, Icon } from './styles';

class IconsModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      icons,
      icon: this.props.icon,
      value: '',
    };

    this.lastValueLength = '';
  }

  componentDidUpdate(pp) {
    if (!pp.open && this.props.open) {
      this.setState({ icon: this.props.icon });
    } else if (pp.open && !this.props.open) {
      this.setState({ icon: '' });
    }
  }

  onChange = ({ target: { value } }) => {
    const queryLength = value.length;
    const arrToFilter = queryLength > this.lastValueLength ? this.state.icons : icons;
    this.lastValueLength = queryLength;
    const newIconsSet =
      queryLength === 0 ? icons : arrToFilter.filter(({ tags }) => tags.some(tag => tag.includes(value)));
    this.setState({ icons: newIconsSet, value });
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.icon);
    this.props.close();
  };

  changeIcon = name => this.setState({ icon: name });

  render() {
    const {
      state: { icon },
      props: { open, close },
    } = this;

    return (
      <Modal
        type="complex"
        title="Wybierz ikonkę"
        visible={open}
        onCancel={close}
        buttons={[
          {
            onClick: this.onSubmit,
            label: 'Zapisz',
            type: 'primary',
          },
          {
            onClick: close,
            label: 'Anuluj',
          },
        ]}
      >
        <Content>
          <Input onChange={this.onChange} value={this.state.value} placeholder="Wyszukaj ikony..." />
          <Icons>
            <Scrollbars>
              {this.state.icons.map(({ name }) => (
                <Icon key={name} active={name === icon} onClick={() => this.changeIcon(name)}>
                  <i className={`fal fa-${name}`} />
                </Icon>
              ))}
            </Scrollbars>
          </Icons>
        </Content>
      </Modal>
    );
  }
}

IconsModal.propTypes = {
  close: func.isRequired,
  icon: string,
  open: func.isRequired,
  onSubmit: func.isRequired,
};

IconsModal.defaultProps = {
  icon: '',
};

export default IconsModal;
