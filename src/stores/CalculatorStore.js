import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';

class CalculatorStore extends EventEmitter {

  constructor() {
    super();
    this.subscribe(() => this.register.bind(this));
  }

  addChangeListener(cb) {
    this.on('CHANGE', cb);
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }

  emitChange() {
    this.emit('CHANGE');
  }

  subscribe(actionSubscribe) {
    this.dispatchToken = AppDispatcher.register(actionSubscribe());
  }

  register(action) {
    switch(action.actionType) {
      case 'insertActionHere':
        this.emitChange();
        break;
      default:
        break;
    }
  }

}

export default new CalculatorStore();