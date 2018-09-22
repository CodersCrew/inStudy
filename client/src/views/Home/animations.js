export const initiativesRoutes = ['/inicjatywy', '/inicjatywy/'];

export const getSpringContainerProps = ({ previousPath, currentPath }) => {
  if (initiativesRoutes.includes(previousPath) && currentPath === '/') {
    return { from: { height: 280 }, to: { height: window.innerHeight - 40 } };
  }
  if (previousPath === '/' && initiativesRoutes.includes(currentPath)) {
    return { from: { height: window.innerHeight - 40 }, to: { height: 280 } };
  }
  if (!previousPath && currentPath === '/') {
    return { from: { height: window.innerHeight } };
  }
  if (!previousPath && initiativesRoutes.includes(currentPath)) {
    return { from: { height: 280 } };
  }
};

export const getSpringHeaderProps = ({ previousPath, currentPath }) => {
  if (initiativesRoutes.includes(previousPath) && currentPath === '/') {
    return { from: { transform: 'scale(0)' }, to: { transform: 'scale(1)' } };
  }
  if (previousPath === '/' && initiativesRoutes.includes(currentPath)) {
    return { from: { transform: 'scale(1)' }, to: { transform: 'scale(0)' } };
  }
  if (!previousPath && currentPath === '/') {
    return { from: { transform: 'scale(1)' } };
  }
  if (!previousPath && initiativesRoutes.includes(currentPath)) {
    return { from: { transform: 'scale(0)' } };
  }
};
