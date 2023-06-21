window.addEventListener('load', function() {
  console.log("bandcamp script executed");
  console.log(document.getElementsByClassName("buyItemNyp")[0]);
  console.log(document.getElementsByClassName("download-link")[0]);
  document.getElementsByClassName("download-link")[0].click();

  if (document.URL.includes("album")) {
    try {



      /*
      document.getElementById("userPrice").setAttribute('value', '0');
      document.getElementsByClassName("download-panel-free-download-link")[0].click();
      document.getElementsByClassName("download-panel-checkout-button")[0].click();

      for (const btn of document.getElementsByClassName("item-button")) {
        if (btn.textContent.includes("Download")) {
          btn.click();
        }
      }
      */




      chrome.runtime.sendMessage({
        message: "done"
      }, function(response) {
        console.log(response.confirm);
      });


    } catch {

      console.log("not free");
      chrome.runtime.sendMessage({
        message: "done"
      }, function(response) {
        console.log(response.confirm);
      });
    }
  } else {
    console.log("not an album page");
    chrome.runtime.sendMessage({
      message: "done"
    }, function(response) {
      console.log(response.confirm);
    });
  }
})
