import React from 'react';
import { Container, Item, ItemLink } from './styles';

export const MenuItems = ({ children }) => <Container>{children}</Container>;

export const MenuItem = ({ text, onClick, to }) => onClick ? <Item onClick={onClick}>{text}</Item> : <ItemLink to={to}>{text}</ItemLink>;
