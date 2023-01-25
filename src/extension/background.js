chrome.runtime.onMessage.addListener(
   function(message, sender, sendResponse){
    console.log(message);
    if(message.data == "newTab"){
    chrome.tabs.create({url:"index.html/full"})
    sendResponse({data: "success"});
    
   }
   }
);



