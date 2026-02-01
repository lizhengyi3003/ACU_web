window.onload=function() {
    var ologinBtn=this.document.getElementById('loginbtn');
    var ogoRegister=this.document.getElementById('go-register');
    var ogoLogin=this.document.getElementById('go-login');
    var ocloseLogin = document.getElementById('close-login');
    var ocloseRegister = document.getElementById('close-register');
    var oaiAssistant=this.document.getElementById('ai-assistant');
    var oaiContainer=this.document.getElementById('ai-container');
    var ocloseAi=this.document.getElementById('close-ai');
    var osnapAi=this.document.getElementById('snap-ai');
    ologinBtn.onclick=function() {
        document.getElementById('login-container').style.display='flex';
        document.getElementById('register-container').style.display='none';
        document.getElementById('features').classList.add('blur');
        document.getElementById('device-introduction').classList.add('blur');
        document.getElementById('footer').classList.add('blur');
        document.querySelector('nav').classList.add('blur');
        document.body.style.overflow = 'hidden';
    }
    ogoRegister.onclick=function() {
        document.getElementById('login-container').style.display='none';
        document.getElementById('register-container').style.display='flex';
        document.getElementById('features').classList.add('blur');
        document.getElementById('device-introduction').classList.add('blur');
        document.getElementById('footer').classList.add('blur');
        document.querySelector('nav').classList.add('blur');
        document.body.style.overflow = 'hidden';
    }
    ogoLogin.onclick=function() {
        document.getElementById('login-container').style.display='flex';
        document.getElementById('register-container').style.display='none';
        document.getElementById('features').classList.add('blur');
        document.getElementById('device-introduction').classList.add('blur');
        document.getElementById('footer').classList.add('blur');
        document.querySelector('nav').classList.add('blur');
        document.body.style.overflow = 'hidden';
    }
    ocloseLogin.onclick = function() {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('features').classList.remove('blur');
        document.getElementById('device-introduction').classList.remove('blur');
        document.getElementById('footer').classList.remove('blur');
        document.querySelector('nav').classList.remove('blur');
        document.body.style.overflow = '';
    }
    ocloseRegister.onclick = function() {
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('features').classList.remove('blur');
        document.getElementById('device-introduction').classList.remove('blur');
        document.getElementById('footer').classList.remove('blur');
        document.querySelector('nav').classList.remove('blur');
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
        oaiBody.innerHTML+= `<div style="text-align:right; color:#fff;">你:${userMessage}</div>`;
        oaiTextarea.value='';
        setTimeout(function() {
            oaiBody.innerHTML+=`<div style="text-align:left; color:#fff;">AI:这是你的问题的回复。</div>`;
            oaiBody.scrollTop=oaiBody.scrollHeight;
        },500)
   }
}