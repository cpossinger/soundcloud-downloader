window.focus();
var url = window.location.href;
console.log(url);
var stepFuncs = {
  email: function() {
    document.getElementById("email_name").value = "Cam";
    document.getElementById("email_address").value = "cposs2000@gmail.com";
    document.getElementById("email_name").click();
  },
  sc: function() {
    console.log("sc function");
    if (document.getElementById("comment_sc".value === "1")) {
      console.log("comment required");
      document.getElementById("sc_comment_text".value = "dope");
    }

    var url = document.getElementById("login_to_sc").onclick.toString().match("'([^;]*)'")[1];
    window.open(url, '_blank');

    var data = {
      message: 'sc',
    };

    document.dispatchEvent(new CustomEvent('login_popup', {
      detail: data
    }));


  }

  /*
      sp: function() {

          },
      ig: function() {

          },
          */


};


console.log(stepFuncs);


if (url.includes("hypeddit")) {
  document.getElementById("downloadProcess").click();

  var steps = document.getElementById("nwSteps").value.split(",");
  for (const step of steps) {
    console.log(step);
    stepFuncs[[step]].call();
  }

  document.getElementsByClassName("free_dwln")[0].click();


}
