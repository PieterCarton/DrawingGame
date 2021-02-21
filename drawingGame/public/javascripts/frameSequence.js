function FrameSequence(){
    //number of frames
    this.frames = 0;
    //array storing frames
    this.drawingFrames = [];
}

FrameSequence.prototype.addDrawingFrame = function(drawingFrame){
    this.drawingFrames[this.frames] = drawingFrame;
    this.frames++;
}

FrameSequence.prototype.setCreator = function(creator){
    this.creator = creator;
}

export default FrameSequence;