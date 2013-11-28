chrome.extension.onConnect.addListener(function(port) {
	//if (port.name !== "htmlPageEditor_devtools") return;
	// Remove port when destroyed (eg when devtools instance is closed)
    port.onDisconnect.addListener(function(port) {
       port = null;
    });

	if(port.name =="htmlPageEditor_devtools"){
	    port.onMessage.addListener(function(msg) {
	      var tabId = msg.tabId;
	      if(msg.act == "getHtml"){
            chrome.tabs.executeScript(tabId, {code: 'var res = document.documentElement.outerHTML;res',runAt:"document_start"},function(res){
			  port.postMessage({act:"getHtml",msg:res[0]});
			});
	      }else if(msg.act == "setHtml"){
            //var htmlCode = escape(msg.msg);
		    chrome.tabs.executeScript(tabId, {code: 'document.open();document.write(unescape("'+escape(msg.msg)+'"));document.close();',runAt:"document_start"});
	      }
		});  
	}
});

