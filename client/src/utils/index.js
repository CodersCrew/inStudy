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
