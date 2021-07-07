
class Form {
	constructor(fid) {
		this.fid = fid;
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
			attrib(input, element);
			form.appendChild(input);
			let save = document.createElement("button");
			save.setAttribute("type", "button");
			save.setAttribute("name", fid);
			save.setAttribute("input-type", type);
			save.setAttribute("class", "btn");
			save.setAttribute("onclick", "onAdd(event)");
			save.innerHTML = "save";
			form.appendChild(save);
			let remove = document.createElement("button");
			remove.setAttribute("type", "button");
			remove.setAttribute("name", fid);
			remove.setAttribute("id", fid);
			remove.setAttribute("class", "btn");
			remove.setAttribute("onclick", "removeTempRow(event)");
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
			attrib(input, dataArray[i]);
			form.appendChild(input);
			let save = document.createElement("button");
			attrib(save, dataArray[i]);
			save.setAttribute("type", "button");
			save.setAttribute("name", dataArray[i].id);
			save.setAttribute("input-type", dataArray[i].type);
			save.setAttribute("class", "btn");
			save.setAttribute("onclick", "onAdd(event)");
			save.innerHTML = "save";
			form.appendChild(save);
			let remove = document.createElement("button");
			save.setAttribute("type", "button");
			remove.setAttribute("name", i);
			remove.setAttribute("class", "btn");
			remove.setAttribute("onclick", "onRemove(event);");
			remove.innerHTML = "Remove";
			form.appendChild(remove);
		}
	}
}

