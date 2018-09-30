import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { media } from 'utils';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: var(--space-lg);
  ${media.xl`
    grid-template-columns: repeat(3, 1fr);
  `}
  ${media.sm`
    grid-template-columns: repeat(2, 1fr);
  `}
  ${media.xs`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

/* Person */

export const PersonContainer = styled.div`
  box-sizing: border-box;
`;

export const ImageContent = styled.figure`
  position: relative;
  padding: 100% 0 0 0;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  border-radius: 4px;
  margin: 0;

  &:hover {
    figcaption {
      visibility: visible;
      color: var(--white);
      height: 100%;
      transition: all 0.3s var(--ease-in-out);

      ul li a:hover {
        color: rgba(49, 49, 49, 0.97);
      }
    }

    img {
      transform: scale(1.1) rotate(1deg) translateY(12px);
      transition: all 0.4s ease-in-out;
    }
  }
`;

export const Image = styled.img`
  min-width: 100%;
  max-width: 100%;
  border-radius: 4px;
  transform: scale(1) rotate(0) translateY(0);
  transition: all 0.3s var(--ease-in-out);
`;

export const Overlay = styled.figcaption`
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
  color: transparent;
  background-color: transparent;
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  border-radius: 4px;
  overflow: hidden;
  visibility: hidden;
  transition: all 0.3s var(--ease-in-out);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--customColor);
    opacity: 0.85;
  }
`;

export const Description = styled(Scrollbars)`
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  ${media.lg`
    font-size: var(--font-xs);
    line-height: var(--font-xs-lh);
  `}
  ${media.xs`
    font-size: var(--font-sm);
    line-height: var(--font-sm-lh);
  `}
`;

export const Socials = styled.ul`
  display: flex;
  margin-top: auto;
  list-style: none;
  visibility: visible;
  z-index: inherit;
`;

export const Name = styled.h4`
  margin-top: var(--space-md);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  font-weight: var(--medium);
  text-align: center;
  color: var(--text1);
`;

export const Title = styled.div`
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  font-weight: var(--regular);
  text-align: center;
  color: var(--text2);
`;


/* Social */

export const SocialWrapper = styled.li`
  padding: var(--space-sm);
`;

export const Link = styled.div`
  cursor: pointer;
`;

export const Icon = styled.div`
  box-sizing: border-box;
`;
