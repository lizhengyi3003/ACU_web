window.addEventListener('load',function(){
    var ologinBtn=this.document.getElementById('loginbtn');
    var ogoRegister=this.document.getElementById('go-register');
    var ogoLogin=this.document.getElementById('go-login');
    var ocloseLogin = this.document.getElementById('close-login');
    var ocloseRegister = this.document.getElementById('close-register');
    var oaiAssistant=this.document.getElementById('ai-assistant');
    var oaiContainer=this.document.getElementById('ai-container');
    var ocloseAi=this.document.getElementById('close-ai');
    var osnapAi=this.document.getElementById('snap-ai');
    ologinBtn.onclick=function() {
        document.getElementById('login-container').style.display='flex';
        document.getElementById('register-container').style.display='none';
        var features=document.getElementById('features');
        if (features) features.classList.add('blur');
        var deviceIntro = document.getElementById('device-introduction');
        if (deviceIntro) deviceIntro.classList.add('blur');
        var footer = document.getElementById('footer');
        if (footer) footer.classList.add('blur');
        var mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.classList.add('blur');
        var nav = document.querySelector('nav');
        if (nav) nav.classList.add('blur');
        document.body.style.overflow = 'hidden';
    }
    ogoRegister.onclick=function() {
        document.getElementById('login-container').style.display='none';
        document.getElementById('register-container').style.display='flex';
        var features=document.getElementById('features');
        if (features) features.classList.add('blur');
        var deviceIntro = document.getElementById('device-introduction');
        if (deviceIntro) deviceIntro.classList.add('blur');
        var footer = document.getElementById('footer');
        if (footer) footer.classList.add('blur');
        var mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.classList.add('blur');
        var nav = document.querySelector('nav');
        if (nav) nav.classList.add('blur');
        document.body.style.overflow = 'hidden';
    }
    ogoLogin.onclick=function() {
        document.getElementById('login-container').style.display='flex';
        document.getElementById('register-container').style.display='none';
        var features=document.getElementById('features');
        if (features) features.classList.add('blur');
        var deviceIntro = document.getElementById('device-introduction');
        if (deviceIntro) deviceIntro.classList.add('blur');
        var footer = document.getElementById('footer');
        if (footer) footer.classList.add('blur');
        var mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.classList.add('blur');
        var nav = document.querySelector('nav');
        if (nav) nav.classList.add('blur');
        document.body.style.overflow = 'hidden';
    }
    ocloseLogin.onclick = function() {
        document.getElementById('login-container').style.display = 'none';
        var features=document.getElementById('features');
        if (features) features.classList.remove('blur');
        var deviceIntro = document.getElementById('device-introduction');
        if (deviceIntro) deviceIntro.classList.remove('blur');
        var footer = document.getElementById('footer');
        if (footer) footer.classList.remove('blur');
        var mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.classList.remove('blur');
        var nav = document.querySelector('nav');
        if (nav) nav.classList.remove('blur');
        document.body.style.overflow = '';
    }
    ocloseRegister.onclick = function() {
        document.getElementById('register-container').style.display = 'none';
        var features=document.getElementById('features');
        if (features) features.classList.remove('blur');
        var deviceIntro = document.getElementById('device-introduction');
        if (deviceIntro) deviceIntro.classList.remove('blur');
        var footer = document.getElementById('footer');
        if (footer) footer.classList.remove('blur');
        var mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.classList.remove('blur');
        var nav = document.querySelector('nav');
        if (nav) nav.classList.remove('blur');
        document.body.style.overflow = '';
    }
    oaiAssistant.onclick=function() {
        oaiContainer.style.display='flex';
    }
    ocloseAi.onclick=function(e) {
        e.stopPropagation();
        oaiContainer.style.display='none';
    }
    var isclick=0;
    osnapAi.onclick=function() {
        if(isclick==0)
        {
            oaiContainer.classList.add('snap');
            oaiContainer.style.left = '';
            oaiContainer.style.top = '';
            oaiContainer.style.right='-9vmin';
            oaiContainer.style.top='auto';
            oaiHeader.style.pointerEvents='none';
            osnapAi.style.pointerEvents='auto';
            ocloseAi.style.pointerEvents='auto';
            osnapAi.innerHTML='窗口浮动';
            isclick=1;
        }
        else
        {
            oaiContainer.classList.remove('snap');
            oaiHeader.style.pointerEvents='auto';
            osnapAi.innerHTML='窗口吸附';
            oaiContainer.style.left = '';
            oaiContainer.style.top = '';
            oaiContainer.style.right='9vmin';
            oaiContainer.style.bottom='0';
            isclick=0;
        }
    }
    var oaiHeader=this.document.getElementById('ai-header');
    var dragX=0;
    var dragY=0;
    var isDown=false;
    oaiHeader.onmousedown=function(e) {
        isDown=true
        dragX=e.clientX-oaiContainer.offsetLeft;
        dragY=e.clientY-oaiContainer.offsetTop;
        document.onmousemove=function(e) {
            if(isDown)
            {
                oaiContainer.style.left=(e.clientX-dragX)+'px';
                oaiContainer.style.top=(e.clientY-dragY)+'px';
            }
        }
        document.onmouseup=function() {
            isDown=false;
        }
    }
    var oaiSend=this.document.getElementById('ai-send');
    var oaiBody=this.document.getElementById('ai-body');
    var oaiTextarea=this.document.getElementById('ai-textarea');
    oaiSend.onclick=function() {
        var userMessage=oaiTextarea.value.trim();
        if(!userMessage) return;
        oaiBody.innerHTML+= `<div style="text-align:left; color:#fff; margin-left:2vmin; margin-right:2vmin; margin-top:2vmin; word-break: break-word; display: inline-block; max-width: 90%; align-self: flex-end; border:1px solid #39FF14; padding:8px 16px; border-radius:16px; background: #39FF14; color: #050505;">你:${userMessage}</div>`;
        oaiTextarea.value='';
        setTimeout(function() {
            oaiBody.innerHTML+=`<div style="text-align:left; color:#fff; margin-left:2vmin; margin-right:2vmin; margin-top:2vmin; word-break: break-word; display: inline-block; max-width: 90%; align-self: flex-start; border:1px solid #39FF14; padding:8px 16px; border-radius:16px; background: rgba(26,26,26,0.7); color: #fff;">AI:这是你的问题的回复。</div>`;
            oaiBody.scrollTop=oaiBody.scrollHeight;
        },500)
   }
   var ogoNav=this.document.getElementById('go-nav');
   ogoNav.onclick=function() {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    }
})