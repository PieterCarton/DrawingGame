import CanvasDrawer from "./canvasDrawer.js";
import FrameSequence from "./frameSequence.js";
import DrawingFrame from "./drawingFrame.js";

function CanvasContext(parent, args){
    //object fields
    this.interactable = true;

    //generate canvas and UI to manipulate canvas
    this.colors = ["#000000", "#FF0000", "#00FF00", "#0000FF","#FFFF00", "#FF00FF","#00FFFF", "#FFFFFF"];
    this.widths = [5, 10, 20, 40];
    
    //get parent node to generate canvas context in
    this.parent = document.querySelector(parent);

    //store frames
    //number of frames, 1 by default
    this.frames = 4;
    this.selectedFrame = 0;
    //frame data
    this.drawingFrames = [];

    //generate HTML elements
    this.fill();

    //store canvas drawer
    this.drawer = new CanvasDrawer(this.canvas);
}

//add all nodes associated with the canvas context object to the DOM
CanvasContext.prototype.fill = function(){
    //create canvas
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    
    //create color selection area
    this.colorDiv = document.createElement("div");
    this.colorDiv.classList.add("color-div");

    //generate color selection buttons
    for(let i = 0; i < this.colors.length; i++){
        let color = this.colors[i];
        let colorButton = document.createElement("button");
        colorButton.classList.add("color-button");
        colorButton.dataset.color = color;
        colorButton.style.backgroundColor = color;
		//listener setup
		colorButton.onclick = function(){this.drawer.setColor(color);}.bind(this);
		
		//add to DOM
        this.colorDiv.appendChild(colorButton);
    }

    //create stroke width selection area
    this.strokeWidthDiv = document.createElement("div");
    this.strokeWidthDiv.classList.add("stroke-width-div");

    //generate color selection buttons
    for(let i = 0; i < this.widths.length; i++){
        let width = this.widths[i];
        let widthButton = document.createElement("button");
        widthButton.classList.add("stroke-width-button");
        widthButton.dataset.width = width;
        widthButton.textContent = width + " px";
		//listener setup
		widthButton.onclick = function(){this.drawer.setLineWidth(width);}.bind(this);
		
		//add to DOM
        this.strokeWidthDiv.appendChild(widthButton);
    }
	
	//undo button
	this.undoButton = document.createElement("button");
    this.undoButton.classList.add("undo-button");
    this.undoButton.textContent = "UNDO";
	//listener setup
	this.undoButton.onclick = function(){this.drawer.undo();}.bind(this);

    //captioning field
    this.captionField = document.createElement("input");
    this.captionField.classList.add("caption-field");
    this.captionField.placeholder = "Describe Your Masterpiece!";

    //next/prev frame buttons
    //next button
	this.next = document.createElement("button");
    this.next.classList.add("next-button");
    this.next.textContent = ">";
    //listener setup
	this.next.onclick = this.nextFrame.bind(this);

    //prev button
	this.prev = document.createElement("button");
    this.prev.classList.add("prev-button");
    this.prev.textContent = "<";
    //listener setup
	this.prev.onclick = this.prevFrame.bind(this);

    //page counter
    this.pageCounter = document.createElement("p");
    this.updatePageCounter();

    //append all elements to the parent node
    this.parent.appendChild(this.canvas);
    this.parent.appendChild(this.colorDiv);
    this.parent.appendChild(this.strokeWidthDiv);
    this.parent.appendChild(this.undoButton);
    this.parent.appendChild(this.captionField);
    this.parent.appendChild(this.prev);
    this.parent.appendChild(this.next);
    this.parent.appendChild(this.pageCounter);
}

//delete all nodes associated with the canvas context object from the DOM
CanvasContext.prototype.clear = function(){
    //TODO
}

CanvasContext.prototype.acceptMsg = function(msg){
    if(!msg){
        console.log("ERROR: component recieved undefined message");
        return;
    }

    if(msg.type == Messages.T_DRAWING_REQUEST){
        //TODO
    }else if(msg.type == Messages.T_DISPLAY_FRAME_SEQUENCE){
        let frameSequence = msg.frameSequence;
        this.setFrameSequence(frameSequence);
        console.log("sequence set");
    }else{
        console.log("ERROR: message type unknown");
    }
}

CanvasContext.prototype.setFrameSequence = function(frameSequence){
    this.setFrame(0);
    this.frames = frameSequence.frames;
    for(let i = 0; i < this.frames; i++){
        this.drawingFrames[i] = frameSequence.drawingFrames[i];
    }
    //set frame data
    this.frames = frameSequence.frames;
    this.drawer.setImageData(frameSequence.drawingFrames[0].imageData);
    this.setCaption(frameSequence.drawingFrames[0].caption);
    this.setFrame(0);
}

CanvasContext.prototype.getFrameSequence = function(){
    //save current frame
    this.setFrame(this.selectedFrame);
    let frameSequence = new FrameSequence();
    for(let i = 0; i < this.frames; i++){
        let frame = this.drawingFrames[i];
        if(!frame){
            frame = new DrawingFrame();
        }
        frameSequence.addDrawingFrame(frame);
    }
    console.log(frameSequence);
    return frameSequence;
}

CanvasContext.prototype.nextFrame = function(){
    this.setFrame(this.selectedFrame + 1);
}

CanvasContext.prototype.prevFrame = function(){
    this.setFrame(this.selectedFrame - 1);
}

CanvasContext.prototype.setFrame = function(newFrame){
    //check if new frame is valid frame
    if(newFrame < 0 || newFrame >= this.frames){
        return;
    }
    //store data of current frame
    let imageData = this.drawer.getImageData();
    let caption = this.getCaption();
    let drawingFrame = new DrawingFrame(imageData);
    if(caption != ""){
        drawingFrame.setCaption(caption);
    }
    this.drawingFrames[this.selectedFrame] = drawingFrame;

    //select new frame
    this.selectedFrame = newFrame;
    drawingFrame = this.drawingFrames[this.selectedFrame];

    //generate new drawingframe if no frame exists already
    if(drawingFrame == undefined){
        this.drawer.clearImageData();
        drawingFrame = new DrawingFrame(this.drawer.getImageData());
    }
    this.setCaption(drawingFrame.caption);
    imageData = drawingFrame.imageData;
    this.drawer.setImageData(imageData);
    //new image loaded, so there should be no saved frames
    this.drawer.savedFrames = 0;

    this.updatePageCounter();
}

CanvasContext.prototype.updatePageCounter = function(){
    this.pageCounter.textContent = (this.selectedFrame + 1) + "/" + this.frames;
}

CanvasContext.prototype.setCaption = function(caption){
    this.captionField.value = caption;
}

CanvasContext.prototype.getCaption = function(){
    return this.captionField.value;
}

CanvasContext.prototype.setViewOnly = function(viewOnly){
    if(viewOnly){
        this.disable();
    }else{
        this.enable();
    }
}

//var canvasContextObject = new CanvasContext(["#000000", "#FF0000", "#00FF00", "#0000FF","#FFFF00", "#FF00FF","#00FFFF", "#FFFFFF"], [5, 10, 20, 40], "body");

export default CanvasContext;