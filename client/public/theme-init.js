// Runs before first paint (external file: the CSP forbids inline scripts) so
// a saved light theme never flashes dark. Default is dark, the site's brand.
(function () {
  var theme = "dark";
  try {
    if (localStorage.getItem("theme") === "light") theme = "light";
  } catch (e) {}
  document.documentElement.setAttribute("data-theme", theme);
})();
