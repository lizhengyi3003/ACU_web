document.addEventListener('DOMContentLoaded', function () {
  const statusTrue = document.querySelector('.ACU_log-in-status-TRUE');
  const statusFalse = document.querySelector('.ACU_log-in-status-FALSE');
  if (statusTrue) statusTrue.style.display = 'none';
  if (statusFalse) statusFalse.style.display = 'none';

  const form = document.querySelector('.ACU_log-in-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (statusTrue) statusTrue.style.display = 'none';
      if (statusFalse) statusFalse.style.display = 'none';

      const formData = new FormData(form);

      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const text = await res.text();

      if (statusTrue) statusTrue.classList.remove('ACU_slide-down');
      if (statusFalse) statusFalse.classList.remove('ACU_slide-down');

      if (text.trim() === 'TRUE' && statusTrue) {
        statusTrue.style.display = 'block';
        void statusTrue.offsetWidth;
        statusTrue.classList.add('ACU_slide-down');
        setTimeout(() => {
          window.location.href = '../ACU_web.html';
        }, 1000);
      } else if (text.trim() === 'FALSE' && statusFalse) {
        statusFalse.style.display = 'block';
        void statusFalse.offsetWidth;
        statusFalse.classList.add('ACU_slide-down');
      }
    });
  } else {
    console.error('未找到 .ACU_log-in-form 元素，无法绑定登录事件');
  }
});