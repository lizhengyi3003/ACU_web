window.addEventListener('load',function(){
    var ologinBtn=this.document.getElementById('loginbtn');             //获取登录页面按钮
    var ogoRegister=this.document.getElementById('go-register');        //获取前往注册页面按钮
    var ogoLogin=this.document.getElementById('go-login');              //获取前往登录按钮
    var ocloseLogin = this.document.getElementById('login-go-back');      //关闭登录页面按钮
    var ocloseRegister = this.document.getElementById('register-go-back');    //关闭注册页面按钮
    var oaiAssistant=this.document.getElementById('ai-assistant');      //打开AI浮窗按钮
    var oaiContainer=this.document.getElementById('ai-container');      //获取AI浮窗盒子
    var ocloseAi=this.document.getElementById('close-ai');              //关闭AI界面按钮
    var osnapAi=this.document.getElementById('snap-ai');                //AI界面吸附按钮
    ologinBtn.onclick=function() {       
        window.scrollTo({
        top: 0,
        });                               //点击登录按钮时显示登录浮窗并模糊背景
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
    ogoRegister.onclick=function() {                                    //前往注册页面并模糊背景
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
    ogoLogin.onclick=function() {                                       //回到登录页面并模糊背景
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
    ocloseLogin.onclick = function() {                                  //关闭登录页面并恢复背景
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
    ocloseRegister.onclick = function() {                               //关闭注册页面并恢复背景
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
    oaiAssistant.onclick=function() {            //点击打开  AI浮窗
        oaiContainer.style.display='flex';
    }
    ocloseAi.onclick=function(e) {                                      //点击关闭AI浮窗
        e.stopPropagation();
        oaiContainer.style.display='none';
    }       
    var isclick=0;                                                         //判断吸附按钮是否被点击
    osnapAi.onclick=function() {                                        //控制AI浮窗是否吸附
        if(isclick==0)
        {
            oaiContainer.classList.add('snap');                         //如果在未被点击的情况下点击则开始吸附
            oaiContainer.style.left = '';
            oaiContainer.style.top = '';
            oaiContainer.style.right='-9vmin';
            oaiContainer.style.top='auto';
            oaiHeader.style.pointerEvents='none';
            osnapAi.style.pointerEvents='auto';
            ocloseAi.style.pointerEvents='auto';
            osnapAi.innerHTML='<span class="iconfont icon-chuangkoufudong"><span class="tooltip">窗口浮动</span>';
            isclick=1;
        }
        else                                                            //如果先前已经点击过一次再次点击则恢复浮动，取消吸附
        {
            oaiContainer.classList.remove('snap');
            oaiHeader.style.pointerEvents='auto';
            osnapAi.innerHTML='<span class="iconfont icon-chuangkouxifu"><span class="tooltip">窗口吸附</span></span>';
            oaiContainer.style.left = '';
            oaiContainer.style.top = '';
            oaiContainer.style.right='9vmin';
            oaiContainer.style.bottom='0';
            isclick=0;
        }
    }
    var oaiHeader=this.document.getElementById('ai-header');            //获取AI浮窗的header部分
    var dragX=0;                                                        //初始化相对距离
    var dragY=0;
    var isDown=false;
    oaiHeader.onmousedown=function(e) {                                     //鼠标摁下时，获取鼠标所在位置减去浮窗的位置，得到相对距离
        isDown=true
        dragX=e.clientX-oaiContainer.offsetLeft;
        dragY=e.clientY-oaiContainer.offsetTop;
        document.onmousemove=function(e) {                                  //鼠标拖动时，用鼠标所在位置减去相对距离得到最新的页面位置
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
    var oaiSend=this.document.getElementById('ai-send');                    //设置AI聊天框
    var oaiBody=this.document.getElementById('ai-body');
    var oaiTextarea=this.document.getElementById('ai-textarea');
    oaiSend.onclick=function() {                                               //点击发送按钮时生成用户与AI的对话框
        var userMessage=oaiTextarea.value.trim();
        if(!userMessage) return;                                                        
        oaiBody.innerHTML+= `<div style="text-align:left; color:#fff; margin-left:2vmin; margin-right:2vmin; margin-top:2vmin; word-break: break-word; display: inline-block; max-width: 90%; align-self: flex-end; border:1px solid #39FF14; padding:8px 16px; border-radius:16px; background: #39FF14; color: #050505;">你:${userMessage}</div>`;
        oaiBody.scrollTop = oaiBody.scrollHeight;
        oaiTextarea.value='';
        setTimeout(function() {                 
            ////插入正在获取资料的临时消息
            const loadingMsg=document.createElement('div');
            loadingMsg.innerHTML='正在获取资料';
            loadingMsg.style.cssText='text-align:left; color:#fff; margin-left:2vmin; margin-right:2vmin; margin-top:2vmin; word-break: break-word; display: inline-block; max-width: 90%; align-self: flex-start;  padding:8px 16px; border-radius:16px;  color: #fff;';
            loadingMsg.id = 'temp-loading-msg';
            oaiBody.appendChild(loadingMsg);
            oaiBody.scrollTop = oaiBody.scrollHeight;
            //两秒后放入正式文字
            setTimeout(function() {
            const tempMsg = document.getElementById('temp-loading-msg');
            if(tempMsg) {
                tempMsg.remove();
            }
            const actualContent = document.createElement('div');
            actualContent.innerHTML = '这里是实际获取到的资料内容';
            actualContent.style.cssText = 'text-align:left; color:#fff; margin-left:2vmin; margin-right:2vmin; margin-top:2vmin; word-break: break-word; display: inline-block; max-width: 90%; align-self: flex-start; padding:8px 16px; border-radius:16px; color: #fff;';

            oaiBody.appendChild(actualContent);
            oaiBody.scrollTop = oaiBody.scrollHeight;

            }, 2000); 
        },500)
   }
   var ogoNav=this.document.getElementById('go-nav');        //回到顶部按钮
   let lastScrollTop=0;         
   let isGoNavVisible=false;       
   this.window.addEventListener('scroll',function(){
        let scrollTop=this.window.pageYOffset;
        if(scrollTop>lastScrollTop&&this.scrollY>300)
        {
            if(!isGoNavVisible)
            {
                ogoNav.style.display='flex';
                ogoNav.style.animation='fadein 1s';
                ogoNav.addEventListener('animationend',function fadein(){
                    ogoNav.style.display='flex';
                    ogoNav.removeEventListener('animationend',fadein);
                })
                isGoNavVisible=true;
            }
            
        }
        else if(scrollTop<lastScrollTop&&this.scrollY<300)
        {
            if(isGoNavVisible)
            {
                ogoNav.style.animation='fadeout 1s';
                ogoNav.addEventListener('animationend',function fadeout(){
                    ogoNav.style.display='none';
                    ogoNav.removeEventListener('animationend',fadeout);
                })
                isGoNavVisible=false;
            }
        }
        lastScrollTop=scrollTop;
    })
   ogoNav.onclick=function() {                                          //点击按钮回到顶部
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    }
    var tabToContentId={
        '智能传感器':"sensors",
        '手机APP':"APP",
        '云端服务':"cloud",
    }       //Object.values(tabToContentId)获取映射表里所有的Id，然后遍历，得到数组，数组元素是document.getElementById(id)
    var allContents = Object.values(tabToContentId).map(id => document.getElementById(id));
    var ocomponentsTab=document.querySelectorAll('.components-tab');
    ocomponentsTab.forEach(function(tab) {
        tab.addEventListener('click',function() {
            ocomponentsTab.forEach(function(i) {i.classList.remove('active');});
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
})