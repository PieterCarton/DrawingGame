//canvas drawer constructor
function CanvasDrawer(canvas){
    //canvas info
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.width;
    
    this.previousPosition;
    this.currentPosition;
    this.isDrawing = false;

    //line parameters
    this.lineWidth = 10;
    this.strokeColor = "#FF0000";

    //undo variables
    this.undoFrames = [];
    this.savedFrames = 0;
    this.maxSavedFrames = 10;
    this.frameIndex = 0;

    //methods
    this.updateMousePosition = function(event){
        this.previousPosition = this.currentPosition;
        this.currentPosition = new Point(event.offsetX, event.offsetY);
    };

    this.drawLine = function(event){
        this.updateMousePosition(event);

        //end line when user is not drawing
        if(!this.isDrawing){
            return;
        }
        //draw graphics
        let context = this.canvas.getContext("2d");
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeColor;
        context.lineCap = "round";
    
        if(this.previousPosition && this.currentPosition){
            context.moveTo(this.previousPosition.x, this.previousPosition.y);
            context.lineTo(this.currentPosition.x, this.currentPosition.y);
            context.stroke();
        }
    };

    this.startDrawing = function(event){
		this.saveFrame();
        this.updateMousePosition(event);
        this.isDrawing = true;
        let context = this.canvas.getContext("2d");
        context.beginPath();
        this.drawLine(event);
    };
    
    this.stopDrawing = function(event){
        this.drawLine(event);
        this.isDrawing = false;
        let context = this.canvas.getContext("2d");
        context.closePath();
    };

    this.onLeave = function(event){
        if(this.isDrawing){
            this.stopDrawing(event);
        }
    };
    
    this.undo = function(){
        let context = this.canvas.getContext("2d");
    }

    //set line parameters
    this.setColor = function(color){
        this.strokeColor = color;
    };
    
    this.setLineWidth = function(width){
        this.lineWidth = width;
    };

    //save/undo functions
    this.saveFrame = function(){
        let frame = this.getImageData();
        //update number of saved frames
        if(this.savedFrames < this.maxSavedFrames){
            this.savedFrames++;
        }
        //place in saved frames array
        let index = this.frameIndex % this.maxSavedFrames;
        this.undoFrames[index] = this.getImageData();
        //update frame index
        this.frameIndex++;
    }

    this.canUndo = function(){
        return (this.savedFrames > 0);
    }

    this.undo = function(){
        if(!this.canUndo()){
            console.log("ERROR: no available saved frames");
            return;
        }
        this.frameIndex--;
        let prevFrameIndex = this.frameIndex % this.maxSavedFrames;
        let prevFrame = this.undoFrames[prevFrameIndex];

        this.setImageData(prevFrame);

        this.savedFrames--;
    }

    //image data manipulation
    this.clearImageData = function(){
        let context = this.canvas.getContext("2d");
        let empty = context.createImageData(this.getImageData());
        this.setImageData(empty);
    };
    
    this.getImageData = function(){
        let context = this.canvas.getContext("2d");
        return context.getImageData(0, 0, this.width, this.height);
    };
    
    this.setImageData = function(imgData){
        //set to clear canvas if image data is no defined
        if(imgData == undefined){
            this.clearImageData();
            return;
        }//if image data is defined, set image data of canvas to new imgData
        let context = this.canvas.getContext("2d");
        context.putImageData(imgData, 0, 0);
    };

    //setup listeners, give reference to this
    canvas.onmousedown = this.startDrawing.bind(this);
    canvas.onmouseup = this.stopDrawing.bind(this);
    canvas.onmousemove = this.drawLine.bind(this);
    canvas.onmouseleave = this.onLeave.bind(this);
}