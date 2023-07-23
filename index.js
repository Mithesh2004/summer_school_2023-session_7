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

let abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ticketId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "eventId",
				"type": "uint256"
			}
		],
		"name": "createTickets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ticketId",
				"type": "uint256"
			}
		],
		"name": "invalidateTickets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ticketId",
				"type": "uint256"
			}
		],
		"name": "purchaseTicket",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ticketId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferTicket",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "owners",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "ticketid",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "TicketTransfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tickets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "eventId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isValid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "veri_owners",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const ConnectConBtn = document.getElementById("ConnectContract")
ConnectConBtn.addEventListener("click", ConnectCon)

async function ConnectCon(){
    contract = new ethers.Contract("0xd87c3e0D0273d35D127Be241656872E4229CF340", abi, signer);

}

const transferBtn = document.getElementById("transfer-ticket")
transferBtn.addEventListener("click", transfer)

async function transfer(){
    let tx = await contract.transferTicket(10, "0x1D8F015EE3bbf2FFe9743E9Ce495Cbf2610651E6");
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