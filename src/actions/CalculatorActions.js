import AppDispatcher from '../dispatchers/AppDispatcher.js';

class CalculatorAction {
  
  insertFunctionHere(insertDataHere) {
    AppDispatcher.dispatch({
      actionType: 'insertActionHere',
      data: insertDataHere
    });
  }
  
}
export default new CalculatorAction();