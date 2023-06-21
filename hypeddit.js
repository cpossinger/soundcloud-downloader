console.log("hypeddit script executed");

var link = document.getElementById("current_download_file_listner").value;
var download_link = "https://hypeddit-gates-prod.s3.amazonaws.com/" + link + "_main";

console.log(window.document)


window.location.href = download_link

console.log(window.document)


  /*
var s = document.createElement('script');
s.src = chrome.runtime.getURL('hypeddit_dl.js');
s.onload = function() {
  this.remove();
};
document.body.appendChild(s);


document.addEventListener('dl', function(e) {
  var data = e.detail;
  console.log('received', data);
  chrome.runtime.sendMessage({
    message: "dl_hypeddit",
    url: data.download_link,
    filename: data.filename
  }, function(response) {
    console.log(response.confirm);
  });
});
*/
