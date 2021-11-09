const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function fok(){
    var px1,x2;
  //  px1=document.getElementById('vuser').value;
  //  document.getElementById('lok').innerHTML=px1;
    
   // localStorage.setItem('x1',px1);
    x2=localStorage.getItem('x1');
    localStorage.setItem('x2',1);
    var xuser;
    xuser=document.getElementById('vuser').value;
    localStorage.setItem('x1','ali');
    document.getElementById('lok').innerHTML=x2;
  window.open('../djo.html');
    window.opener = self;
window.close();
    
}
