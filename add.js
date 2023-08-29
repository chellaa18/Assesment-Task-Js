const date = document.getElementById("productcreatedate");
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
date.value = `${year}/${month}/${day}`;

const validateProduct = () => {
  let mrp = document.getElementById("productmrp");
  let MRP = mrp.value;
  let sp = document.getElementById("productsalesprice");
  let SP = sp.value;
  let qty = document.getElementById("productquantity").value;

  if (qty === "") {
    alert("Quantity should not left empty");
    return false;
  }
  if (!/^([^.0-]\d+|\d)*$/g.test(qty)) {
    alert("Quantity should be a positive integer");
    return false;
  }

  if (!/^\d*[.]?\d*$/g.test(qty)) {
    alert("SP should be a number");
    return false;
  }
  if (MRP === "") {
    alert("Mrp should not left empty");
    return false;
  }
  if (!/^\d*[.]?\d*$/g.test(MRP)) {
    alert("MRP should be a number");
    return false;
  }
  if (!/^([^.0-]\d+|\d)*$/g.test(MRP)) {
    alert("MRP should be a positive integer");
    return false;
  }
  if (SP === "") {
    alert("sales Price should not left empty");
    return false;
  }

  if (!/^\d*[.]?\d*$/g.test(SP)) {
    alert("SP should be a number");
    return false;
  }
  if (!/^([^.0-]\d+|\d)*$/g.test(SP)) {
    alert("Sales Price should be a positive integer");
    return false;
  }
   else {
    return true;
  }
};

const form = document.getElementById("productform");

const formData = JSON.parse(localStorage.getItem("products")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateProduct()) {
    let productName = document.getElementById("productname").value;
    let productQty = document.getElementById("productquantity").value;
    let productMrp = parseFloat(document.getElementById("productmrp").value);
    let productSp = parseFloat(
      document.getElementById("productsalesprice").value
    );
    let productDate = document.getElementById("productcreatedate").value;

    const productId = formData.length + 1;
    
      let product = {
        productId: productId,
        productName: productName,
        productQty: productQty,
        productMrp: productMrp.toFixed(2),
        productSp: productSp.toFixed(2),
        productDate: productDate
      };
      formData.push(product);
      
      localStorage.setItem("products", JSON.stringify(formData));
      window.location.href = "/products.html";
    
    form.reset();
  }
});
