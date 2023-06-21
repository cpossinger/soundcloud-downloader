var bootstrap_style = document.createElement("link");
bootstrap_style.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
bootstrap_style.rel = "stylesheet";
document.head.prepend(bootstrap_style);

var start_modal_html = ` <div class="modal fade" id="start-modal" tabindex="-1" aria-labelledby="exampleModalLabel" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Soundcloud Downloader</h5>
        <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <button type="button" id="start-download" class="btn btn-primary">Start Automatic Downloader</button>
      </div>
    </div>
  </div>
</div> `

document.body.insertAdjacentHTML('afterend', start_modal_html);

var startModal = new bootstrap.Modal(document.getElementById('start-modal'), {});

startModal.show();

document.getElementById("start-modal").style.opacity = 1;

var choose_modal_html = `<div class="modal" id="choose-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Download This Song?</h5>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
      <button type="button" id="yes-download" class="btn btn-success" data-bs-dismiss="modal">Yes</button>
      <button type="button" id="no-download"  class="btn btn-danger" data-bs-dismiss="modal">No</button>
    </div>
    </div>
  </div>
</div>`


document.body.insertAdjacentHTML('afterend', choose_modal_html);
var chooseModal = new bootstrap.Modal(document.getElementById('choose-modal'), {});
document.getElementById("choose-modal").style.opacity = 1;


var finish_modal_html = `<div class="modal" id="finish-modal" tabindex="-1">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body text-center">
        <h5>Finished!</h5>
      </div>
    </div>
  </div>
</div>`

document.body.insertAdjacentHTML('afterend', finish_modal_html);
var finishModal = new bootstrap.Modal(document.getElementById('finish-modal'), {});
document.getElementById("finish-modal").style.opacity = 1;


function waitForPress() {
  return new Promise((resolve) => resolve())
}


function yes(evt) {

  console.log("yes button pressed");
  console.log(evt.currentTarget.dl_btn);
  console.log(evt.currentTarget.dl_link);



  if (evt.currentTarget.dl_btn) {

    evt.currentTarget.track.getElementsByClassName("sc-button-download")[0].click();

  } else if (evt.currentTarget.dl_link) {
    console.log(evt.currentTarget.link);

    evt.currentTarget.link.click();
    chrome.runtime.sendMessage({
      message: "dl_link",
      site: evt.currentTarget.site
    });

  }
  waitForPress();
}

function no() {
  waitForPress();
}





async function download() {

  startModal.hide()
  window.scrollTo(0, document.body.scrollHeight);


  document.getElementById("yes-download").addEventListener("click", yes);
  document.getElementById("no-download").addEventListener("click", no);

  var tracks = document.getElementsByClassName("soundList__item");

  for (const track of tracks) {

    console.log(track);


    document.getElementById("yes-download").dl_btn = undefined;
    document.getElementById("yes-download").dl_link = undefined;

    track.getElementsByClassName("sc-button-more")[0].click();

    var dl_btn = track.getElementsByClassName("sc-button-download")[0];
    var dl_link = track.getElementsByClassName("soundActions__purchaseLink")[0];

    try {
      var dl_link_title = dl_link.title;
    } catch {
      var dl_link_title = "";
    }

    console.log(dl_link_title);


    if (dl_btn) {
      console.log("Download Btn")

      document.getElementById("yes-download").dl_btn = dl_btn;
      document.getElementById("choose-modal").getElementsByClassName("modal-body")[0].appendChild(track);
      document.getElementById("choose-modal").getElementsByClassName("modal-body")[0].getElementsByClassName("commentForm")[0].remove();

      chooseModal.show();

      document.getElementById("choose-modal").getElementsByClassName("modal-body")[0].getElementsByClassName("sc-button-play")[0].click();

      await waitForPress();

      chooseModal.hide();


      document.getElementById("choose-modal").getElementsByClassName("modal-body")[0].getElementsByClassName("sc-button-play")[0].click();
      document.getElementById("choose-modal").getElementsByClassName("modal-body")[0].removeChild(track);


    } else if (dl_link_title.includes("hypeddit") || dl_link_title.includes("toneden") || dl_link_title.includes("bandcamp")) {

      console.log(dl_link);

      if (dl_link_title.includes("hypeddit")) {
        var site = "hypeddit";
      } else if (dl_link_title.includes("toneden")) {
        var site = "toneden";
      } else if (dl_link_title.includes("bandcamp")) {
        var site = "bandcamp";
      }

      document.getElementById("yes-download").link = dl_link;
      document.getElementById("yes-download").site = site;

      document.getElementById("choose-modal").getElementsByClassName("modal-body")[0].appendChild(track);
      document.getElementById("choose-modal").getElementsByClassName("modal-body")[0].getElementsByClassName("commentForm")[0].remove();

      chooseModal.show();

      document.getElementById("choose-modal").getElementsByClassName("modal-body")[0].getElementsByClassName("sc-button-play")[0].click();


      await waitForPress();

      chooseModal.hide();

      document.getElementById("choose-modal").getElementsByClassName("modal-body")[0].getElementsByClassName("sc-button-play")[0].click();
      document.getElementById("choose-modal").getElementsByClassName("modal-body")[0].removeChild(track);

    }

  }

  finishModal.show();
  document.getElementById("yes-download").removeEventListener("click", yes);
  document.getElementById("no-download").removeEventListener("click", no);

}


document.getElementById("start-download").addEventListener("click", download);
