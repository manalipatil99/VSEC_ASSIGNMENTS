function calculateDiscount(){

    let price = parseFloat(document.getElementById("price").value);
    let discount = parseFloat(document.getElementById("discount").value);

    if(isNaN(price) || isNaN(discount)){
        alert("Please enter both values.");
        return;
    }

    if(discount < 0 || discount > 100){
        alert("Discount should be between 0 and 100.");
        return;
    }

    let save = (price * discount) / 100;
    let finalPrice = price - save;

    document.getElementById("save").textContent = "You Save:₹" + save.toFixed(2);
    document.getElementById("finalPrice").textContent = "Final Price:₹" + finalPrice.toFixed(2);
}

function resetFields(){

    document.getElementById("price").value = "";
    document.getElementById("discount").value = "";

    document.getElementById("save").textContent = "₹0";
    document.getElementById("finalPrice").textContent = "₹0";
}