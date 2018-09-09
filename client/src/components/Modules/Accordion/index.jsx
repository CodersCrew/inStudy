import React, { PureComponent } from 'react';
import { Collapse } from 'react-collapse';
import { Container, Item, Title, Description } from './styles';

export default class Collapsible1 extends PureComponent {
  state = {
    active: null,
  }

  activateItem = index => this.setState({ active: (this.state.active === index) ? null : index });

  renderItem = ({ title, description }, index) => {
    const isActive = index === this.state.active;
    return (
      <Item
        key={title}
        className={isActive ? 'active' : ''}
        onClick={() => this.activateItem(index)}
      >
        <Title>
          <p>{title}</p>
          <i className="fal fa-angle-down" />
        </Title>
        <Collapse isOpened={isActive}>
          <Description>{description}</Description>
        </Collapse>
      </Item>
    );
  }

  render() {
    return (
      <Container>
        {this.props.items.map(this.renderItem)}
      </Container>
    );
  }
}
