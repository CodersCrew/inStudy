import { pick } from 'utils';

export const getModalBaseData = props =>
  pick(props, ['visible', 'onClose', 'name', 'iconClass', 'type', 'initialValues', 'moduleIndex', 'id']);
