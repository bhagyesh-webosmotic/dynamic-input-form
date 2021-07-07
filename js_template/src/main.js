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
}
function createMainInstance(fid, type) {
	let sid = uuidv4();
	const form = new Main(fid, sid, type);
	// clearForm();
}
class Main {
	constructor(fid, sid, type) {
		this.fid = fid;
		this.sid = sid;
		this.type = type;
		this.FM = new Form(this.fid);
		this.FM.createForm(this.fid, this.type); // (creates input field in DOM)
		this.FM.onSave = function (e) {
			let id = e.target.name;
			let type = e.target.getAttribute("input-type");
			let value = document.getElementById(e.target.name).value;
			this.SM = new Storage(this.sid);
			this.SM.addRow(id, type, value);
			this.clearForm();
		};
		this.FM.onRemove = function (e) {
			let removeRowId = e.target.getAttribute("name");
			let SM = new Storage();
			SM.removeRow(removeRowId);
		};
		this.FM.refreshPage = function () {
			console.log("refresh triggered");
			document.getElementById("dynamicForm").innerHTML = "";
			let FM = new Form();
			let SM = new Storage();
			let dataArray = SM.dataRetrieve();
			FM.displayForm(dataArray);
		};
		this.FM.removeTempRow = function (e) {
			let targetId = e.target.id;
			let targets = document.getElementsByName(targetId);
			this.removeTempRowLoop(targets);
		};
	}
}
