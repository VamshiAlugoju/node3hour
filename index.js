
document.querySelector("#Submit").addEventListener("click",addItem);
const Name = document.querySelector("#Name");
const price = document.querySelector("#Price");
const description = document.querySelector("#Description");
const quantity = document.querySelector("#Quantity");
const ul_items =  document.querySelector(".list-group")
window.addEventListener("load",LoadItems);
 
function LoadItems()
{
    axios.get("http://localhost:3000")
    .then(res=>{
       res.data.forEach(item=>{
        addTodom(item);
       })
    })
    .catch(err=>console.log(err));
}

 

 function addItem(e)
{  
    e.preventDefault();
    console.log("helo");
    const Item = {
       Name : Name.value,
       Price:price.value,
       Description:description.value,
       Quantity:quantity.value
    }
    axios.post("http://localhost:3000",Item)
    .then(res=>{
         addTodom(res.data);
    })
    .catch(err=>console.log(err));
}

function addTodom(item)
{
  
    let newli =   document.createElement("li");
    let buyOne = document.createElement("button");
    let buyTwo = document.createElement("button");
    let buyThree = document.createElement("button");
    let priceSpan = document.createElement("div");
  
    buyOne.classList = "btn btn-primary btn-sm";
    buyTwo.classList = "btn btn-primary btn-sm";
    buyThree.classList = "btn btn-primary btn-sm";
    newli.classList = " list-item list-group-item"
    priceSpan.classList = "d-inline"

    priceSpan.id = "QUANTITY";
    newli.id = item.id;
    buyOne.id = "1"
    buyTwo.id = "2"
    buyThree.id = "3"
    buyOne.addEventListener("click" , buyOneItem)
    buyTwo.addEventListener("click" , buyOneItem)
    buyThree.addEventListener("click" , buyOneItem)
    
    priceSpan.innerHTML = item.Quantity;
    buyOne.innerText = "BuyOne"
    buyTwo.innerText = "BuyTwo"
    buyThree.innerText = "BuyThree"
    newli.innerText =  item.Name + " " + item.Description+" "+item.Price +"RS"+"  ";
    newli.appendChild(priceSpan);
    newli.appendChild(document.createTextNode(" "))
    newli.appendChild(buyOne);
    newli.appendChild(document.createTextNode(" "))
    newli.appendChild(buyTwo);
    newli.appendChild(document.createTextNode(" "))
    newli.appendChild(buyThree);
    ul_items.appendChild(newli)
}

function buyOneItem(e)
{
    let buybtnVal = e.target.id;
    let li = e.target.parentElement
    let quantity = li.querySelector("#QUANTITY");
    if(parseInt(quantity.innerText) < parseInt(buybtnVal) )
      alert("you cannot buy")
    else
    buy(buybtnVal,li);
}

function buy(val,li)
{   
    
    let id = li.getAttribute("id");
    let quantity = li.querySelector("#QUANTITY");
    let priceSpan = document.createElement("div");
    priceSpan.classList = "d-inline"
    priceSpan.id = "QUANTITY";
    axios.put(`http://localhost:3000/${id}?val=${val}`)
    .then(res=>{
        priceSpan.innerHTML = res.data;
        // console.log(res.data);
        insertAfter(priceSpan , quantity);
        li.removeChild(quantity);
    })
    .catch(err=>console.log(err));
}
 
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}