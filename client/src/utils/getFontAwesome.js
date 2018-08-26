const enhanceHead = (tagName, attributes) => {
  const element = document.createElement(tagName);
  const head = document.querySelector('head');
  const items = head.querySelectorAll('*');
  const firstItem = items[0];
  Object.keys(attributes).map((key) => {
    element.setAttribute(key, attributes[key]);
  });
  head.insertBefore(element, firstItem);
};

export default fa => {
  if (fa === 'local') {
    enhanceHead('link', {
      rel: 'stylesheet prefetch',
      href: 'https://static.fontawesome.com/css/fontawesome-app.css',
    });
    enhanceHead('link', {
      rel: 'stylesheet prefetch',
      href: 'https://pro-staging.fontawesome.com/releases/v5.2.0/css/all.css',
    });
  } else {
    enhanceHead('link', {
      rel: 'stylesheet',
      href: 'https://pro.fontawesome.com/releases/v5.2.0/css/all.css',
      integrity: fa,
      crossorigin: 'anonymous',
    });
  }
  return true;
};
