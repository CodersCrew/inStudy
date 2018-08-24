import { Dialog, CloseButton, Header, Content, Footer } from '../styles';

export const StyledDialog = Dialog.extend`
  border: none;
  padding: 0;
`;

export const StyledCloseButton = CloseButton.extend`
  top: 22px;
  right: var(--space-md);
`;

export const StyledHeader = Header.extend`
  padding: var(--space-md);
  border-bottom: 1px solid var(--grey6);
`;

export const StyledContent = Content.extend`
  padding: var(--space-lg);
`;

export const StyledFooter = Footer.extend`
  padding: var(--space-md);
  border-top: 1px solid var(--grey6);
  margin-top: 0;
`;
