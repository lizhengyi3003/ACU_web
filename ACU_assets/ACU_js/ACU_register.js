document.addEventListener('DOMContentLoaded', function () {
  const statusTrue1 = document.querySelector('.ACU_register-status-TRUE-1');
  const statusTrue2 = document.querySelector('.ACU_register-status-TRUE-2');
  const statusFalse1 = document.querySelector('.ACU_register-status-FALSE-1');
  const statusFalse2 = document.querySelector('.ACU_register-status-FALSE-2');
  const statusFalse3 = document.querySelector('.ACU_register-status-FALSE-3');
  const statusFalse4 = document.querySelector('.ACU_register-status-FALSE-4');
  const statusFalse5 = document.querySelector('.ACU_register-status-FALSE-5');
  const statusFalse6 = document.querySelector('.ACU_register-status-FALSE-6');
  const statusFalse7 = document.querySelector('.ACU_register-status-FALSE-7');
  const statusFalse8 = document.querySelector('.ACU_register-status-FALSE-8');
  const statusFalse9 = document.querySelector('.ACU_register-status-FALSE-9');
  const allStatusEls = [statusTrue1, statusTrue2, statusFalse1, statusFalse2, statusFalse3, statusFalse4, statusFalse5, statusFalse6, statusFalse7, statusFalse8, statusFalse9];
  //隐藏所有状态类元素
  function clearAllStatus() {
    allStatusEls.forEach(el => {
      if (el) {
        el.style.display = 'none';
        el.classList.remove('ACU_slide-down');
      }
    });
  }
  clearAllStatus();

  const sendCodeBtn = document.getElementById('ACU_send-code-btn');
  if (sendCodeBtn) {
    sendCodeBtn.onclick = async function() {
      clearAllStatus();
      //验证邮箱表达是否正确
      const email = document.getElementById('ACU_mail').value;
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(email)) {
        if (statusFalse5) {
          statusFalse5.style.display = 'block';
          void statusFalse5.offsetWidth;
          statusFalse5.classList.add('ACU_slide-down');
        }
        return;
      }
      // 获取人机验证token
      const turnstileToken = document.querySelector('input[name="cf-turnstile-response"]')?.value;
      if (!turnstileToken) {
        if (statusFalse3) {
          statusFalse3.style.display = 'block';
          void statusFalse3.offsetWidth;
          statusFalse3.classList.add('ACU_slide-down');
        }
        return;
      }
      const res = await fetch('/api/sendcode', {
        method: 'POST',
        body: JSON.stringify({ email, turnstileToken }),
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

      const email = document.getElementById('ACU_mail').value;
      const pwd = document.getElementById('ACU_password').value;
      const pwdNext = document.getElementById('ACU_password-next').value;
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
      const verifyCodeInput = document.getElementById('ACU_verify-code');
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
          window.location.href = 'ACU_login.html';
        }, 2000);
      } else if (text.trim() === 'FALSE-2' && statusFalse2) {
        statusFalse2.style.display = 'block';
        void statusFalse2.offsetWidth;
        statusFalse2.classList.add('ACU_slide-down');
        setTimeout(() => {
          window.location.href = 'ACU_login.html';
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