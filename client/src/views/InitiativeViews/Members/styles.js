import styled from 'styled-components';
import { Container } from 'components';

export const MainContainer = styled(Container)`
  box-sizing: border-box;

  td {
    vertical-align: middle;
    font-family: var(--mainFont);
    font-size: var(--font-md);
    line-height: var(--font-md-lh);
    font-weight: var(--regular);
    color: var(--text1);
  }

  .ant-table-expanded-row {
    td {
      font-size: var(--font-md);
      line-height: var(--font-md-lh);
      color: var(--text2);
    }

    &:hover td {
      background-color: #fbfbfb;
    }
  }

  .ant-table-row-expand-icon-cell,
  .ant-table-expand-icon-th {
    display: none;
  }

  .ant-table-wrapper {
    width: 100%;
  }

  .ant-table-default {
    box-shadow: var(--shadow3);
  }

  .ant-table-tbody {
    background-color: var(--white);
  }

  .image {
    width: 80px;
  }

  .permisions {
    width: 136px;
  }

  .editButton {
    width: 104px;
  }
`;

export const Image = styled.div`
  background: url('${props => props.src}') no-repeat center/cover;
  width: 48px;
  height: 48px;
  border-radius: 100%;
`;

export const Name = styled.h2`
  font-family: var(--mainFont);
  font-size: var(--font-lg);
  line-height: var(--font-lg-lh);
  font-weight: var(--bold);
  color: var(--text1);
`;
