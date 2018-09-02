import { pick } from 'utils';

export const getModalBaseData = props =>
  pick(props, ['visible', 'onClose', 'name', 'icon', 'type', 'initialValues', 'moduleIndex']);
