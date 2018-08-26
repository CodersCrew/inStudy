import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import ModalBase from '../ModalBase';
import FieldArrayForm from './form';

class Skills extends PureComponent {
  render() {
    const { visible, onClose, name, icon } = this.props;
    return <ModalBase visible={visible} onClose={onClose} name={name} icon={icon}>
        <FieldArrayForm />
      </ModalBase>;
  }
}

Skills.propTypes = {
  text: string,
};

Skills.defaultProps = {
  text: 'Skills',
};

export default Skills;
