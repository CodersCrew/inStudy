import styled from 'styled-components';
import { editorStyles } from 'components/reduxFormFields/styles';

export const Container = styled.div`
  width: 100%;

  .image-gallery {
    width: 100%;
  }

  .image-gallery-image img {
    border-radius: 4px 4px 0 0;
  }

  .image-gallery-thumbnail {
    border-radius: 4px;

    &.active {
      border-color: var(--customColor);
    }
  }

  .image-gallery-slide-wrapper button:hover::before {
    color: var(--white);
  }
`;

export const Content = styled.div`
  padding: var(--space-lg);
  border-top: 2px solid var(--customColor);
`;

export const Name = styled.div`
  padding-bottom: var(--space-xs);
  font-family: var(--headerFont);
  font-size: var(--font-xl);
  line-height: var(--font-xl-lh);
  font-weight: var(--medium);
  color: var(--text1);
`;

export const Header = styled.div`
  border-bottom: 1px solid var(--grey5);
  padding-bottom: var(--space-md);
  font-family: var(--headerFont);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  font-weight: var(--regular);
  color: var(--text2);
`;

export const Description = styled.div`
  padding: var(--space-md) 0 var(--space-lg);
  ${editorStyles}
`;

export const Socials = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 32px);
  grid-gap: var(--space-md);

  @media (max-width: 540px) { grid-template-columns: repeat(9, 32px); }

  @media (max-width: 492px) { grid-template-columns: repeat(8, 32px); }

  @media (max-width: 444px) { grid-template-columns: repeat(7, 32px); }

  @media (max-width: 396px) { grid-template-columns: repeat(6, 32px); }

  @media (max-width: 348px) { grid-template-columns: repeat(5, 32px); }
`;

export const Social = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid var(--grey4);
  cursor: pointer;
  transition: all 0.3s var(--ease-in-out);

  &:hover {
    border: 1px solid ${props => props.color};

    i {
      color: ${props => props.color};
    }
  }
`;

export const Icon = styled.i`
  font-size: var(--font-md);
  color: var(--grey4);
  transition: all 0.3s var(--ease-in-out);
`;
