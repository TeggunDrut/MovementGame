let canvas;
let ctx;
let width;
let height;
const objects = [];

const get = (id) => document.getElementById(id);

const gameLoaded = () => {
    canvas = get("canvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    // May need to recalc this on resize
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
};

const addElement = () => {
    const object = {
        pos: {
            x: get('positionX').value,
            y: get('positionY').value,
        },
        size: {
            x: get('width').value,
            y: get('height').value,
        },
    };
    objects.push(object);
    ctx.fillRect(object.pos.x, object.pos.y, object.size.y, object.size.x);
};

const saveLevel = () => {
    // Write File
	var textToWrite = JSON.stringify(objects, null, 4);;
	var textFileAsBlob = new Blob([textToWrite], { type:'text/plain' });
	var fileNameToSaveAs = 'level.js';

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null) {
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	} else {
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
};