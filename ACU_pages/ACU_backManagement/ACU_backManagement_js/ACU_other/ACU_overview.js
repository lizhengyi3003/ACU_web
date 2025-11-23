export function render(container) {
  // 加载CSS（只加载一次）
  if (!document.getElementById('ACU_overview_css')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'ACU_backManagement_css/ACU_overview.css';
    link.id = 'ACU_overview_css';
    document.head.appendChild(link);
  }

  // 加载HTML
  fetch('ACU_backManagement_pages/ACU_overview.html')
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;

      // 加载页面逻辑
      fetch('/api/backManagement')
        .then(res => res.json())
        .then(data => {
          document.getElementById('ACU_body-box-users').textContent = data.lastId;
        })
        .catch(() => {
          document.getElementById('ACU_body-box-users').textContent = '加载失败';
        });
    });
}