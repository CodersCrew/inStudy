class Storage {
  constructor() {
    this.storage = [];
  }

  find = path => {
    return this.storage.find(singleElement => {
      console.log(singleElement, path);
      return singleElement.path === path.substring(0, path.length - 1);
    });
  };

  save = (path, element) => {
    this.storage = this.storage.filter(singleElement => {
      return singleElement.path !== path;
    });
    this.storage.push({ path, ...element });
  };

  createOrAddToSet = () => {
    console.log('createOrAddToSet invoked!');
  };
}

export default new Storage();
