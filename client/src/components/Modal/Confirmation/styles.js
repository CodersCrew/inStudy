import { Dialog, CloseButton, Title, Content, Footer } from '../styles';

export const StyledDialog = Dialog.extend`
  border: none;
  display: flex;
  flex-direction: column;
  padding: var(--space-lg);
`;

export const StyledCloseButton = CloseButton.extend`
  top: var(--space-md);
  right: var(--space-md);
`;

export const StyledTitle = Title.extend`
  padding: var(--space-md) 0 var(--space-sm);
  text-align: center;
`;

export const StyledContent = Content.extend`
  text-align: center;
`;

export const StyledFooter = Footer.extend`
  display: flex;
  justify-content: center;
`;
