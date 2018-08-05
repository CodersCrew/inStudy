export default (tagName, attributes) => {
  const element = document.createElement(tagName);
  const head = document.querySelector('head');
  const items = head.querySelectorAll('*');
  const firstItem = items[0];
  Object.keys(attributes).map((key) => {
    element.setAttribute(key, attributes[key]);
  });
  head.insertBefore(element, firstItem);
};
