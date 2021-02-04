function FrameSequence(){
    //player that created the drawings
    this.creator = "unknown";
    //number of frames
    this.frames = 0;
    //array storing frames
    this.drawingFrames = [];
}

FrameSequence.prototype.addDrawingFrame = function(drawingFrame){
    this.drawingFrames[frames] = drawingFrame;
    this.frames++;
}

FrameSequence.prototype.setCreator = function(creator){
    this.creator = creator;
}