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
	attrib(input, element) {
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

	createForm(fid, type) {
		if (fid) {
			let form = document.getElementById("dynamicForm");
			let h3 = document.createElement("h3");
			h3.setAttribute("name", fid);
			let textNode = document.createTextNode(fid);
			h3.appendChild(textNode);
			form.appendChild(h3);
			let input = document.createElement("input");
			let element = {
				id: fid,
				type: type,
			};
			this.attrib(input, element);
			form.appendChild(input);
			let save = document.createElement("button");
			save.setAttribute("type", "button");
			save.setAttribute("name", fid);
			save.setAttribute("input-type", type);
			save.setAttribute("class", "btn");
			// save.setAttribute("onclick", "onAdd(event)");
			save.onclick = this.onSave;
			save.innerHTML = "save";
			form.appendChild(save);

			let remove = document.createElement("button");
			remove.setAttribute("type", "button");
			remove.setAttribute("name", fid);
			remove.setAttribute("id", fid);
			remove.setAttribute("class", "btn");
			// remove.setAttribute("onclick", "removeTempRow(event)");
			remove.onclick = this.removeTempRow;
			remove.innerHTML = "Remove";
			form.appendChild(remove);
		}
	}
	displayForm(dataArray) {
		let form = document.getElementById("dynamicForm");
		form.innerHTML = "";
		for (let i in dataArray) {
			let h3 = document.createElement("h3");
			let textNode = document.createTextNode(dataArray[i].id);
			h3.appendChild(textNode);
			form.appendChild(h3);
			let input = document.createElement("input");
			this.attrib(input, dataArray[i]);
			form.appendChild(input);
			let save = document.createElement("button");
			this.attrib(save, dataArray[i]);
			save.setAttribute("type", "button");
			save.setAttribute("name", dataArray[i].id);
			save.setAttribute("input-type", dataArray[i].type);
			save.setAttribute("class", "btn");
			// save.setAttribute("onclick", "onAdd(event)");
			save.onclick = this.onSave;
			save.innerHTML = "save";
			form.appendChild(save);
			let remove = document.createElement("button");
			save.setAttribute("type", "button");
			remove.setAttribute("name", i);
			remove.setAttribute("class", "btn");
			// remove.setAttribute("onclick", "onRemove(event);");
			remove.onclick = this.onRemove;
			remove.innerHTML = "Remove";
			form.appendChild(remove);
		}
	}
	clearForm() {
		document.getElementById("idInput").value = "";
	}
}
