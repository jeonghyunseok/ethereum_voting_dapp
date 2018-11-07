web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"vaildCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
VotingContract = web3.eth.contract(abi);

contractInstance = VotingContract.at('0x472e9ab2e3f85a51fd1e67bb3f6e96ec28c5a84a')

candidates={"Mina":"candidate-1","SANA":"candidate-2","Jihyo":"candidate-3","Momo":"candidate-4"}

function voteForCandidate(candidate){
    candidateName = $("#candidate").val();

    contractInstance.voteForCandidate(candidateName, {from: web3.eth.account[0], gas:470000},function(){
        let div_id = candidates[candidateName];
        $("#"+div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
    });
}

$(document).ready(function(){
    candidateNames = Object.keys(candidates);

    for(var i=0; i<candidateNames.length; i++){
        let name = candidateNames[i]
        let val = contractInstance.totalVotesFor.call(name).toNumber();
        $("#"+candidates[name]).html(val);
    }
});
