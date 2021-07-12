import Form from './form.js';
import Storage from './storage.js';

export let array = [];
export let tempArray = [];
// export let checkboxCount = 0;

window.onload = function () {
  const main = new Main();
  main.FM.formOnload();
};
export default class Main {
  constructor(fid, sid) {
    this.fid = fid;
    this.sid = sid;

    this.SM = new Storage();
    this.FM = new Form(this.fid);

    this.SM.createMainInstance = function (id) {
      const SM = new Storage();
      const dataArray = SM.dataRetrieve();
      const inputDOMRow = document.querySelectorAll(`input[name="${id}"]`);
      if (!dataArray.length) {
        if (inputDOMRow.length > 0 || id.length < 3) {
          alert('please enter unique id and at least 3 digits long');
          console.log('inside empty array validation');
          return false;
        }
      } else {
        for (const i of dataArray) {
          if (i.id == id || inputDOMRow.length > 0 || id.length < 3) {
            alert('please enter unique id and at least 3 digits long');
            console.log('inside array validation');
            return false;
          }
        }
      }
      return true;
    };

    this.SM.multiRowDeleteFunction = function () {
      console.log(array);
      const SM = new Storage();
      SM.deleteSelectedRows(array);
    };

    this.FM.formOnload = function () {
      const SM = new Storage();
      const dataArray = SM.dataRetrieve();
      const FM = new Form();
      FM.staticFormGenerate();
      FM.displayForm(dataArray);
    };
    this.FM.checkAllcheckBoxesFunction = function () {
      const FM = new Form();
      FM.checkAllcheckBoxes();
      FM.activeDeleteButton();
    };
    this.FM.createFormRow = function () {
      const FM = new Form();
      FM.createForm(document.forms[0][1].value, document.forms[0].element.value);
    };
    this.FM.onSave = function (id, type, value) {
      this.SM = new Storage(this.sid);
      this.SM.addRow(id, type, value);
      this.clearForm();
    };
    this.FM.onRemove = function (removeRowId) {
      const SM = new Storage();
      SM.removeRow(removeRowId);
    };
    this.FM.afterRemoveRow = function () {
      const FM = new Form();
      FM.refreshPage();
      FM.disableDeleteButtonAfterDelete();
    };
    this.FM.refreshPage = function () {
      const FM = new Form();
      const SM = new Storage();
      const dataArray = SM.dataRetrieve();
      FM.clearForm();
      FM.displayForm(dataArray);
      array = [];
      tempArray = [];
    };
    this.FM.removeTempRow = function (targetId) {
      const SM = new Storage();
      SM.checkIfDeletedWasSaved(targetId);
    };
    this.FM.makeRowGreen = function (id) {
      this.makeRowGreenColor(id);
    };
    this.FM.activeCheckbox = function (id) {
      this.activeCheckboxRow(id);
    };
    this.FM.disableDeleteButton = function () {
      this.disableDeleteButtonAfterDelete();
    };
    this.FM.activeMultiDeleteCheckBox = function () {
      this.activeMultiDeleteCheckBoxTop();
    };
    this.FM.disableMultiDeleteCheckBox = function () {
      this.disableMultiDeleteCheckBoxAfterDelete();
    };
  }
}
