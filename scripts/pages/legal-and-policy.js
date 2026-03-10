window.addEventListener('load',function(){
    var navItems=this.document.querySelectorAll('.items');
    var sideBarContent=this.document.getElementById('side-bar-content');  //创建映射表
    var itemToContentId={
        "隐私政策":"privacy-policy",
        "使用条款":"terms-of-use",
        "销售政策":"sales-policy",
        "奖励计划条款":"rewards-terms",
        "版权政策":"copyright-policy",
        "安全通知":"security-notice",
        "内容规则":"content-rules",
    }
    navItems.forEach(function(item){
        item.addEventListener('click', function() {
        navItems.forEach(function(i) { i.classList.remove('active'); });  //每次点击消除所有active类然后再对点击对象添加active类
        this.classList.add('active');
        var key = this.innerText.trim();        //获取items里的文字
        var contentId = itemToContentId[key];   
        if(contentId){                          //如果获取到了就将其html复制进内容框
            var contentDiv = document.getElementById(contentId);    
            if(contentDiv){
                sideBarContent.innerHTML = contentDiv.innerHTML;    
            }
        }else{
            sideBarContent.innerText = key;
        }
        });
    });
    var params = new URLSearchParams(window.location.search);       //获取URL值
    var tab = params.get('tab');            //获取tab值
    if (tab) {
        navItems.forEach(function(item) {       //如果获取到了，就自动点击对应元素
            var key = item.innerText.trim();
            if (itemToContentId[key] === tab) {
                item.click();
            }
        });
    }
})