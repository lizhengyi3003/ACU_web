window.addEventListener('load',function(){
    const filters=this.document.querySelectorAll('[data-filter]');
    const items=this.document.querySelectorAll('[data-category]');
    filters.forEach(function(f){
        f.addEventListener('click',function(){
            filters.forEach(function(filter){
                filter.classList.remove('active');
            })
            f.classList.add('active');
            const filterValue=f.dataset.filter;
            items.forEach(function(i){
                const itemsValue=i.dataset.category;
                if(filterValue==='all'||itemsValue===filterValue)
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
    if(filters.length>0)
    {
        filters[0].click();
    }
    window.addEventListener('scroll', function() {
        var process = document.getElementById('process');
        var lineFinish = document.getElementById('line-finish');
        var processTop = process.getBoundingClientRect().top + window.scrollY;//元素距离视口顶部的距离＋滚动距离＝元素的总高度
        var windowBottom = window.scrollY + window.innerHeight; //已滚动的距离加上浏览器自身高度＝视口底部

        if (windowBottom > processTop) {        //视口底部高度大于元素总高度，也即能看见元素时，显示进度条
            lineFinish.style.width = '100%';
        } else {
            lineFinish.style.width = '0px';
        }
});
})