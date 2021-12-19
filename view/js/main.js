var web3 = new Web3(Web3.givenProvider);

const chainId=137 //Chain ID for the polygon network
const chainIdEth = 1
const apiBaseUrl = 'https://api.1inch.io/v4.0/' + chainId;

console.log("starting website")
// The minimum ABI to get ERC20 Token balance
const minABI = [  
  // balanceOf
  {    
    constant: true,

    inputs: [{ name: "_owner", type: "address" }],

    name: "balanceOf",

    outputs: [{ name: "balance", type: "uint256" }],

    type: "function",
  },

];

function populateDropDown(){
    let i = 0
    let html = ""
    for (const [key, value] of Object.entries(TOKEN_LIST)) {
        //console.log(value.tags)
        let buttonID = key+"-btn"
        html += "<div class='col-lg-3'><p id='"+buttonID+"' class = 'btn btn-xl btn-dark me-4 " +"button_cls"+"'>"+key+"</p></div>"
    }
    document.getElementById("drop").innerHTML = html
    print(html)
}


async function getBalance(ref){
    console.log(TOKEN_LIST)
    console.log(TOKEN_LIST[ref.innerHTML])
    let tokenAddress=TOKEN_LIST[ref.innerHTML].address
    let contract = new web3.eth.Contract(minABI,tokenAddress);
    let walletAddress = document.getElementById("walletID").value
    let balance = await contract.methods.balanceOf(walletAddress).call();
    return balance

}


function apiRequestUrl(methodName, queryParams) {    
    console.log(queryParams)
    return apiBaseUrl + methodName + '?' + (new URLSearchParams(queryParams)).toString();
}


async function getQuote(balance,token){
    console.log("getting Quote ",balance)
    let tokenID=TOKEN_LIST[token].address
    //IMPORTANT: Currently theese swap values are dummy values on the ethernet network, because 1inch throws 
    //errors when accessing tokens on the polygon network
    let quoteParams={
        fromTokenAddress:tokenID,
        toTokenAddress:"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
        amount:balance
    }
    return fetch(apiRequestUrl('/quote', quoteParams)).then(res => res.json()).then(res => res.toTokenAmount).catch(e=> e);
}


populateDropDown()

let buttons = document.getElementsByClassName("button_cls")
console.log(buttons)
for (let i of buttons) {
  i.addEventListener('click', function() {
    document.getElementById("statusUpdate").innerHTML="Retrieving balance for "+this.innerHTML
    console.log(this.innerHTML)
    let ref = this
    getBalance(this).then(function(value) {
        let readable = web3.utils.fromWei(value, "ether")
        document.getElementById("statusUpdate").innerHTML=ref.innerHTML+" Balance: "+readable
        document.getElementById("exchangeUpdate").innerHTML="Retrieving exchange value"
        return getQuote(value,ref.innerHTML)
      }).catch(function(e) {
        document.getElementById("statusUpdate").innerHTML="and error occured while getting the balance: "+e
    }).then(function(changedBalance){
        console.log("changed balance")
        let readable2 = web3.utils.fromWei(changedBalance, "ether")
        document.getElementById("exchangeUpdate").innerHTML="Exchange Value in DAI " + readable2
    });
    })
}