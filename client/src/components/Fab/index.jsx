import React, { PureComponent } from 'react';
import { string, number, oneOf, func, shape, arrayOf } from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import { Container, BigFab, Wrapper, SmallFab, Badge } from './styles';

const getTooltipPosition = (position) => {
  if (position.includes('right')) return 'left';
  if (position.includes('left')) return 'right';
  if (position.includes('top')) return 'bottom';
  return 'top';
};

const calculateDistance = (elem, mouseX, mouseY) => {
  const { left, top } = elem.getBoundingClientRect();
  const x = mouseX - (left + document.body.scrollLeft + elem.offsetWidth / 2);
  const y = mouseY - (top + document.body.scrollTop + elem.offsetHeight / 2);
  return {
    x: Math.abs(x),
    y: Math.abs(y),
  };
};

const renderSmallFab = ({ title, iconClass, onClick }, i, position, isOpen) => (
  <Wrapper pos={isOpen && i + 1} onClick={onClick} position={position}>
    <SmallFab title={title} size="small" position={getTooltipPosition(position)}>
      <i className={iconClass} />
    </SmallFab>
  </Wrapper>
);

@enhanceWithClickOutside
class Fab extends PureComponent {
  state = {
    open: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open && !this.state.open) {
      document.removeEventListener('mousemove', this.onMouseMove);
    } else if (!prevState.open && this.state.open) {
      document.addEventListener('mousemove', this.onMouseMove);
    }
  }

  onMouseMove = ({ pageX, pageY }) => {
    const { x, y } = calculateDistance(this.fab, pageX, pageY);
    const { position } = this.props;
    if (position === 'right center' || position === 'left center') {
      if (x > this.props.items.length * 64 + 91 || y > 96) {
        this.setState({ open: false });
      }
    } else if (x > 96 || y > this.props.items.length * 64 + 91) {
      this.setState({ open: false });
    }
  };

  handleClick = () => {
    const {
      props: { items, onClick },
      state: { open },
    } = this;
    if (items.length === 0) {
      onClick();
    } else {
      this.setState({ open: !open });
    }
  };

  handleClickOutside() {
    this.setState({ open: false });
  }

  render() {
    const {
      props: { className, iconClass, title, items, count, iconOpenClass, position, offset },
      state: { open },
    } = this;
    return (
      <Container
        className={className}
        onClick={this.handleClick}
        open={open}
        innerRef={(x) => {
          this.fab = x;
        }}
        position={position}
        offset={offset}
      >
        <Badge count={count}>
          <BigFab disabled={open} title={title} position={getTooltipPosition(position)} touchHold>
            <i className={iconClass} />
            <i className={iconOpenClass || iconClass} />
          </BigFab>
        </Badge>
        {items.map((p, i) => renderSmallFab(p, i, position, open))}
      </Container>
    );
  }
}

Fab.propTypes = {
  className: string,
  count: number,
  iconClass: string.isRequired,
  iconOpenClass: string,
  items: arrayOf(
    shape({
      iconClass: string.isRequired,
      onClick: func,
      title: string,
    }),
  ),
  offset: arrayOf(number),
  onClick: func,
  position: oneOf([
    'left top',
    'left center',
    'left bottom',
    'center top',
    'center bottom',
    'right top',
    'right center',
    'right bottom',
  ]),
  title: string,
};

Fab.defaultProps = {
  className: '',
  count: null,
  iconOpenClass: '',
  items: [],
  offset: [0, 0],
  onClick: () => {},
  position: 'right bottom',
  title: '',
};

export default Fab;
