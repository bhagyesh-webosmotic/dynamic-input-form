import Main, { array, tempArray } from './main.js';
export default class Form {
  constructor(fid) {
    this.fid = fid;
  }
  storeId(id) {
    let matched = false;
    for (const i in array) {
      if (array[i] == id) {
        const index = array.indexOf(id);
        array.splice(index, 1);
        matched = true;
      }
    }
    if (!matched) {
      array.push(id);
      console.log(array);
    }
    if (array.length) {
      this.activeDeleteButton();
    } else {
      this.disableDeleteButtonAfterDelete();
    }
  }
  onSave(e) {
    const id = e.target.name;
    const type = e.target.getAttribute('input-type');
    const value = document.getElementById(e.target.name).value;
    const main = new Main();
    main.FM.onSave(id, type, value);
    main.FM.activeMultiDeleteCheckBox();
  }
  onRemove(e) {
    const removeRowId = e.target.getAttribute('name');
    const main = new Main();
    main.FM.onRemove(removeRowId);
  }
  refreshPage() {
    console.log('refresh triggered');
    document.getElementById('dynamicForm').innerHTML = '';
    const main = new Main();
    main.FM.refreshPage();
    const refreshMultiDeleteCheckbox = document.getElementById('multiDeleteCheckbox');
    refreshMultiDeleteCheckbox.checked = false;
  }
  removeTempRow(e) {
    const targetId = e.target.id;
    // const targets = document.getElementsByName(targetId);
    const main = new Main();

    if (document.querySelector(`[row="${targetId}"]`)) {
      document.querySelector(`[row="${targetId}"]`).remove();
    } else {
      document.getElementById(targetId).remove();
    }

    main.FM.removeTempRow(targetId);
  }
  clearForm() {
    document.getElementById('idInput').value = '';
  }
  makeRowGreenColor(id) {
    document.querySelector(`.${id}`).style.backgroundColor = '#C9E4C5';
  }

  activeDeleteButton() {
    document.getElementById('delete').style.visibility = 'visible';
  }
  disableDeleteButtonAfterDelete() {
    document.getElementById('delete').style.visibility = 'hidden';
  }

  activeMultiDeleteCheckBoxTop() {
    document.getElementById('multiDeleteCheckbox').style.visibility = 'visible';
  }
  disableMultiDeleteCheckBoxAfterDelete() {
    document.getElementById('multiDeleteCheckbox').style.visibility = 'hidden';
  }

  selectedTempRowForDeletion(e) {
    const FM = new Form();
    const targetId = e.target.name;
    const selectedRowByName = document.getElementsByName(targetId).checked;
    if (!selectedRowByName) {
      FM.storeId(targetId);
    }
    FM.checkIfAllCheckboxesAreSelected(targetId);
    // document.getElementById(targetId).remove()
  }
  selectedRowForDeletion(e) {
    const FM = new Form();
    const targetId = e.target.id;
    const selectedRow = document.getElementById(targetId).checked;
    if (!selectedRow) {
      FM.storeId(targetId);
    }
    FM.checkIfAllCheckboxesAreSelected(targetId);
  }

  checkAllcheckBoxes() {
    const currentStateOfCheckAllCheckbox = document.getElementById('multiDeleteCheckbox');
    const allInputs = document.getElementsByTagName('input');
    const delteAllButtonStatus = document.getElementById('delete').style.visibility;
    if (!currentStateOfCheckAllCheckbox.checked) {
      for (var i = 0; i < allInputs.length; i++) {
        if (allInputs[i].type === 'checkbox' && allInputs[i].id !== 'multiDeleteCheckbox') {
          allInputs[i].checked = false;
        }
      }
      if (delteAllButtonStatus == 'visible') {
        console.log('disabled delete button');
        this.disableDeleteButtonAfterDelete();
        document.getElementById('delete').style.visibility = 'hidden';
      }
    } else {
      for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].type === 'checkbox' && allInputs[i].id !== 'multiDeleteCheckbox') {
          allInputs[i].checked = true;
          if (allInputs[i].id) {
            this.storeId(allInputs[i].id);
          } else {
            this.storeId(allInputs[i].name);
          }
        }
      }
    }
  }
  checkIfAllCheckboxesAreSelected(id) {
    const allInputs = document.getElementsByTagName('input');
    let allInputsCount = 0;

    for (let i = 0; i < allInputs.length; i++) {
      if (allInputs[i].type === 'checkbox' && allInputs[i].id !== 'multiDeleteCheckbox') {
        allInputsCount++;
      }
    }

    let matched = false;
    if (id && id !== 'multiDeleteCheckbox') {
      for (const i in tempArray) {
        if (tempArray[i] == id) {
          const index = tempArray.indexOf(id);
          tempArray.splice(index, 1);
          matched = true;
        }
      }
      if (!matched) {
        tempArray.push(id);
        console.log(tempArray);
      }
    }

    if (tempArray.length == allInputsCount) {
      document.getElementById('multiDeleteCheckbox').checked = true;
    } else {
      document.getElementById('multiDeleteCheckbox').checked = false;
    }
  }
  staticFormGenerate() {
    const main = new Main();
    const staticFormContainer = document.getElementById('staticFormContainer');
    const nestedButtonContainer = document.createElement('div');
    nestedButtonContainer.className = 'nestedButtonContainer';
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkboxContainer';
    const inputContainer = document.createElement('div');
    inputContainer.className = 'inputContainer';
    const selectAndAddContainer = document.createElement('div');
    selectAndAddContainer.className = 'selectAndAddContainer';
    const refreshAndDeleteContainer = document.createElement('div');
    refreshAndDeleteContainer.className = 'refreshAndDeleteContainer';

    // const staticForm = document.getElementById('staticForm');
    //
    // const h2 = document.createElement('h2');
    // h2.innerText = 'Dynamically adding element inside the form.';
    // staticFormContainer.appendChild(h2);
    //
    const nestedAddIcon = document.createElement('i');
    nestedAddIcon.className = 'far';
    nestedAddIcon.classList.add('fa-plus-square');
    nestedAddIcon.onclick = this.nestedMenu;
    nestedButtonContainer.appendChild(nestedAddIcon);
    staticFormContainer.appendChild(nestedButtonContainer);
    //
    const multiDeleteCheckbox = document.createElement('input');
    multiDeleteCheckbox.type = 'checkbox';
    multiDeleteCheckbox.id = 'multiDeleteCheckbox';
    multiDeleteCheckbox.name = 'multiDeleteCheckbox';
    multiDeleteCheckbox.className = 'multiDeleteCheckbox';
    multiDeleteCheckbox.classList.add('formFieldsStatic');
    multiDeleteCheckbox.onclick = main.FM.checkAllcheckBoxesFunction;
    checkboxContainer.appendChild(multiDeleteCheckbox);
    staticFormContainer.appendChild(checkboxContainer);
    //
    const idInput = document.createElement('input');
    idInput.setAttribute('type', 'text');
    idInput.name = 'idName';
    idInput.className = 'formFieldsStatic';
    idInput.classList.add('staticInput');
    idInput.id = 'idInput';
    idInput.placeholder = 'Enter ID';
    inputContainer.appendChild(idInput);
    staticFormContainer.appendChild(inputContainer);

    //
    const selectOption = document.createElement('select');
    selectOption.name = 'element';
    selectOption.className = 'formFieldsStatic';
    selectOption.classList.add('staticSelect');
    selectOption.id = 'element';
    selectAndAddContainer.appendChild(selectOption);
    staticFormContainer.appendChild(selectAndAddContainer);
    const optionList = document.getElementById('element').options;
    const options = [
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
    const addButton = document.createElement('input');
    addButton.setAttribute('type', 'button');
    addButton.className = 'btnStatic';
    addButton.classList.add('staticAdd');
    addButton.value = 'Add';
    addButton.onclick = main.FM.createFormRow;
    selectAndAddContainer.appendChild(addButton);
    staticFormContainer.appendChild(selectAndAddContainer);
    //
    const refreshButton = document.createElement('input');
    refreshButton.setAttribute('type', 'button');
    refreshButton.id = 'Refresh';
    refreshButton.className = 'btnStatic';
    refreshButton.classList.add('staticRefresh');
    refreshButton.value = 'Refresh';
    refreshButton.onclick = main.FM.refreshPage;
    refreshAndDeleteContainer.appendChild(refreshButton);
    staticFormContainer.appendChild(refreshAndDeleteContainer);
    //
    const deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.id = 'delete';
    deleteButton.className = 'btnStatic';
    deleteButton.classList.add('multiDelete');
    deleteButton.classList.add('staticDelete');
    deleteButton.value = 'Delete';
    deleteButton.onclick = main.SM.multiRowDeleteFunction;
    refreshAndDeleteContainer.appendChild(deleteButton);
    staticFormContainer.appendChild(refreshAndDeleteContainer);
  }
  nestedMenu() {
    const FM = new Form();
    FM.staticFormGenerate();
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
  validation(id) {
    const main = new Main();
    return main.SM.createMainInstance(id);
  }
  createForm(fid, type) {
    const validData = this.validation(fid);
    if (fid && validData) {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'dynamicRow';
      // rowDiv.className = fid;
      rowDiv.setAttribute('row', fid);

      const form = document.getElementById('dynamicForm');
      const nestedButtonContainer = document.createElement('div');
      nestedButtonContainer.className = 'nestedButtonContainer';
      const checkboxContainer = document.createElement('div');
      checkboxContainer.className = 'dynamiccheckboxContainer';
      const lebalContainer = document.createElement('div');
      lebalContainer.className = 'dynamiclebalContainer';
      const inputContainer = document.createElement('div');
      inputContainer.className = 'dynamicselectContainer';
      const saveAndRemoveContainer = document.createElement('div');
      saveAndRemoveContainer.className = 'dynamicrefreshAndDeleteContainer';

      rowDiv.appendChild(nestedButtonContainer);

      const checkbox = document.createElement('INPUT');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', fid);
      checkbox.setAttribute('class', 'formFields');
      checkbox.classList.add('checkbox');
      checkbox.onclick = this.selectedTempRowForDeletion;
      checkboxContainer.appendChild(checkbox);
      rowDiv.appendChild(checkboxContainer);

      const h3 = document.createElement('h3');
      const textNode = document.createTextNode(fid);
      h3.appendChild(textNode);
      h3.setAttribute('name', fid);
      h3.setAttribute('class', fid);
      lebalContainer.appendChild(h3);
      rowDiv.appendChild(lebalContainer);

      const input = document.createElement('input');
      this.attrib(input, fid, type);
      inputContainer.appendChild(input);
      rowDiv.appendChild(inputContainer);

      const save = document.createElement('button');
      this.buttonAttrib(save, fid, type);

      save.onclick = this.onSave;
      save.innerHTML = 'save';
      saveAndRemoveContainer.appendChild(save);
      rowDiv.appendChild(saveAndRemoveContainer);

      const remove = document.createElement('button');
      this.buttonAttrib(remove, fid);
      remove.setAttribute('id', fid);

      remove.onclick = this.removeTempRow;
      remove.innerHTML = 'Remove';
      saveAndRemoveContainer.appendChild(remove);
      rowDiv.appendChild(saveAndRemoveContainer);
      form.appendChild(rowDiv);

      const main = new Main();
      main.FM.activeMultiDeleteCheckBox();
      this.clearForm();
    }
  }
  displayForm(dataArray) {
    const form = document.getElementById('dynamicForm');
    form.innerHTML = '';
    for (const i in dataArray) {
      const id = dataArray[i].id;
      const type = dataArray[i].type;
      const value = dataArray[i].value;

      const rowDiv = document.createElement('div');
      // rowDiv.className = id;
      rowDiv.setAttribute('id', id);
      rowDiv.className = 'dynamicRow';

      const nestedButtonContainer = document.createElement('div');
      nestedButtonContainer.className = 'nestedButtonContainer';
      const checkboxContainer = document.createElement('div');
      checkboxContainer.className = 'dynamiccheckboxContainer';
      const lebalContainer = document.createElement('div');
      lebalContainer.className = 'dynamiclebalContainer';
      const inputContainer = document.createElement('div');
      inputContainer.className = 'dynamicselectContainer';
      const saveAndRemoveContainer = document.createElement('div');
      saveAndRemoveContainer.className = 'dynamicrefreshAndDeleteContainer';

      rowDiv.appendChild(nestedButtonContainer);

      const checkbox = document.createElement('INPUT');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('id', id);
      checkbox.setAttribute('class', 'formFields');
      checkbox.classList.add('checkbox');
      checkbox.onclick = this.selectedRowForDeletion;
      checkboxContainer.appendChild(checkbox);
      rowDiv.appendChild(checkboxContainer);

      const h3 = document.createElement('h3');
      const textNode = document.createTextNode(id);
      h3.appendChild(textNode);
      h3.setAttribute('class', id);
      lebalContainer.appendChild(h3);
      rowDiv.appendChild(lebalContainer);

      const input = document.createElement('input');
      this.attrib(input, id, type, value);
      inputContainer.appendChild(input);
      rowDiv.appendChild(inputContainer);

      const save = document.createElement('button');
      this.attrib(save, id, type, value);
      this.buttonAttrib(save, id, type);

      save.onclick = this.onSave;
      save.innerHTML = 'save';
      saveAndRemoveContainer.appendChild(save);
      rowDiv.appendChild(saveAndRemoveContainer);

      const remove = document.createElement('button');
      this.buttonAttrib(remove, id);
      // remove.setAttribute("type", "button");
      remove.setAttribute('name', id);
      // remove.setAttribute("class", "btn");

      remove.onclick = this.onRemove;
      remove.innerHTML = 'Remove';
      saveAndRemoveContainer.appendChild(remove);
      rowDiv.appendChild(saveAndRemoveContainer);
      form.appendChild(rowDiv);
      document.querySelector(`.${id}`).style.backgroundColor = '#C9E4C5';
    }
    if (dataArray.length) {
      const main = new Main();
      main.FM.activeMultiDeleteCheckBox();
    }
  }
}

// document.querySelector(".sfsf").style.backgroundColor = "#C9E4C5"
// activeCheckboxRow(id){
//   let div = document.querySelectorAll('input[type=checkbox]')
//   for(let i in div){
//     if(div[i].name == id){
//       div[i].style.visibility = "visible"
//     }
//   }
//   // document.getElementById(`.${id}`).visibility = "visible"
// }
