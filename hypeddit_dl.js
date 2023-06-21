console.log("hypeddit script executed");

if (typeof link === "string") {



  var file_type = window.document.getElementsByTagName("video")[0].getElementsByTagName("source")[0].type.split("/")[1];
  var filename = window.document.getElementsByClassName("sidebar-heading")[0].getElementsByTagName("h2")[0].textContent +
    "." + file_type;
}

var data = {
  download_link: download_link,
  filename: filename 
};

document.dispatchEvent(new CustomEvent('dl', { detail: data }));
