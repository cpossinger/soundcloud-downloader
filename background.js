chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    files: ['bootstrap.bundle.js', 'content.js']
  });
});
async function getCurrentTab() {
  let queryOptions = {
    active: true
  };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "dl_link") {
      console.log("dl_link");
      getCurrentTab()
        .then((tab) => {
          chrome.scripting.executeScript({
            target: {
              tabId: tab.id
            },
            files: [request.site + '.js']
          });
        })
    } else if (request.message === "done") {
      console.log("done");
      /*
      chrome.tabs.query({}, function(tabs) {
        for (const tab of tabs) {
          if (tab.url.includes("toneden")) {
            chrome.tabs.remove(tab.id)
          }
        }

      })
      */
    } else if (request.message === "dl_hypeddit") {
      console.log(request.url)
      console.log(request.filename)




      chrome.downloads.download({
        url: request.url,
        filename: request.filename
      });

      sendResponse({
        confirm: "file downloaded"
      });


    }


  }
);


/*
 else if (request.message === "sc") {

      function listener(tabId, changeInfo, tab) {
        // make sure the status is 'complete' and it's the right tab
        getCurrentTab()
          .then((tab) => {
            if (tabId === tab.id && changeInfo.status == 'complete') {
              chrome.scripting.executeScript({
                target: {
                  tabId: tab.id
                },
                files: ['click.js']
              });

              chrome.tabs.onUpdated.removeListener(listener);
            }
          })
      };

      chrome.tabs.onUpdated.addListener(listener);

      //chrome.tabs.goBack();


      sendResponse({
        confirm: "sc script executed"
      });

    }
    */
