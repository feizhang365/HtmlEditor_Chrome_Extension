chrome.devtools.panels.create("Html Editor",
                              "editorIcon.png",
                              "editor_cm.html",
                              function(panel) { 
                              	var _tabId = chrome.devtools.inspectedWindow.tabId;
                              	var _window; // Going to hold the reference to panel.html's `window`
							    var port = chrome.extension.connect({name:"htmlPageEditor_devtools"});
							    port.onMessage.addListener(function(msg) {
							        if (_window) {
							          if(msg.act =="getHtml"){
							          	_window.showHTML(msg.msg);
							          }
							        }
							    });
     
                            	panel.onShown.addListener(function tmp(pwindow){
                            	  panel.onShown.removeListener(tmp); // Run once only
                            	  _window = pwindow;
                            	  //port.postMessage(_tabId);
                            	  port.postMessage({tabId:_tabId,act:"getHtml",msg:""});
                            	});
                              	//createStatusBarButton
                         		var btn = panel.createStatusBarButton("arrow-down-icon.png", "get the page source",false)
                         		btn.onClicked.addListener(function() {if(_window) port.postMessage({tabId:_tabId,act:"getHtml",msg:""})});

                         		var btn2 = panel.createStatusBarButton("arrow-up-icon.png", "render page",false)
                         		btn2.onClicked.addListener(function() {
                         		  port.postMessage({tabId:_tabId,act:"setHtml",msg:_window.getHTML()});
                         		});
								//listen the resource change ,repost the message
								//chrome.devtools.inspectedWindow.onResourceAdded.addListener(function(resource) {port.postMessage(_tabId);});
});



