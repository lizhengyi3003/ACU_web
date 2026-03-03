window.addEventListener('load',function() {
    var otypes=this.document.querySelectorAll('.types');
    var otypeContent=this.document.getElementById('type-content');
    var itemToContentId={
        "网站":"website-content",
        "主机":"hosting-content",
        "app":"app-content",
    }
    otypes.forEach(function(type){
        type.addEventListener('click', function() {
        otypes.forEach(function(i) { i.classList.remove('active'); });  //每次点击消除所有active类然后再对点击对象添加active类
        this.classList.add('active');
        var key = this.innerText.trim();        //获取types里的文字
        var contentId = itemToContentId[key];   
        if(contentId){                          //如果获取到了就将其html复制进内容框
            var contentDiv = document.getElementById(contentId);    
            if(contentDiv){
                otypeContent.innerHTML = contentDiv.innerHTML;    
            }
        }else{
            sideBarContent.innerText = key;
        }
        });
    });
    if(otypes.length > 0){
        otypes[0].click();
    }
})