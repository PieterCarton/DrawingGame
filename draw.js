//canvas drawer constructor
function canvasDrawer(canvas){
    //canvas info
    this.canvas = canvas;
    this.canvasWidth = Math.round(canvas.innerWidth);
    this.canvasHeight = Math.round(canvas.innerHeight);
    
    this.previousPosition;
    this.currentPosition;
    this.isDrawing = false;

    //line parameters
    this.lineWidth = 10;
    this.strokeColor = "#FF0000";

    //methods
    this.updateMousePosition = function(event){
        this.previousPosition = this.currentPosition;
        this.currentPosition = new point(event.clientX, event.clientY);
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
        context.save();
    };
    
    this.undo = function(){
        let context = this.canvas.getContext("2d");
        context.restore();
    }

    //set line parameters
    this.setColor = function(color){
        this.strokeColor = color;
    };
    
    this.setLineWidth = function(width){
        this.lineWidth = width;
    };
    

    //image data manipulation
    this.clearImageData = function(){
        let context = this.canvas.getContext("2d");
        let empty = context.createImageData(this.getImageData());
        this.setImageData(empty);
    };
    
    this.getImageData = function(){
        let context = this.canvas.getContext("2d");
        return context.getImageData(0, 0, 1000, 1000);
    };
    
    this.setImageData = function(imgData){
        let context = this.canvas.getContext("2d");
        context.putImageData(imgData, 0, 0);
    };

    //setup listeners, give reference to this
    canvas.onmousedown = this.startDrawing.bind(this);
    canvas.onmouseup = this.stopDrawing.bind(this);
    canvas.onmousemove = this.drawLine.bind(this);
    canvas.onmouseleave = this.drawLine.bind(this);
}

function point(x, y){
    this.x = x;
    this.y = y;
}

var canvas = document.querySelector("#myCanvas");
var drawer = new canvasDrawer(canvas);