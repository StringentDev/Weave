document.getHTML = function (who, deep) {
	if (!who || !who.tagName) return '';
	var txt, ax, el = document.createElement("div");
	el.appendChild(who.cloneNode(false));
	txt = el.innerHTML;
	if (deep) {
		ax = txt.indexOf('>') + 1;
		txt = txt.substring(0, ax) + who.innerHTML + txt.substring(ax);
	}
	el = null;
	return txt;
}

var parse = (template) => {
	let result = /{{(.*?)}}/g.exec(template);
	const arr = [];
	let firstPos;

	while (result) {
		firstPos = result.index;
		if (firstPos !== 0) {
			arr.push(template.substring(0, firstPos));
			template = template.slice(firstPos);
		}

		arr.push(result[0]);
		template = template.slice(result[0].length);
		result = /{{(.*?)}}/g.exec(template);
	}

	if (template) arr.push(template);
	return arr;
}

const compileToString = (template) => {
	const ast = template;
	let fnStr = `""`;

	ast.map(t => {
		// checking to see if it is an interpolation
		if (t.startsWith("{{") && t.endsWith("}}")) {
			// append it to fnStr
			fnStr += `+data.${t.split(/{{|}}/).filter(Boolean)[0].trim()}`;
		} else {
			// append the string to the fnStr
			fnStr += `+\`${t}\``;
		}
	});

	return fnStr;
}

const compile = (template) => {
	return new Function("data", "return " + compileToString(template))
}

RenderString = async (string, data) => {
	array = parse(string)
	result = compile(array)

	array.forEach((element) => {

		console.log(element)
		document.getElementById("app").innerHTML = result(data)
	})
}

RenderElement = (data, locals) => {
	
	array = parse(data)
	result = compile(array)
	product = result(locals)
	document.getElementById("app").innerHTML = product
}
