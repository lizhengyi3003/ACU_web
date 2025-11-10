document.addEventListener('DOMContentLoaded', function () {

  const statusTrue1 = document.querySelector('.register-status-TRUE-1');
  const statusFalse1 = document.querySelector('.register-status-FALSE-1');
  const statusFalse2 = document.querySelector('.register-status-FALSE-2');
  const statusFalse3 = document.querySelector('.register-status-FALSE-3');
  const statusFalse4 = document.querySelector('.register-status-FALSE-4');
  const statusFalse5 = document.querySelector('.register-status-FALSE-5');
  const statusTrue2 = document.querySelector('.register-status-TRUE-2');
  const statusFalse6 = document.querySelector('.register-status-FALSE-6');
  const allStatusEls = [statusTrue1, statusTrue2, statusFalse1, statusFalse2, statusFalse3, statusFalse4, statusFalse5, statusFalse6];
  function clearAllStatus() {
    allStatusEls.forEach(el => {
      if (el) {
        el.style.display = 'none';
        el.classList.remove('ACU_slide-down');
      }
    });
  }
  clearAllStatus();

  const sendCodeBtn = document.getElementById('send-code-btn');
  if (sendCodeBtn) {
    sendCodeBtn.onclick = async function() {
      clearAllStatus();
      const email = document.getElementById('username').value;
      if (!email) {
        alert('请输入邮箱');
        return;
      }
    const res = await fetch('/api/sendcode', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });
      const text = await res.text();
      if (text.includes('验证码已发送')) {
        if (statusTrue2) {
          statusTrue2.style.display = 'block';
          void statusTrue2.offsetWidth;
          statusTrue2.classList.add('ACU_slide-down');
        }
      } else {
        if (statusFalse6) {
          statusFalse6.style.display = 'block';
          void statusFalse6.offsetWidth;
          statusFalse6.classList.add('ACU_slide-down');
        }
      }
    };
  }

  const form = document.querySelector('.ACU_register-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      clearAllStatus();

      const email = document.getElementById('username').value;
      const pwd = document.getElementById('password').value;
      const pwdNext = document.getElementById('password-next').value;
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(email)) {
        if (statusFalse5) {
          statusFalse5.style.display = 'block';
          void statusFalse5.offsetWidth;
          statusFalse5.classList.add('ACU_slide-down');
        }
        return;
      }
      if (pwd !== pwdNext) {
        if (statusFalse1) {
          statusFalse1.style.display = 'block';
          void statusFalse1.offsetWidth;
          statusFalse1.classList.add('ACU_slide-down');
        }
        return;
      }

      const formData = new FormData(form);
      const verifyCodeInput = document.getElementById('verify-code');
      if (verifyCodeInput) {
        formData.set('verifyCode', verifyCodeInput.value);
      }
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const text = await res.text();

      if (text.trim() === 'TRUE' && statusTrue1) {
        statusTrue1.style.display = 'block';
        void statusTrue1.offsetWidth;
        statusTrue1.classList.add('ACU_slide-down');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } else if (text.trim() === 'FALSE-2' && statusFalse2) {
        statusFalse2.style.display = 'block';
        void statusFalse2.offsetWidth;
        statusFalse2.classList.add('ACU_slide-down');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } else if (text.trim() === 'FALSE-3' && statusFalse3) {
        statusFalse3.style.display = 'block';
        void statusFalse3.offsetWidth;
        statusFalse3.classList.add('ACU_slide-down');
      } else if (text.trim() === 'FALSE-4' && statusFalse4) { 
        statusFalse4.style.display = 'block';
        void statusFalse4.offsetWidth;
        statusFalse4.classList.add('ACU_slide-down');
      } else if (text.trim() === 'FALSE-5' && statusFalse5) {
        statusFalse5.style.display = 'block';
        void statusFalse5.offsetWidth;
        statusFalse5.classList.add('ACU_slide-down');
      }
    });
  }
});