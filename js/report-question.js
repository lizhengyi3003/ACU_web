window.addEventListener('load',function(){
    document.querySelector('.file-submit').onclick = function() {
        document.getElementById('attachment').click();
    };
    document.getElementById('attachment').addEventListener('change', function(event) {
    const fileListDiv=document.getElementById('file-list');
    const files = event.target.files;
    if (files.length > 0) {
        const file = files[0]; // 只取第一个文件
        const name = file.name;
        fileListDiv.innerHTML='<p><strong>已选择的文件：</strong></p>';
        const size = (file.size / 1024).toFixed(2); // KB为单位
        const info = document.createElement('div');
        info.textContent = `文件名：${name}，大小：${size} KB`;
        fileListDiv.appendChild(info);
    }
    document.getElementById('form-reset').addEventListener('click',function(){
        fileListDiv.innerHTML='';
    })
});
    const helpQuestions=this.document.querySelectorAll('.help-question');
    helpQuestions.forEach(function(q){
        q.addEventListener('click',function(){
            const helpAnswer = q.parentElement.querySelector('.help-answer');
            const icon = q.querySelector('.icon-xiangxia, .icon-xiangshang');
            if(helpAnswer.style.display === 'flex') {
                helpAnswer.style.display = 'none';
                if(icon) icon.className = 'iconfont icon-xiangxia';
            } 
            else {
                helpAnswer.style.display = 'flex';
                if(icon) icon.className = 'iconfont icon-xiangshang';
            }
        })
    })
    const itemQuestions=this.document.querySelectorAll('.item-question');
    itemQuestions.forEach(function(q){
        q.addEventListener('click',function(){
            const itemAnswer = q.parentElement.querySelector('.item-answer');
            const icon = q.querySelector('.icon-xiangxia, .icon-xiangshang');
            if(itemAnswer.style.display === 'flex') {
                itemAnswer.style.display = 'none';
                if(icon) icon.className = 'iconfont icon-xiangxia';
            } 
            else {
                itemAnswer.style.display = 'flex';
                if(icon) icon.className = 'iconfont icon-xiangshang';
            }
        })
    })
})