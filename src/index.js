import { Service } from 'feathers-memory';

class LocalStorage extends Service {
  constructor(options = {}) {
    super(options);
    this._storageKey = options.name || 'feathers';
    this._storage = options.storage || window.localStorage;
    this._throttle = options.throttle || 200;
    this.store = null;
  }
  
  ready() {
    if(!this.store) {
      return Promise.resolve(this._storage.getItem(this._storageKey))
        .then(str => JSON.parse(str || '{}'))
        .then(store => {
          const keys = Object.keys(store);
          const last = store[keys[keys.length - 1]];
          
          // Current id is the id of the last item
          this._uId = keys.length ? last[this._id] + 1 : 0;
          
          return (this.store = store);
        });
    }
    
    return Promise.resolve(this.store);
  }
  
  flush(data) {
    if(!this._timeout) {
      this._timeout = setTimeout(() => {
        this._storage.setItem(this._storageKey, JSON.stringify(this.store));
        delete this._timeout;
      }, this.throttle);
    }
    
    return data;
  }
  
  execute(method, ... args) {
    return this.ready()
      .then(() => super[method](... args))
      .then(data => this.flush(data));
  }
  
  create(... args) {
    return this.execute('create', ... args);
  }
  
  patch(... args) {
    return this.execute('patch', ... args);
  }
  
  update(... args) {
    return this.execute('update', ... args);
  }
  
  remove(... args) {
    return this.execute('remove', ... args);
  }
}

export default function init(options) {
  return new LocalStorage(options);
}

init.Service = Service;
