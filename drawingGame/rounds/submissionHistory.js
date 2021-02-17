/**
 * Used to store all submission made in a round
 */
module.exports = function(){
    this.submissionGroups = [];
    this.groups = 0;

    this.addSubmissionGroup = function(){
        this.submissionGroups[this.groups] = [];
        this.groups++;
    }

    this.addSubmission = function(submission){
        let player = submission.player;
        this.submissionGroups[this.groups - 1][player] = submission;
    }

    this.getSubmission = function(group, player){
        return this.submissionGroups[group][player];
    }
}