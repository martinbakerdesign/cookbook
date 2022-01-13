export default function LocalStorage(
  opts = {
    prefix: "",
  }
) {
  this.prefix = opts.prefix || "";
}

LocalStorage.prototype = {
  prepareKey: function (key) {
    return `${this.prefix}${this.prefix.length > 0 ? "--" : ""}${key}`;
  },
  get: function (key) {
    return window.localStorage.getItem(this.prepareKey(key));
  },
  has: function (key) {
    return this.get(key) != null;
  },
  set: function (key, value) {
    window.localStorage.setItem(this.prepareKey(key), value);
  },
  remove: function (key) {
    return window.localStorage.removeItem(this.prepareKey(key));
  },
  clear: function () {
    return window.localStorage.clear();
  },
};
