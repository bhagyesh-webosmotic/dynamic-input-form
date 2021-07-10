class Form {
  constructor(fid) {
    this.fid = fid;
  }
  onSave(e) {
    let id = e.target.name;
    let type = e.target.getAttribute('input-type');
    let value = document.getElementById(e.target.name).value;
    let form = new Main();
    form.FM.onSave(id, type, value);
    form.FM.activeMultiDeleteCheckBox();
  }
  onRemove(e) {
    let removeRowId = e.target.getAttribute('name');
    console.log(`inside remove:${removeRowId}`);
    let form = new Main();
    form.FM.onRemove(removeRowId);
  }
  refreshPage() {
    console.log('refresh triggered');
    document.getElementById('dynamicForm').innerHTML = '';
    let form = new Main();
    form.FM.refreshPage();
  }
  removeTempRow(e) {
    let targetId = e.target.id;
    let targets = document.getElementsByName(targetId);
    let form = new Main();

    if (document.querySelector(`[row="${targetId}"]`)) {
      document.querySelector(`[row="${targetId}"]`).remove();
    } else {
      document.getElementById(targetId).remove();
    }

    form.FM.removeTempRow(targetId);
  }
  clearForm() {
    document.getElementById('idInput').value = '';
  }
  makeRowGreenColor(id) {
    document.querySelector(`.${id}`).style.backgroundColor = '#C9E4C5';
  }
  // activeCheckboxRow(id){
  //   let div = document.querySelectorAll('input[type=checkbox]')
  //   for(let i in div){
  //     if(div[i].name == id){
  //       div[i].style.visibility = "visible"
  //     }
  //   }
  //   // document.getElementById(`.${id}`).visibility = "visible"
  // }
  activeDeleteButton() {
    document.getElementById('delete').style.visibility = 'visible';
  }
  deactiveDeleteButtonAfterDelete() {
    document.getElementById('delete').style.visibility = 'hidden';
  }

  activeMultiDeleteCheckBoxTop() {
    document.getElementById('multiDeleteCheckbox').style.visibility = 'visible';
  }
  deactiveMultiDeleteCheckBoxAfterDelete() {
    document.getElementById('multiDeleteCheckbox').style.visibility = 'hidden';
  }

  selectedTempRowForDeletion(e) {
    let targetId = e.target.name;
    let selectedRowByName = document.getElementsByName(targetId).checked;
    if (!selectedRowByName) {
      storeid(targetId);
    }
    // document.getElementById(targetId).remove()
  }
  selectedRowForDeletion(e) {
    let targetId = e.target.id;
    let selectedRow = document.getElementById(targetId).checked;
    if (!selectedRow) {
      storeid(targetId);
    }
  }
  deleteTempRowByCheckbox(array) {
    for (let i in array) {
      // element.parentNode.removeChild(element)
      // array[i].remove()
      // console.log(array[i]);
    }
  }
  // storeSelectedRowIdForDeletion(id){
  //   this.array.push(id)
  //   console.log(this.array);
  // }

  checkAllcheckBoxes() {
    var allInputs = document.getElementsByTagName('input');
    for (var i = 0, max = allInputs.length; i < max; i++) {
      if (allInputs[i].type === 'checkbox') {
        allInputs[i].checked = true;
        if (allInputs[i].id) {
          storeid(allInputs[i].id);
        } else {
          console.log('temp row detected');
          storeid(allInputs[i].name);
        }
        console.log(allInputs[i].name);
      }
    }
  }

  staticFormGenerate() {
    let staticForm = document.getElementById('staticForm');
    //
    let multiDeleteCheckbox = document.createElement('input');
    multiDeleteCheckbox.type = 'checkbox';
    multiDeleteCheckbox.id = 'multiDeleteCheckbox';
    multiDeleteCheckbox.name = 'multiDeleteCheckbox';
    multiDeleteCheckbox.className = 'multiDeleteCheckbox';
    multiDeleteCheckbox.classList.add('formFieldsStatic');
    multiDeleteCheckbox.setAttribute('onclick', 'checkAllcheckBoxesFunction()');
    staticForm.appendChild(multiDeleteCheckbox);
    //
    let idInput = document.createElement('input');
    idInput.setAttribute('type', 'text');
    idInput.name = 'idName';
    idInput.className = 'formFieldsStatic';
    idInput.id = 'idInput';
    idInput.placeholder = 'Enter ID';
    staticForm.appendChild(idInput);
    //
    let selectOption = document.createElement('select');
    selectOption.name = 'element';
    selectOption.className = 'formFieldsStatic';
    selectOption.id = 'element';
    staticForm.appendChild(selectOption);
    let optionList = document.getElementById('element').options;
    let options = [
      {
        text: 'Text',
        value: 'text',
        selected: true,
      },
      {
        text: 'Date',
        value: 'date',
      },
      {
        text: 'Datetime',
        value: 'datetime-local',
      },
      {
        text: 'Number',
        value: 'number',
      },
      {
        text: 'Color',
        value: 'color',
      },
      {
        text: 'Range',
        value: 'range',
      },
      {
        text: 'E-mail',
        value: 'email',
      },
      {
        text: 'Submit',
        value: 'submit',
      },
    ];
    options.forEach((option) => optionList.add(new Option(option.text, option.value, option.selected)));
    //
    let addButton = document.createElement('input');
    addButton.setAttribute('type', 'button');
    addButton.className = 'btnStatic';
    addButton.value = 'Add';
    addButton.setAttribute(
      'onclick',
      'createMainInstance(document.forms[0][1].value, document.forms[0].element.value)'
    );
    staticForm.appendChild(addButton);
    //
    let refreshButton = document.createElement('input');
    refreshButton.setAttribute('type', 'button');
    refreshButton.id = 'Refresh';
    refreshButton.className = 'btnStatic';
    refreshButton.value = 'Refresh';
    refreshButton.setAttribute('onclick', 'pageRefresh()');
    staticForm.appendChild(refreshButton);
    //
    let deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.id = 'delete';
    deleteButton.className = 'btnStatic';
    deleteButton.classList.add('multiDelete');
    deleteButton.value = 'Delete';
    deleteButton.setAttribute('onclick', 'multiRowDelete()');
    staticForm.appendChild(deleteButton);
  }
  attrib(input, id, type, value) {
    if (!value) {
      // inside dom
      switch (type) {
        case 'range':
          input.setAttribute('min', 0);
          input.setAttribute('max', 10);
          break;
      }
      input.setAttribute('type', type);
      input.setAttribute('name', id);
      input.setAttribute('value', id);
      input.setAttribute('id', id);
      if (type == 'color') {
        input.setAttribute('class', 'colorPicker');
      } else if (type == 'range') {
        input.setAttribute('class', 'rangePicker');
        input.classList.add('formFields');
      } else {
        input.setAttribute('class', 'formFields');
      }
    } else {
      // inside saved data
      switch (type) {
        case 'range':
          input.setAttribute('min', 0);
          input.setAttribute('max', 10);
          break;
      }
      input.setAttribute('type', type);
      input.setAttribute('value', value);
      input.setAttribute('id', id);
      if (type == 'color') {
        input.setAttribute('class', 'colorPicker');
      } else if (type == 'range') {
        input.setAttribute('class', 'rangePicker');
        input.classList.add('formFields');
      } else {
        input.setAttribute('class', 'formFields');
      }
    }
  }

  buttonAttrib(input, id, type) {
    if (!type) {
      //remove button
      input.setAttribute('type', 'button');
      input.setAttribute('name', id);
      input.setAttribute('class', 'btn');
    } else {
      //save button
      input.setAttribute('type', 'button');
      input.setAttribute('name', id);
      input.setAttribute('class', 'btn');
      input.setAttribute('input-type', type);
    }
  }

  createForm(fid, type) {
    if (fid) {
      let rowDiv = document.createElement('div');
      // rowDiv.className = fid;
      rowDiv.setAttribute('row', fid);

      let form = document.getElementById('dynamicForm');

      let checkbox = document.createElement('INPUT');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', fid);
      checkbox.setAttribute('class', 'formFields');
      checkbox.classList.add('checkbox');
      checkbox.onclick = this.selectedTempRowForDeletion;
      rowDiv.appendChild(checkbox);

      let h3 = document.createElement('h3');
      let textNode = document.createTextNode(fid);
      h3.appendChild(textNode);
      h3.setAttribute('name', fid);
      h3.setAttribute('class', fid);
      rowDiv.appendChild(h3);

      let input = document.createElement('input');
      this.attrib(input, fid, type);
      rowDiv.appendChild(input);

      let save = document.createElement('button');
      this.buttonAttrib(save, fid, type);

      save.onclick = this.onSave;
      save.innerHTML = 'save';
      rowDiv.appendChild(save);

      let remove = document.createElement('button');
      this.buttonAttrib(remove, fid);
      remove.setAttribute('id', fid);

      remove.onclick = this.removeTempRow;
      remove.innerHTML = 'Remove';
      rowDiv.appendChild(remove);
      form.appendChild(rowDiv);

      let main = new Main();
      main.FM.activeMultiDeleteCheckBox();
    }
  }
  displayForm(dataArray) {
    let form = document.getElementById('dynamicForm');
    form.innerHTML = '';
    for (let i in dataArray) {
      let id = dataArray[i].id;
      let type = dataArray[i].type;
      let value = dataArray[i].value;

      let rowDiv = document.createElement('div');
      // rowDiv.className = id;
      rowDiv.setAttribute('id', id);

      let checkbox = document.createElement('INPUT');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('id', id);
      checkbox.setAttribute('class', 'formFields');
      checkbox.classList.add('checkbox');
      checkbox.onclick = this.selectedRowForDeletion;
      rowDiv.appendChild(checkbox);

      let h3 = document.createElement('h3');
      let textNode = document.createTextNode(id);
      h3.appendChild(textNode);
      h3.setAttribute('class', id);
      rowDiv.appendChild(h3);

      let input = document.createElement('input');
      this.attrib(input, id, type, value);
      rowDiv.appendChild(input);

      let save = document.createElement('button');
      this.attrib(save, id, type, value);
      this.buttonAttrib(save, id, type);

      save.onclick = this.onSave;
      save.innerHTML = 'save';
      rowDiv.appendChild(save);

      let remove = document.createElement('button');
      this.buttonAttrib(remove, id);
      // remove.setAttribute("type", "button");
      remove.setAttribute('name', id);
      // remove.setAttribute("class", "btn");

      remove.onclick = this.onRemove;
      remove.innerHTML = 'Remove';
      rowDiv.appendChild(remove);
      form.appendChild(rowDiv);
      document.querySelector(`.${id}`).style.backgroundColor = '#C9E4C5';
    }
    if (dataArray.length) {
      let form = new Main();
      form.FM.activeMultiDeleteCheckBox();
    }
  }
}

// document.querySelector(".sfsf").style.backgroundColor = "#C9E4C5"
