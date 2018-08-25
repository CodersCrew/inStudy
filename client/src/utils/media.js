import { css } from 'styled-components';

export default {
  xxl: (...args) => css`
    @media (min-width: 1600px) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media (max-width: 1599px) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (max-width: 1199px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (max-width: 959px) {
      ${css(...args)}
    }
  `,
  sm: (...args) => css`
    @media (max-width: 767px) {
      ${css(...args)}
    }
  `,
  xs: (...args) => css`
    @media (max-width: 479px) {
      ${css(...args)}
    }
  `,
};
