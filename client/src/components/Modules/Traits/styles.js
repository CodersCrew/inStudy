import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: var(--space-xl);
`;

export const TraitContainer = styled.div`
  box-sizing: border-box;
`;

export const Icon = styled.div`
  margin-bottom: var(--space-md);
  font-size: 48px;
  color: var(--primary2);
`;

export const Name = styled.div`
  font-family: var(--headerFont);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  margin-bottom: var(--space-sm);
`;

export const Description = styled.div`
  box-sizing: border-box;
`;
