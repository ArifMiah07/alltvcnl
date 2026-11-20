(function () {
  var load = function () {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-01LW7JCZ6F";
    document.head.appendChild(script);
  };
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(load, { timeout: 2000 });
  } else {
    window.setTimeout(load, 1200);
  }
})();
