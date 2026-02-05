window.addEventListener('load',function(){
    var osBTAbout=this.document.getElementById('s-b-t-about');
    var osBTDevice=this.document.getElementById('s-b-t-device');
    var osBTResource=this.document.getElementById('s-b-t-resource');
    var osBTLaw=this.document.getElementById('s-b-t-law');
    var aclick=0;
    var dclick=0;
    var rclick=0;
    var lclick=0;
    osBTAbout.onclick=function() {
        var osBTAElements=document.getElementsByClassName('s-b-t-a-elements');
        if(aclick==0)
        {
            for(var i=0;i<osBTAElements.length;i++)
            {
                osBTAElements[i].style.display='flex';
                aclick=1;
                this.classList.add('active');
            }
        }   
        else
        {
            for(var i=0;i<osBTAElements.length;i++)
            {
                osBTAElements[i].style.display='none';
                aclick=0;
                this.classList.remove('active');
            }
        }
    }
    osBTDevice.onclick=function() {
        var osBTDElements=document.getElementsByClassName('s-b-t-d-elements');
        if(dclick==0)
        {
            for(var i=0;i<osBTDElements.length;i++)
            {
                osBTDElements[i].style.display='flex';
                dclick=1;
                this.classList.add('active');
            }
        }   
        else
        {
            for(var i=0;i<osBTDElements.length;i++)
            {
                osBTDElements[i].style.display='none';
                dclick=0;
                this.classList.remove('active');
            }
        }
    }
    osBTResource.onclick=function() {
        var osBTRElements=document.getElementsByClassName('s-b-t-r-elements');
        if(rclick==0)
        {
            for(var i=0;i<osBTRElements.length;i++)
            {
                osBTRElements[i].style.display='flex';
                rclick=1;
                this.classList.add('active');
            }
        }   
        else
        {
            for(var i=0;i<osBTRElements.length;i++)
            {
                osBTRElements[i].style.display='none';
                rclick=0;
                this.classList.remove('active');
            }
        }
    }
    osBTLaw.onclick=function() {
        var osBTLElements=document.getElementsByClassName('s-b-t-l-elements');
        if(lclick==0)
        {
            for(var i=0;i<osBTLElements.length;i++)
            {
                osBTLElements[i].style.display='flex';
                lclick=1;
                this.classList.add('active');
            }
        }   
        else
        {
            for(var i=0;i<osBTLElements.length;i++)
            {
                osBTLElements[i].style.display='none';
                lclick=0;
                this.classList.remove('active');
            }
        }
    }
    var navItems=this.document.querySelectorAll('.items');
    var sideBarContent=this.document.getElementById('side-bar-content');
    var itemToContentId={
        "隐私政策":"privacy-policy",
        "使用条款":"terms-of-use",
        "销售政策":"sales-policy",
    }
    for(var i=0;i<navItems.length;i++)
    {
        navItems[i].onclick=function() {
            for(var j=0;j<navItems.length;j++)
            {
                navItems[j].classList.remove('active');
            }
            this.classList.add('active');
        }
    }
    navItems.forEach(function(item){
        item.addEventListener('click', function() {
        navItems.forEach(function(i) { i.classList.remove('active'); });
        this.classList.add('active');
        var key = this.innerText.trim();
        var contentId = itemToContentId[key];
        if(contentId){
            var contentDiv = document.getElementById(contentId);
            if(contentDiv){
                sideBarContent.innerHTML = contentDiv.innerHTML;
            }
        }else{
            sideBarContent.innerText = key;
        }
        });
    });
})