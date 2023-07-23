import {ethers} from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.6.4/ethers.min.js";

let signer =null;
let provider;
let contract= null;

if (window.ethereum == null) {
    provider = ethers.getDefaultProvider()
}
else {
    provider = new ethers.BrowserProvider(window.ethereum)
}

const ConnectBtn = document.getElementById("connectt")
ConnectBtn.addEventListener("click", Connect)

async function Connect(){
    signer = await provider.getSigner();
    console.log(signer);
}

let abi = [] //abi of the contract

const ConnectConBtn = document.getElementById("ConnectContract")
ConnectConBtn.addEventListener("click", ConnectCon)

async function ConnectCon(){
    contract = new ethers.Contract("<contract address>", abi, signer);

}

const transferBtn = document.getElementById("transfer-ticket")
transferBtn.addEventListener("click", transfer)

async function transfer(){
    let tx = await contract.transferTicket(10, "<to address>");
    let receipt = await tx.wait()
    console.log(receipt)
}

const listenBtn = document.getElementById("listen-event")
listenBtn.addEventListener("click", listen)

async function listen(){
    const listener = async (ticketId , from ,to) => {
        console.log(ticketId, from ,to)
	}
    contract.on("TicketTransfer", listener)
}
