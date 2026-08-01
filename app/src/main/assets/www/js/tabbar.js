/* 事现鉴 App 统一底部导航：自包含样式，可注入任意页面（index/org/history 等）。
   用法：在页面 </body> 前加 <script src="js/tabbar.js"></script>。
   激活态按当前文件名判断；点击切换到对应页面或 index.html 的 SPA tab（hash）。 */
(function () {
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var active = (file === 'org.html' || file === 'history.html') ? 'org' : 'events';

  var TABS = [
    { key: 'events', label: '事件簿', href: 'index.html' },
    { key: 'theory', label: '理论',   href: 'index.html#theory' },
    { key: 'org',    label: '组织',   href: 'org.html' },
    { key: 'mine',   label: '我的',   href: 'index.html#mine' }
  ];

  // 自包含样式（避免依赖 app.css）
  var style = document.createElement('style');
  style.textContent = [
    '.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:1000;display:flex;',
    'background:#fff;border-top:1px solid #e6dcc4;box-shadow:0 -2px 10px rgba(0,0,0,.06);}',
    '.tabbar button{flex:1;border:0;background:transparent;padding:10px 4px 12px;',
    'font-size:13px;color:#8a7a55;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;',
    'cursor:pointer;}',
    '.tabbar button.active{color:#A32D2D;font-weight:700;}',
    '.tabbar button.active::before{content:"";display:block;width:22px;height:3px;',
    'background:#A32D2D;border-radius:2px;margin:0 auto 4px;}',
    'body{padding-bottom:56px;}'
  ].join('');
  document.head.appendChild(style);

  var bar = document.createElement('nav');
  bar.className = 'tabbar';
  TABS.forEach(function (t) {
    var b = document.createElement('button');
    b.textContent = t.label;
    b.setAttribute('data-tab', t.key);
    if (t.key === active) b.className = 'active';
    b.onclick = function () { location.href = t.href; };
    bar.appendChild(b);
  });
  document.body.appendChild(bar);
})();
