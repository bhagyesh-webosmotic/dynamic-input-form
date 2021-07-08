class Form {
	constructor(fid) {
		this.fid = fid;
	}
	onSave(e) {
		let form = new Main();
		form.FM.onSave(e);
	}
	onRemove(e) {
		let form = new Main();
		form.FM.onRemove(e);
	}
	refreshPage() {
		let form = new Main();
		form.FM.refreshPage();
	}
	removeTempRow(e) {
		let form = new Main();
		form.FM.removeTempRow(e);
	}
	removeTempRowLoop(targets) {
		for (let i of targets) {
			i.remove();
			this.removeTempRowLoop(targets);
		}
	}
	attrib(input, id, type, value) {
		if (!value) {
			// inside dom
			switch (type) {
				case "range":
					input.setAttribute("min", 0);
					input.setAttribute("max", 10);
					break;
			}
			input.setAttribute("type", type);
			input.setAttribute("name", id);
			input.setAttribute("value", id);
			input.setAttribute("id", id);
			if (type == "color") {
				input.setAttribute("class", "colorPicker");
			} else if (type == "range") {
				input.setAttribute("class", "rangePicker");
			} else {
				input.setAttribute("class", "formFields");
			}
		} else {
			// inside saved data
			switch (type) {
				case "range":
					input.setAttribute("min", 0);
					input.setAttribute("max", 10);
					break;
			}
			input.setAttribute("type", type);
			input.setAttribute("value", value);
			input.setAttribute("id", id);
			if (type == "color") {
				input.setAttribute("class", "colorPicker");
			} else if (type == "range") {
				input.setAttribute("class", "rangePicker");
				input.classList.add("formFields");
			} else {
				input.setAttribute("class", "formFields");
			}
		}
	}

	buttonAttrib(input, id, type) {
		if (!type) {
			//remove button
			input.setAttribute("type", "button");
			input.setAttribute("name", id);
			input.setAttribute("class", "btn");
		} else {
			//save button
			input.setAttribute("type", "button");
			input.setAttribute("name", id);
			input.setAttribute("class", "btn");
			input.setAttribute("input-type", type);
		}
	}

	createForm(fid, type) {
		if (fid) {
			let form = document.getElementById("dynamicForm");

			let h3 = document.createElement("h3");
			let textNode = document.createTextNode(fid);
			h3.appendChild(textNode);
			h3.setAttribute("name", fid);
			form.appendChild(h3);

			let input = document.createElement("input");
			this.attrib(input, fid, type);
			form.appendChild(input);

			let save = document.createElement("button");
			this.buttonAttrib(save, fid, type);

			save.onclick = this.onSave;
			save.innerHTML = "save";
			form.appendChild(save);

			let remove = document.createElement("button");
			this.buttonAttrib(remove, fid);
			remove.setAttribute("id", fid);

			remove.onclick = this.removeTempRow;
			remove.innerHTML = "Remove";
			form.appendChild(remove);
		}
	}
	displayForm(dataArray) {
		let form = document.getElementById("dynamicForm");
		form.innerHTML = "";
		for (let i in dataArray) {
			let id = dataArray[i].id;
			let type = dataArray[i].type;
			let value = dataArray[i].value;

			let h3 = document.createElement("h3");
			let textNode = document.createTextNode(id);
			h3.appendChild(textNode);
			form.appendChild(h3);

			let input = document.createElement("input");
			this.attrib(input, id, type, value);
			form.appendChild(input);

			let save = document.createElement("button");
			this.attrib(save, id, type, value);
			this.buttonAttrib(save, id, type);

			save.onclick = this.onSave;
			save.innerHTML = "save";
			form.appendChild(save);

			let remove = document.createElement("button");
			this.buttonAttrib(remove, id);
			// remove.setAttribute("type", "button");
			remove.setAttribute("name", i);
			// remove.setAttribute("class", "btn");

			remove.onclick = this.onRemove;
			remove.innerHTML = "Remove";
			form.appendChild(remove);
		}
	}
	clearForm() {
		document.getElementById("idInput").value = "";
	}
}
