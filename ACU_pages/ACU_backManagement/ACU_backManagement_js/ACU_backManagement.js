window.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.addEventListener('click', function(e) {
      // 兼容点击图标等子元素
      let target = e.target;
      if (target.tagName !== 'A' && target.closest('a')) {
        target = target.closest('a');
      }
      if (target && target.tagName === 'A' && target.dataset.target) {
        e.preventDefault();
        location.hash = '#/' + target.dataset.target.replace('.html', '');
      }
    });
  }
});