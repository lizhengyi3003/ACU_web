document.addEventListener('DOMContentLoaded', function () {
  // Turnstile 显式渲染与回调
  let turnstileWidgetId = null;
  let turnstileToken = '';
  const sendCodeBtn = document.getElementById('ACU_send-code-btn');
  // 初始禁用按钮，只有通过人机验证后才可用
  if (sendCodeBtn) sendCodeBtn.disabled = true;
  function enableSendCodeBtn() {
    if (sendCodeBtn) sendCodeBtn.disabled = false;
  }
  function disableSendCodeBtn() {
    if (sendCodeBtn) sendCodeBtn.disabled = true;
  }
  window.onloadTurnstile = function() {
    // 显式渲染 Turnstile 验证组件
    turnstileWidgetId = turnstile.render('#cf-turnstile-container', { 
      sitekey: '0x4AAAAAABnkZJTigol9Njs-',
      theme: 'auto',
      size: 'normal',
      callback: function(token) {
        turnstileToken = token;
        enableSendCodeBtn();
        // 同步 token 到隐藏 input，便于表单提交
        let input = document.querySelector('input[name="cf-turnstile-response"]');
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'cf-turnstile-response';
          // 加入表单，进行官方的接口校验
          document.querySelector('.ACU_register-form').appendChild(input);
        }
        // 设置 token 值，把人机验证通过后获得的 token 赋值给隐藏的 input 表单项
        input.value = token;
      },
      // token 过期时回调
      'expired-callback': function() {
        turnstileToken = '';
        disableSendCodeBtn();
      },
      // 验证出错时回调
      'error-callback': function() {
        turnstileToken = '';
        disableSendCodeBtn();
      }
    });
  };
  // Turnstile 脚本加载后立即渲染，否则等 window load 事件再渲染，确保 Turnstile 组件在页面加载后能被正确渲染
  if (window.turnstile) window.onloadTurnstile();
  else window.addEventListener('load', window.onloadTurnstile);
  // 绑定所有状态
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
  // 隐藏所有状态类元
  function clearAllStatus() {
    allStatusEls.forEach(el => {
      if (el) {
        el.style.display = 'none';
        el.classList.remove('ACU_slide-down');
      }
    });
  }
  clearAllStatus();
  // 发送验证码按钮点击
  if (sendCodeBtn) {
    sendCodeBtn.onclick = async function() {
      clearAllStatus();
      // 验证邮箱是否输入
      const email = document.getElementById('ACU_mail').value;
      if (!email) {
        alert('请输入邮箱');
        return;
      }
      // 验证邮箱表达是否正确
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(email)) {
        if (statusFalse1) {
          statusFalse1.style.display = 'block';
          void statusFalse1.offsetWidth;
          statusFalse1.classList.add('ACU_slide-down');
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
      // 数据发送后端
      const res = await fetch('/api/sendcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken })
      });
      // 校验验证码状态
      const text = await res.text();
      if (text.includes('验证码已发送')) {
        if (statusTrue1) {
          statusTrue1.style.display = 'block';
          void statusTrue1.offsetWidth;
          statusTrue1.classList.add('ACU_slide-down');
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
  // 提交表单
  const form = document.querySelector('.ACU_register-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      clearAllStatus();
      // 验证表单格式（邮箱和密码）
      const email = document.getElementById('ACU_mail').value;
      const pwd = document.getElementById('ACU_password').value;
      const pwdNext = document.getElementById('ACU_password-next').value;
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(email)) {
        if (statusFalse1) {
          statusFalse1.style.display = 'block';
          void statusFalse1.offsetWidth;
          statusFalse1.classList.add('ACU_slide-down');
        }
        return;
      }
      if (pwd !== pwdNext) {
        if (statusFalse2) {
          statusFalse2.style.display = 'block';
          void statusFalse2.offsetWidth;
          statusFalse2.classList.add('ACU_slide-down');
        }
        return;
      }
      // 提交表单
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
      // 判断注册状态
      if (text.trim() === 'TRUE-2' && statusTrue2) {
        statusTrue2.style.display = 'block';
        void statusTrue2.offsetWidth;
        statusTrue2.classList.add('ACU_slide-down');
        setTimeout(() => {
          window.location.href = 'ACU_login.html';
        }, 2000);
      } else if (text.trim() === 'FALSE-8' && statusFalse8) {
        statusFalse8.style.display = 'block';
        void statusFalse8.offsetWidth;
        statusFalse8.classList.add('ACU_slide-down');
        setTimeout(() => {
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