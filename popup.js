window.onload = function () {
    document.getElementById("test").addEventListener("click", function () {
        chrome.tabs.executeScript({
            code: 'var c = document.getElementById("c-video_html5_api").textTracks;' +
                'r = []; for(var i=0; i<c.length; i++){r[i] = {"label": c[i].label, "mode": c[i].mode}};console.log(r);' +
                'chrome.storage.local.set({"data": r, "title": document.title})'
        });
        chrome.storage.local.get(["data", "title"], function(res){
            var res_srt = "";
            for (var i=0; i < res.data.length; i++){
                if(res.data[i].mode == "showing"){
                    res_srt += "<p><input class='item' type='checkbox' checked='' id='" + i + "'>" +res.data[i].label + "</p>"
                }else{
                    res_srt += "<p><input class='item' type='checkbox' id='" + i + "'>" +res.data[i].label + "</p>"
                }
            }
            var lang_list = document.getElementById("lang_list");
            lang_list.innerHTML = res_srt;
    
    
            var items = document.getElementsByClassName("item");

            for (var item of items){
                item.addEventListener("click", function(){
                    if(this.checked){
                        chrome.tabs.executeScript({
                            code: 'var c = document.getElementById("c-video_html5_api").textTracks;' +
                            'c[' + this.id +  "].mode='showing'"
                        });
                    }else{
                        chrome.tabs.executeScript({
                            code: 'var c = document.getElementById("c-video_html5_api").textTracks;' +
                            'c[' + this.id +  "].mode='disabled'"
                        });
                    }
                    
                })
            }
        })
    });

};