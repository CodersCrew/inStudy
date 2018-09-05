import styled from 'styled-components';
import { Button } from 'antd';

const disabledActionStyles = `
  color: var(--grey4);
  cursor: default;
  pointer-events: none;

  &:hover,
  &:active {
    text-decoration: none;
    color: var(--grey4);
  }
`;

export const TableWrapper = styled.div`
  td {
    vertical-align: top;
    font-family: var(--mainFont);
    font-size: var(--font-sm);
    line-height: var(--font-sm-lh);
    font-weight: var(--regular);
    color: var(--text1);
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    word-break: normal;
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

  .ant-table-wrapper {
    width: 100%;
  }

  td.name {
    color: var(--primary2);
    font-weight: var(--medium);
  }

  .name {
    min-width: 200px;
  }

  .defaultTags {
    min-width: 240px;
  }

  .defaultDescription {
    min-width: 240px;
  }

  .actions {
    width: 128px;
    min-width: 128px;
  }
`;

export const Actions = styled.div`
  display: flex;
`;

export const Action = styled.div`
  color: var(--primary3);
  transition: all 0.3s var(--ease-in-out);
  cursor: pointer;

  &:hover {
    color: var(--primary3-hover);
    text-decoration: underline;
  }

  &:active {
    color: var(--primary3-active);
    text-decoration: underline;
  }

  & + div {
    margin-left: var(--space-md);
  }

  ${props => props.isDisabled && disabledActionStyles};
`;

export const StyledButton = styled(Button)`
  margin: var(--space-md);
`;
