export const editorStyles = `
> div {
  border: 1px solid #d9d9d9;
}

> div:first-child {
  border-radius: 4px 4px 0 0;
}

> div:last-child {
  border-radius: 0 0 4px 4px;
}

strong {
  font-weight: var(--bold);
}

em {
  font-style: italic;
}

u {
  text-decoration: underline;
}

h1 {
  font-family: var(--headerFont);
  font-size: var(--font-xl);
  line-height: var(--font-xl-lh);
  color: var(--text1);
}

h2 {
  font-family: var(--headerFont);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  color: var(--text1);
}

h3 {
  font-family: var(--headerFont);
  font-size: var(--font-md);
  line-height: var(--font-md-lh);
  color: var(--text1);
}

p {
  font-family: var(--mainFont);
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  color: var(--text1);
}

a {
  font-family: var(--mainFont);
  font-size: var(--font-sm);
  line-height: var(--font-sm-lh);
  color: var(--primary3);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
`;
