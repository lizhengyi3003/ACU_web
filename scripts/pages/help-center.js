window.addEventListener('load',function(){
    const osearchBox=this.document.querySelector('.search-box');
    const osearchContainer=this.document.getElementById('search-container');
    osearchBox.addEventListener('focus',function(){
        osearchContainer.classList.add('active');
    })
    osearchBox.addEventListener('blur',function(){
        osearchContainer.classList.remove('active');
    })
    const deleteBtn=this.document.querySelector('.delete-btn');
    function toDeleteBtn() {
        if(osearchBox.value.trim()==='')
        {
            deleteBtn.style.display='none';
        }
        else 
        {
            deleteBtn.style.display='inline-block';
        }
    }
    toDeleteBtn();
    osearchBox.addEventListener('input',toDeleteBtn);
    deleteBtn.addEventListener('click',function() {
        osearchBox.value='';
        deleteBtn.style.display='none';
        osearchBox.focus();
    })
    const normalQuestions=this.document.querySelectorAll('.normal-question');
    normalQuestions.forEach(function(n){
        n.addEventListener('click',function(){
            const answer=n.parentElement.querySelector('.normal-question-answer');
            const icon=n.parentElement.querySelector('.iconfont');
            if(answer.style.display==='flex')
            {
                answer.style.display='none';
                if(icon)
                {
                    icon.className='iconfont icon-xiangxia';
                }
            }
            else
            {
                answer.style.display='flex';
                if(icon)
                {
                    icon.className='iconfont icon-xiangshang';
                }
            }
        })
    })
    const filterBtns=this.document.querySelectorAll('[data-filter]');
    const items=this.document.querySelectorAll('[data-category]');
    filterBtns.forEach(function(f) {
        f.addEventListener('click',function(){
            filterBtns.forEach(function(filter) {
                filter.classList.remove('active');
            })
            f.classList.add('active');
            const filterValue=f.dataset.filter;
            items.forEach(function(i){
            const category=i.dataset.category;
            if(filterValue==='all'||filterValue===category)
            {
                i.style.display='flex';
            }
            else 
            {
                i.style.display='none';
            }
            })
        })
    })
    if(filterBtns.length>0) {
        filterBtns[0].click();
    }
})