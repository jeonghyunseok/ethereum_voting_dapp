pragma solidity ^0.4.15;
contract Voting{
    //initialize candidates
    //vote for condidates
    //get count of votes for each candidates

    bytes32[] public candidateList;
    mapping (bytes32 => uint8) public votesReceived;
    constructor(bytes32[] candidateNames) public{
        candidateList = candidateNames;
    }
    
    function voteForCandidate(bytes32 candidate)public{
       require(vaildCandidate(candidate));
        votesReceived[candidate]+=1;
    }
    
    function totalVotesFor(bytes32 candidate) view public returns(uint8){
        return votesReceived[candidate];
    }
    
    //vaild candidate
    function vaildCandidate(bytes32 candidate) view public returns(bool){
        for(uint i=0; i<candidateList.length;i++){
            if(candidateList[i]==candidate){
                return true;
            }
        }
        return false;
    }
}