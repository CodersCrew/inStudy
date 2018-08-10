
function Storage() {
  this.storage = [];
}

Storage.prototype.find = function(path) {
  return this.storage.find((singleElement) => {
    console.log(singleElement, path)
    return singleElement.path === path.substring(0, path.length - 1);
  });
};

Storage.prototype.save = function(path, element) {
  this.storage = this.storage.filter((singleElement) => {
    return singleElement.path !== path;
  });
  this.storage.push({ path, ...element });
};

Storage.prototype.createOrAddToSet = function() {

}

module.exports = new Storage();
