function DrawingFrame(imageData){
    this.imageData = imageData;
    this.captioned = false;
    this.caption = "";
}

DrawingFrame.prototype.setCaption = function(caption){
    this.captioned = true;
    this.caption = caption;
}