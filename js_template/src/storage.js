import Main from './main.js';

function structure(id, type, value, nodeId) {
  this.id = id;
  this.type = type;
  this.value = value;
  this.nodeId = nodeId;
}

export default class Storage {
  constructor(sid) {
    this.sid = sid;
  }
  addRow(id, type, value, nodeId, nodeTree) {
    if (localStorage['input'] === undefined) {
      localStorage['input'] = '[]';
    } else {
      console.log(nodeTree);
      let dataArray = [];
      dataArray = JSON.parse(localStorage['input']);
      if (!dataArray.length) {
        dataArray.push(nodeTree);
      } else if (nodeTree.length > dataArray[0].length) {
        dataArray.splice(nodeTree, 1, nodeTree);
      }
      const obj = new structure(id, type, value, nodeId);

      dataArray.forEach((element) => {
        if (element.id == id) {
          const index = dataArray.indexOf(element);
          dataArray.splice(index, 1);
        }
      });
      dataArray.push(obj);
      localStorage['input'] = JSON.stringify(dataArray);
      const main = new Main();
      main.FM.makeRowGreen(id);
      // main.FM.activeCheckbox(id)
    }
  }
  removeRow(removeRowId) {
    let dataArray = [];
    dataArray = JSON.parse(localStorage['input']);
    const newArr = dataArray.filter((val) => {
      return val.id !== removeRowId;
    });
    localStorage['input'] = JSON.stringify(newArr);

    // for(let i in dataArray){
    //   if(dataArray[i].id == removeRowId){

    //     let index = dataArray.indexOf(removeRowId)
    //     dataArray.splice(index, 1)
    //   }
    // }
    // 	localStorage["input"] = JSON.stringify(dataArray);

    const main = new Main();
    main.FM.afterRemoveRow();
  }
  dataRetrieve() {
    if (localStorage['input'] === undefined) {
      localStorage['input'] = '[]';
    } else {
      let dataArray = [];
      dataArray = JSON.parse(localStorage['input']);
      return dataArray;
    }
  }
  checkIfDeletedWasSaved(targetId) {
    let dataArray = [];
    dataArray = JSON.parse(localStorage['input']);
    for (const i in dataArray) {
      if (dataArray[i].id == targetId) {
        this.removeRow(targetId);
      }
    }
  }

  deleteSelectedRows(selectedRowIds) {
    let dataArray = [];
    dataArray = JSON.parse(localStorage['input']);

    for (const i in selectedRowIds) {
      for (const j in dataArray) {
        if (dataArray[j].id == selectedRowIds[i]) {
          const index = dataArray.indexOf(dataArray[j]);
          dataArray.splice(index, 1);
        }
      }
    }
    const dataArrayLength = dataArray.length;
    localStorage['input'] = JSON.stringify(dataArray);
    const main = new Main();
    main.FM.refreshPage();
    main.FM.disableDeleteButton();
    if (!dataArrayLength) {
      main.FM.disableMultiDeleteCheckBox();
    }
  }
}
