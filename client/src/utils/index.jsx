import React from 'react';

export const getViewportSize = () => {
  const width = window.innerWidth;

  if (width >= 1600) {
    return { name: 'xxl', value: 1600 };
  } else if (width >= 1200) {
    return { name: 'xl', value: 1200 };
  } else if (width >= 960) {
    return { name: 'lg', value: 960 };
  } else if (width >= 768) {
    return { name: 'md', value: 768 };
  } else if (width >= 480) {
    return { name: 'sm', value: 480 };
  } else {
    return { name: 'xs', value: 0 };
  }
};

export const sliceText = (text = '', maxCharacters = 20) =>
  text.length > maxCharacters ? `${text.slice(0, maxCharacters - 4)}...` : text;

export const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

export const replaceInArray = (array, value, index) => {
  const newItem = array.slice(0);
  newItem[index] = value;
  return newItem;
};

export const removeFromArray = (array, index) => array.filter((item, i) => i !== index);

export const pick = (obj, arr) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

export const moveInArr = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const isInitiativeView = () => window.location.pathname.includes('inicjatywy');

export const nl2br = text =>
  text.split('\n').map((item, key) => (
    <span key={key}>
      {item}
      <br />
    </span>
  ));

export getFontAwesome from './getFontAwesome';
export media from './media';
export notificationsTheme from './notificationsTheme';
