import React from 'react';
import { arrayOf, exact, string } from 'prop-types';
import {
  Container,
  ItemContainer,
  DateWrapper,
  DateText,
  Dot,
  ContentWrapper,
  Title,
  Subtitle,
  Description,
} from './styles';

const itemProps = {
  from: string.isRequired,
  to: string.isRequired,
  title: string.isRequired,
  subtitle: string,
  description: string.isRequired,
};

const Item = ({ from, to, title, subtitle, description }) => (
  <ItemContainer>
    <DateWrapper>
      <DateText>{`${from} - ${to}`}</DateText>
      <Dot />
    </DateWrapper>
    <ContentWrapper>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Description>{description}</Description>
    </ContentWrapper>
  </ItemContainer>
);

Item.propTypes = itemProps;

const Timeline = ({ items }) => <Container>{items.map(Item)}</Container>;

Timeline.propTypes = {
  items: arrayOf(exact(itemProps)).isRequired,
};

export default Timeline;
