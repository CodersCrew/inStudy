import React, { PureComponent } from 'react';
import { Modal } from 'components';
import { Input } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import icons from './icons';
import { Content, Icons, Icon } from './styles';

export default class IconsModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      icons,
      icon: this.props.data,
      value: '',
    };

    this.lastValueLength = '';
  }

  componentDidUpdate(pp) {
    if (!pp.open && this.props.open) {
      this.setState({ icon: this.props.data });
    } else if (pp.open && !this.props.open) {
      this.setState({ icon: '' });
    }
  }

  onChange = value => {
    const queryLength = value.length;
    const arrToFilter = queryLength > this.lastValueLength ? this.state.icons : icons;
    this.lastValueLength = queryLength;
    const newIconsSet =
      queryLength === 0
        ? icons
        : arrToFilter.filter(({ tags }) => tags.some(tag => tag.includes(value)));
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
        title="Wybierz ikonkę"
        visible={open}
        onClose={close}
        type="complex"
        buttons={[
          {
            onClick: this.onSubmit,
            label: 'Zapisz',
          },
          {
            onClick: close,
            label: 'Anuluj',
            kind: 'grey',
            ghost: true,
          },
        ]}
      >
        <Content>
          <Input label="" onChange={this.onChange} fullWidth value={this.state.value} />
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
