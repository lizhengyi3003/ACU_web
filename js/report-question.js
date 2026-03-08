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
    const form=document.getElementById('report');
    const elements = form.querySelectorAll('input[type="text"], input[type="email"], select, textarea');
    const checkboxes=form. querySelectorAll('input[type="radio"]');
    elements.forEach(el => {
        el.addEventListener('blur', function() {
            if (el.value.trim() === '') {
                el.style.borderColor = 'red';
                const error = el.parentElement.querySelector('.error-message');
                if (error) error.style.display = 'block';
            } else {
                el.style.borderColor = '';
                const error = el.parentElement.querySelector('.error-message');
                if (error) error.style.display = 'none';
            }
        });
        el.addEventListener('input', function() {
            if (el.value.trim() !== '') {
                el.style.borderColor = '';
                const error = el.parentElement.querySelector('.error-message');
                if (error) error.style.display = 'none';
            }
        });
    });
    
    form.addEventListener('submit',function(e){
        let valid=true;
        elements.forEach(function(el){
            let isEmpty = false;
            if (el.tagName === 'SELECT') {
                isEmpty = el.value === '';
            } else {
                isEmpty = el.value.trim() === '';
            }
            if (isEmpty) {
                valid = false;
                el.style.borderColor = 'red';
                const error = el.parentElement.querySelector('.error-message');
                if (error) error.style.display = 'block';
            } else {
                el.style.borderColor = '';
                const error = el.parentElement.querySelector('.error-message');
                if (error) error.style.display = 'none';
            }
        });
        let radioChecked=false;
        checkboxes.forEach(function(cb) {
            if (cb.checked) radioChecked = true;
        });
        const radioError = document.getElementById('priorityError');
        if (!radioChecked) {
            valid = false;
            if (radioError) radioError.style.display = 'block';
        } else {
            if (radioError) radioError.style.display = 'none';
        }
        if(!valid)
        {
            e.preventDefault();
            alert('请填写所有必需项');
        }
        
    })
    const resetBtn=this.document.getElementById('form-reset');
    resetBtn.addEventListener('click',function(e){
    const result=confirm('确定要重置表单吗？所有填写的内容将丢失。');
        if (!result) {
            e.preventDefault(); // 用户点击“取消”时阻止表单重置
        }
    })
})