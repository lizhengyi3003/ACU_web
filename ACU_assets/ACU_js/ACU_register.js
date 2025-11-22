document.addEventListener('DOMContentLoaded', function () {
  // Turnstile 显式渲染与回调
  let turnstileWidgetId = null;
  let turnstileToken = '';
  const sendCodeBtn = document.getElementById('ACU_send-code-btn');
  // 按钮禁用/启用通用函数，只有通过人机验证后才可用
  function setSendCodeBtnDisabled(disabled) {
    if (sendCodeBtn) sendCodeBtn.disabled = disabled;
  }
  // 初始禁用
  setSendCodeBtnDisabled(true); 
  window.onloadTurnstile = function() {
    // 显式渲染 Turnstile 验证组件
    turnstileWidgetId = turnstile.render('#cf-turnstile-container', { 
      sitekey: '0x4AAAAAABnkZJTigol9Njs-',
      theme: 'auto',
      size: 'normal',
      callback: function(token) {
        turnstileToken = token;
        setSendCodeBtnDisabled(false);
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
        setSendCodeBtnDisabled(true);
      },
      // 验证出错时回调
      'error-callback': function() {
        turnstileToken = '';
        setSendCodeBtnDisabled(true);
      }
    });
  };
  // Turnstile 脚本加载后立即渲染，否则等 window load 事件再渲染，确保 Turnstile 组件在页面加载后能被正确渲染
  if (window.turnstile) window.onloadTurnstile();
  else window.addEventListener('load', window.onloadTurnstile);
  // 状态提示元素映射，便于统一管理
  const statusEls = {
    'TRUE-1': document.querySelector('.ACU_register-status-TRUE-1'),
    'TRUE-2': document.querySelector('.ACU_register-status-TRUE-2'),
    'FALSE-1': document.querySelector('.ACU_register-status-FALSE-1'),
    'FALSE-2': document.querySelector('.ACU_register-status-FALSE-2'),
    'FALSE-3': document.querySelector('.ACU_register-status-FALSE-3'),
    'FALSE-4': document.querySelector('.ACU_register-status-FALSE-4'),
    'FALSE-5': document.querySelector('.ACU_register-status-FALSE-5'),
    'FALSE-6': document.querySelector('.ACU_register-status-FALSE-6'),
    'FALSE-7': document.querySelector('.ACU_register-status-FALSE-7'),
    'FALSE-8': document.querySelector('.ACU_register-status-FALSE-8'),
  };
  // 清除所有状态提示
  function clearAllStatus() {
    Object.values(statusEls).forEach(el => {
      if (el) {
        el.style.display = 'none';
        el.classList.remove('ACU_slide-down');
      }
    });
  }
  // 显示状态提示
  function showStatus(key) {
    clearAllStatus();
    const el = statusEls[key];
    if (el) {
      el.style.display = 'block';
      void el.offsetWidth;
      el.classList.add('ACU_slide-down');
    }
  }
  clearAllStatus();
  // 发送验证码按钮点击
  if (sendCodeBtn) {
    sendCodeBtn.onclick = function() {
      clearAllStatus();
      // 检查token是否存在
      const turnstileToken = document.querySelector('input[name="cf-turnstile-response"]')?.value;
      if (!turnstileToken) {
        // token为空，直接提示
        showStatus('FALSE-3');
        return;
      }
      // token已存在，直接发验证码
      sendVerifyCode();
    };
    // 发送验证码函数
    async function sendVerifyCode() {
      clearAllStatus();
      const email = document.getElementById('ACU_mail').value;
      const turnstileToken = document.querySelector('input[name="cf-turnstile-response"]')?.value;
      if (!turnstileToken) {
        showStatus('FALSE-3');
        return;
      }
      if (!email) {
        alert('请输入邮箱');
        return;
      }
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(email)) {
        showStatus('FALSE-1');
        return;
      }
      // 结果处理
      const res = await fetch('/api/sendcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken })
      });
      const text = await res.text();
      if (text.trim() === 'TRUE-1') {
        showStatus('TRUE-1');
      } else if (text.trim() === 'FALSE-4') {
        showStatus('FALSE-4');
        if (window.turnstile && turnstileWidgetId !== null) {
          window.turnstile.reset(turnstileWidgetId);
          setSendCodeBtnDisabled(true);
        }
      } else if (text.trim() === 'FALSE-3') {
        showStatus('FALSE-3');
      } else {
        showStatus('FALSE-6');
      }
    }
  }
  // 提交表单
  const form = document.querySelector('.ACU_register-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      clearAllStatus();
      // 验证表单格式
      const email = document.getElementById('ACU_mail').value;
      const pwd = document.getElementById('ACU_password').value;
      const pwdNext = document.getElementById('ACU_password-next').value;
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(email)) {
        showStatus('FALSE-1');
        return;
      }
      if (pwd !== pwdNext) {
        showStatus('FALSE-2');
        return;
      }
      // 提交表单
      const formData = new FormData(form);
      const verifyCodeInput = document.getElementById('ACU_verify-code');
      if (verifyCodeInput) {
        formData.set('verify_code', verifyCodeInput.value);
      }
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const text = await res.text();
      // 判断注册状态
      if (text.trim() === 'TRUE-2') {
        showStatus('TRUE-2');
        setTimeout(() => {
          window.location.href = 'ACU_login.html';
        }, 2000);
      } else if (text.trim() === 'FALSE-8') {
        showStatus('FALSE-8');
        setTimeout(() => {}, 2000);
      } else if (text.trim() === 'FALSE-3') {
        showStatus('FALSE-3');
        return;
      } else if (text.trim() === 'FALSE-4') {
        showStatus('FALSE-4');
        return;
      } else if (text.trim() === 'FALSE-6') {
        showStatus('FALSE-6');
        return;
      } else if (text.trim() === 'FALSE-1') {
        showStatus('FALSE-1');
        return;
      } else if (text.trim() === 'FALSE-2') {
        showStatus('FALSE-2');
        return;
      } else if (text.trim() === 'no-verify-code') {
        alert('请输入验证码');
        return;
      } else if (text.trim() === 'FALSE-5') {
        showStatus('FALSE-5');
        return;
      } else if (text.trim() === 'FALSE-7') {
        showStatus('FALSE-7');
        return;
      }
    });
  }
});