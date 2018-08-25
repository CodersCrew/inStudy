import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import ModalBase from '../ModalBase';
import { Field } from 'redux-form';
import { NumberInput } from 'components/reduxFormFields';
import { StyledInput, StyledNumberInput } from './styles';

class Skills extends PureComponent {
  render() {
    const { visible, onClose, name, icon } = this.props;
    return (
      <ModalBase visible={visible} onClose={onClose} name={name} icon={icon}>
        <p>LISTA UMIEJĘTNOŚCI</p>
        <Field name="skill" component={NumberInput} props={{ label: 'Nazwa umiejętności' }} />
        <Field
          name="level"
          component={NumberInput}
          props={{ label: 'Poziom', name: 'level', min: 0, max: 100, step: 1 }}
        />
      </ModalBase>
    );
  }
}

Skills.propTypes = {
  text: string,
};

Skills.defaultProps = {
  text: 'Skills',
};

export default Skills;
