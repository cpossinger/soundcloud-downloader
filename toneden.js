//window.addEventListener('load', function() {
  console.log("toneden script executed");
  document.getElementsByClassName("post-gate-btn")[0].click();
  console.log(document.getElementsByClassName("post-gate-btn")[0].classList.contains("disabled"));
  console.log(document.getElementsByClassName("btn"));

  if (document.getElementsByClassName("post-gate-btn")[0].classList.contains("disabled")) {
    while (document.getElementsByClassName("post-gate-btn")[0].classList.contains("disabled")) {
      document.getElementsByClassName("btn")[0].click();
    }
    document.getElementsByClassName("post-gate-btn")[0].click();
  }

  chrome.runtime.sendMessage({
    message: "done"
  }, function(response) {
    console.log(response.confirm);
  });




//})
