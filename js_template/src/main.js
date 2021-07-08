window.onload = function () {
	let SM = new Storage();
	let dataArray = SM.dataRetrieve();
	let FM = new Form();
	FM.displayForm(dataArray);
	const form = new Main();
};
function pageRefresh() {
	let FM = new Form();
	FM.refreshPage();
	FM.clearForm();
}
function createMainInstance(fid, type) {
	let SM = new Storage();
	let dataArray = SM.dataRetrieve();
	let inputDOMRow = document.querySelectorAll(`input[name="${fid}"]`);
  if(dataArray.length == 0 ) {
    if(inputDOMRow.length > 0 || fid.length < 3){
      alert("please enter unique id and at least 3 digits long");
		return;
  }
  }else{
	for (let i of dataArray) {
		if (i.id == fid || inputDOMRow.length > 0 || fid.length < 3) {
			alert("please enter unique id and at least 3 digits long");
			return;
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
		this.FM.removeTempRow = function (targets, targetId) {
      let SM = new Storage();
			SM.checkIfDeleted(targetId)
			this.removeTempRowLoop(targets);
		};
	}
}
