class Storage {
  constructor(sid) {
    this.sid = sid;
  }
  addRow(id, type, value) {
    if (localStorage['input'] === undefined) {
      localStorage['input'] = '[]';
    } else {
      let dataArray = [];
      dataArray = JSON.parse(localStorage['input']);

      function structure(id, type, value) {
        this.id = id;
        this.type = type;
        this.value = value;
      }

      const obj = new structure(id, type, value);

      dataArray.forEach((element) => {
        if (element.id == id) {
          console.log('matched');
          const index = dataArray.indexOf(element);
          // console.log(index);
          dataArray.splice(index, 1);
        }
      });
      dataArray.push(obj);
      localStorage['input'] = JSON.stringify(dataArray);
      const form = new Main();
      form.FM.makeRowGreen(id);
      // form.FM.activeCheckbox(id)
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

    const form = new Form();
    form.refreshPage();
    form.deactiveDeleteButtonAfterDelete();
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
    // console.log(`target id of temp Row:${targetId}`);
    for (let i in dataArray) {
      if (dataArray[i].id == targetId) {
        // console.log("matched temp row for saved data");
        this.removeRow(targetId);
      }
    }
  }

  deleteSelectedRows(selectedRowIds) {
    let dataArray = [];
    dataArray = JSON.parse(localStorage['input']);

    for (let i in selectedRowIds) {
      for (let j in dataArray) {
        if (dataArray[j].id == selectedRowIds[i]) {
          const index = dataArray.indexOf(dataArray[j]);
          dataArray.splice(index, 1);
        }
      }
    }
    const dataArrayLength = dataArray.length;
    localStorage['input'] = JSON.stringify(dataArray);
    const form = new Main();
    form.FM.refreshPage();
    form.FM.deactiveDeleteButton();
    if (!dataArrayLength) {
      form.FM.deactiveMultiDeleteCheckBox();
    }
  }
}
