window.addEventListener('load',function() {
    var tabToContentId={
        '智能传感器':"sensors",
        '手机APP':"APP",
        '云端服务':"cloud",
    }       //Object.values(tabToContentId)获取映射表里所有的Id，然后遍历，得到数组，数组元素是document.getElementById(id)
    var allContents = Object.values(tabToContentId).map(id => document.getElementById(id));
    var ofeaturesTab=document.querySelectorAll('.features-tab');
    ofeaturesTab.forEach(function(tab) {
        tab.addEventListener('click',function() {
            ofeaturesTab.forEach(function(i) {i.classList.remove('active');});
            this.classList.add('active');
            allContents.forEach(function(div) {                 //每次点击，先隐藏所有容器
                if (div) div.style.display = 'none';
            });
            var key=this.innerText.trim();
            var contentId=tabToContentId[key]
            if(contentId)
            {
                var contentDiv=document.getElementById(contentId);
                if(contentDiv)
                {
                    contentDiv.style.display='flex';
                }
            }
        });
    });
    var ocomparisonBuy=this.document.getElementsByClassName('suggest-buy');
    ocomparisonBuy[0].onclick=function() {
        var obuy=document.getElementById('buy');
        if(obuy)
        {
            obuy.scrollIntoView({behavior:'smooth'});
        }
    }
    var ogoSideBar=this.document.getElementById('go-side-bar');
    var isgoSideBarClick=0;
    ogoSideBar.addEventListener('click',function(){
        var osideBarElements=document.getElementById('side-bar-elements');
        if(isgoSideBarClick==0)
        {
            osideBarElements.style.display='flex';
            ogoSideBar.style.left='20vh';
            ogoSideBar.innerHTML='<i class="iconfont" id="go-side-bar">&#xeb15;</i>'
            isgoSideBarClick=1;
        }
        else
        {
            osideBarElements.style.display='none';
            ogoSideBar.style.left='';
            ogoSideBar.innerHTML='<i class="iconfont" id="go-side-bar">&#xe6a1;</i>'
            isgoSideBarClick=0;
        }
    })
})