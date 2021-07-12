window.onload = function () {
  const SM = new Storage();
  const dataArray = SM.dataRetrieve();
  const FM = new Form();
  FM.staticFormGenerate();
  FM.displayForm(dataArray);

  const main = new Main();
};

const array = [];
function storeId(id) {
  // console.log(`received id for array:${id}`);
  let matched = false;
  for (let i in array) {
    if (array[i] == id) {
      let index = array.indexOf(id);
      array.splice(index, 1);
      matched = true;
    }
  }
  if (!matched) {
    array.push(id);
  }
  if (array.length) {
    const FM = new Form();
    FM.activeDeleteButton();
  } else {
    const FM = new Form();
    FM.disableDeleteButtonAfterDelete();
  }
}

function checkAllcheckBoxesFunction() {
  const FM = new Form();
  FM.checkAllcheckBoxes();
  FM.activeDeleteButton();
}

function multiRowDelete() {
  console.log(array);
  const SM = new Storage();
  SM.deleteSelectedRows(array);
}

function pageRefresh() {
  const FM = new Form();
  FM.refreshPage();
  FM.clearForm();
}

function createMainInstance(fid, type) {
  const SM = new Storage();
  const dataArray = SM.dataRetrieve();
  const inputDOMRow = document.querySelectorAll(`input[name="${fid}"]`);

  if (!dataArray.length) {
    if (inputDOMRow.length > 0 || fid.length < 3) {
      alert('please enter unique id and at least 3 digits long');
      return false;
    }
  } else {
    for (let i of dataArray) {
      if (i.id == fid || inputDOMRow.length > 0 || fid.length < 3) {
        alert('please enter unique id and at least 3 digits long');
        return false;
      }
    }
  }
  const sid = uuidv4();
  const main = new Main(fid, sid, type);
  const FM = new Form();
  FM.clearForm();
}
class Main {
  constructor(fid, sid, type) {
    this.fid = fid;
    this.sid = sid;
    this.type = type;
    // this.SM = new Storage(this.sid);
    // this.dataArray = this.SM.dataRetrieve();
    this.FM = new Form(this.fid);
    // this.FM.displayForm(this.dataArray);
    this.FM.createForm(this.fid, this.type);
    this.FM.onSave = function (id, type, value) {
      this.SM = new Storage(this.sid);
      this.SM.addRow(id, type, value);
      this.clearForm();
    };
    this.FM.onRemove = function (removeRowId) {
      const SM = new Storage();
      SM.removeRow(removeRowId);
    };
    this.FM.refreshPage = function () {
      const FM = new Form();
      const SM = new Storage();
      const dataArray = SM.dataRetrieve();
      FM.displayForm(dataArray);
    };
    this.FM.removeTempRow = function (targetId) {
      const SM = new Storage();
      SM.checkIfDeletedWasSaved(targetId);
      // this.removeTempRowLoop(targets);
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
