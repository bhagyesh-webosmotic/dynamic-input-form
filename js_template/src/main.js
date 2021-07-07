
class Main {
	constructor(fid, sid, type) {
		this.fid = fid;
		this.sid = sid;
		this.type = type;
		this.FM = new Form(this.fid);
		this.SM = new Storage(this.sid);
		this.FM.createForm(this.fid, this.type); // (creates input field in DOM)
		// console.log(`fid:${this.fid}, sid:${this.fid}`);
	}
}

function onAdd(e) {
	e.preventDefault();
	let id = e.target.name;
	let type = e.target.getAttribute("input-type");
	let value = document.getElementById(e.target.name).value;
	let SM = new Storage();
	SM.addRow(id, type, value);
	clearForm();
}
function onRemove(e) {
	e.preventDefault();
	let removeRowId = e.target.getAttribute("name");
	let SM = new Storage();
	SM.removeRow(removeRowId);
}

function clearForm() {
	document.getElementById("idInput").value = "";
}

function createMainInstance(fid, type) {
	// console.log(`fid:${fid},type:${type}`);
	let sid = uuidv4();
	const form = new Main(fid, sid, type);
	clearForm();
}

function refreshPage() {
	console.log("refresh triggered");
	document.getElementById("dynamicForm").innerHTML = "";
	let FM = new Form();
	let SM = new Storage();
	let dataArray = SM.dataRetrieve();
	FM.displayForm(dataArray);
}

function removeTempRow(e) {
	let targetId = e.target.id;
	let targets = document.getElementsByName(targetId);
	removeTempRowLoop(targets);
}
function removeTempRowLoop(targets) {
	for (let i of targets) {
		i.remove();
		removeTempRowLoop(targets);
	}
}

function attrib(input, element) {
	if (!element.value) {
		// console.log("inside dom");
		switch (element.type) {
			case "range":
				input.setAttribute("min", 0);
				input.setAttribute("max", 10);
				break;
		}
		input.setAttribute("type", element.type);
		input.setAttribute("name", element.id);
		input.setAttribute("value", element.id);
		input.setAttribute("id", element.id);
		if (element.type == "color") {
			input.setAttribute("class", "colorPicker");
		} else {
			input.setAttribute("class", "formFields");
		}
	} else {
		// console.log("inside saved data");
		switch (element.type) {
			case "range":
				input.setAttribute("min", 0);
				input.setAttribute("max", 10);
				break;
		}
		input.setAttribute("type", element.type);
		input.setAttribute("value", element.value);
		input.setAttribute("id", element.id);
		if (element.type == "color") {
			input.setAttribute("class", "colorPicker");
		} else {
			input.setAttribute("class", "formFields");
		}
	}
}
window.onload = function () {
	let FM = new Form();
	let SM = new Storage();
	let dataArray = SM.dataRetrieve();
	FM.displayForm(dataArray);
};
