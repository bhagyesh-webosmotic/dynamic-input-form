window.onload = function () {
  let SM = new Storage();
  let dataArray = SM.dataRetrieve();
  let FM = new Form();
  FM.staticFormGenerate();
  FM.displayForm(dataArray);

  const form = new Main();
};

let array = [];
function storeid(id) {
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
    let FM = new Form();
    FM.activeDeleteButton();
  } else {
    let FM = new Form();
    FM.deactiveDeleteButtonAfterDelete();
  }
}

function checkAllcheckBoxesFunction() {
  let FM = new Form();
  FM.checkAllcheckBoxes();
  FM.activeDeleteButton();
}

function multiRowDelete() {
  console.log(array);
  let SM = new Storage();
  SM.deleteSelectedRows(array);
  let Fm = new Form();
  Fm.deleteTempRowByCheckbox(array);
}

function pageRefresh() {
  let FM = new Form();
  FM.refreshPage();
  FM.clearForm();
}

function createMainInstance(fid, type) {
  let SM = new Storage();
  let dataArray = SM.dataRetrieve();
  let inputDOMRow = document.querySelectorAll(`input[name="${fid}"]`);

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
  let sid = uuidv4();
  const form = new Main(fid, sid, type);
  let FM = new Form();
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
      let SM = new Storage();
      SM.removeRow(removeRowId);
    };
    this.FM.refreshPage = function () {
      let FM = new Form();
      let SM = new Storage();
      let dataArray = SM.dataRetrieve();
      FM.displayForm(dataArray);
    };
    this.FM.removeTempRow = function (targetId) {
      // console.log("inside main class removeTempRow");
      let SM = new Storage();
      SM.checkIfDeletedWasSaved(targetId);
      // this.removeTempRowLoop(targets);
    };
    this.FM.makeRowGreen = function (id) {
      this.makeRowGreenColor(id);
    };
    this.FM.activeCheckbox = function (id) {
      this.activeCheckboxRow(id);
    };
    this.FM.deactiveDeleteButton = function () {
      this.deactiveDeleteButtonAfterDelete();
    };
    this.FM.activeMultiDeleteCheckBox = function () {
      this.activeMultiDeleteCheckBoxTop();
    };
    this.FM.deactiveMultiDeleteCheckBox = function () {
      this.deactiveMultiDeleteCheckBoxAfterDelete();
    };
  }
}
