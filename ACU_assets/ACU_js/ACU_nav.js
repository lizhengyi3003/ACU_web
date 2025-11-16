//导航栏按钮区域全局点击可跳转
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.ACU_club-activity-box-cont').forEach(function(item) {
    const link1 = item.querySelector('a');
    if (link1) {
      item.style.cursor = 'pointer';
      item.onclick = function() {
        window.location.href = link1.getAttribute('href');
      };
    }
  });
  document.querySelectorAll('.ACU_call-nav-item-messageboard').forEach(function(item) {
    const link2 = item.querySelector('a');
    if (link2) {
      item.style.cursor = 'pointer';
      item.onclick = function() {
        window.location.href = link2.getAttribute('href');
      };
    }
  });
});
