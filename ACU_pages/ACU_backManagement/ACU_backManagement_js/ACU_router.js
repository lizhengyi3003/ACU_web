// hash路由
const routes = {
  '#/ACU_overview': () => import('./ACU_other/ACU_overview.js'),
  // ...其他页面
};

export function router() {
  const hash = location.hash || '#/ACU_overview';
  if (routes[hash]) {
    routes[hash]().then(module => {
      const container = document.getElementById('main-content');
      if (container) {
        module.render(container);
      }
    });
  } else {
    // 未匹配到路由时
    const container = document.getElementById('main-content');
    if (container) container.innerHTML = '<div style="padding:2em;color:#888;">页面不存在</div>';
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);