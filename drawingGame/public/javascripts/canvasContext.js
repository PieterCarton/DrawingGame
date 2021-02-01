function canvasContext(colors){
    //generate canvas and UI to manipulate canvas
    this.colors = colors;
	
	//create canvas
	this.canvas = document.querySelector("canvas");
	
	//canvasDrawer object
	this.drawer = new canvasDrawer(this.canvas);
	
    //create color selection area
    let colorDiv = document.createElement("div");
    colorDiv.classList.add("color-div");
    document.querySelector("body").appendChild(colorDiv);

    //generate color selection buttons
    for(let i = 0; i < colors.length; i++){
        let color = colors[i];
        let colorButton = document.createElement("button");
        colorDiv.classList.add("color-button");
        colorButton.dataset.color = color;
		//listener setup
		colorButton.onclick = function(){this.drawer.setColor(color);}.bind(this);
		
		//add to DOM
        colorDiv.appendChild(colorButton);
    }
	
	//undo button
	this.undoButton = document.createElement("button");
    this.undoButton.classList.add("undo-button");
	//listener setup
	this.undoButton.onclick = function(){this.drawer.undo();}.bind(this);
    document.querySelector("body").appendChild(this.undoButton);
}

var canvasContextObject = new canvasContext(["#000000", "#FF0000", "#00FF00", "#0000FF","#FFFF00", "#FF00FF","#00FFFF", "#FFFFFF"]);