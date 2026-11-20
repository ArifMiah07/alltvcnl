(function () {
  if (window.navigator.userAgent.indexOf("Electron") !== -1) return;
  var hash = window.location.hash;
  if (hash.indexOf("#/") !== 0) return;
  var target = hash.slice(1);
  if (!/^\/(?!\/|\\)/.test(target)) return;
  var url = new URL(target, window.location.origin);
  if (url.origin !== window.location.origin) return;
  window.location.replace(url.pathname + url.search + url.hash);
})();
