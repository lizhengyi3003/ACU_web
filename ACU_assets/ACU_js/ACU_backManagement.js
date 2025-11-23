fetch('/api/backManagement')
  .then(res => res.json())
  .then(data => {
    document.getElementById('ACU_body-box-users').textContent = data.lastId;
  })
  .catch(() => {
    document.getElementById('ACU_body-box-users').textContent = '加载失败';
  });