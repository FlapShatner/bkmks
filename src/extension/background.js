chrome.runtime.onMessage.addListener(
   async function(request, sender, sendResponse){
    console.log(request.action)
    if(request.action === "getRecent"){
    const  data = await chrome.bookmarks.getRecent(20)
    console.log(data)
        sendResponse({data: data}, (response) => {
         console.log(response)
        })
   }
   
   }
);



