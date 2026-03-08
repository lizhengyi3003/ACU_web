window.addEventListener('load',function(){
    const form = document.getElementById('apply');
    const elements = form.querySelectorAll('input[type="text"], input[type="email"], select, textarea');
    const checkboxes=form. querySelectorAll('input[name="interests"]');
    let checkedCount=0;
    const terms=form.querySelector('input[name="terms"]');
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
    checkboxes.forEach(function(cb){
        cb.addEventListener('change',function(){
            let checked=Array.from(checkboxes).some(function(c){c.checked});
            if(checked)
            {
                document.getElementById('interestsError').style.display='block';
            }
            else {
                document.getElementById('interestsError').style.display='none';
            }
        })
    })
    terms.addEventListener('change',function(){
        let checked=Array.from(terms).some(function(c){c.checked});
        if(checked)
        {
            document.getElementById('termsError').style.display='block';
        }
        else {
            document.getElementById('termsError').style.display='none';
        }
    })
    form.addEventListener('submit',function(e){
        let valid=true;
        elements.forEach(function(el){
            if(el.value.trim()==='')
            {
                valid=false;
                el.style.borderColor='red';
                el.parentElement.querySelector('.error-message').style.display='block';
            }
            else {
                el.style.borderColor='';
                el.parentElement.querySelector('.error-message').style.display='none';
            }
        })
        checkboxes.forEach(function(cb){
            if(cb.checked) checkedCount++;
        });
        if(checkedCount===0)
        {
            document.getElementById('interestsError').style.display='block';
            valid=false;
        }
        else {
            document.getElementById('interestsError').style.display='none'
        }
        if(!terms.checked)
        {
            document.getElementById('termsError').style.display='block';
            valid=false
        }
        else
        {
            document.getElementById('tremsError').style.display='none';
        }
        if(!valid)
        {
            e.preventDefault();
            alert('请填写所有必需项');
        }
        
    })
    const resetBtn=this.document.querySelector('.reset-btn');
    resetBtn.addEventListener('click',function(){
    const result=confirm('确定要重置表单吗？所有填写的内容将丢失。');
        if (!result) {
            form.preventDefault(); // 用户点击“取消”时阻止表单重置
        }
    })
})