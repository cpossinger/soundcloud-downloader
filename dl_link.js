var url = window.location.href;
console.log(url);

if (url.includes("toneden")) {
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('toneden.js');
    s.onload = function() {
      this.remove();
    };
    document.head.appendChild(s);
  }







  /* 
  var s = document.createElement('script');
  s.src = chrome.runtime.getURL('script.js');
  s.onload = function() {
    this.remove();
  };
  document.head.appendChild(s);

  document.addEventListener('login_popup', function(e) {
    var data = e.detail;
    console.log('received', data);

    chrome.runtime.sendMessage({
      message: data.message,
    }, function(response) {
      console.log(response.confirm);
    });

  });
  */
