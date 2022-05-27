let genericTemplateApp=(()=>{
  let init=()=>{
      $(function() {
        // lightOrDark();
        setHotSpot();
      })
    },
    setHotSpot=()=>{
      const foo = document.getElementById('hero-image-asset');
      const value = foo.dataset.guid;
    },
    lightOrDark=()=>{
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
      if (prefersDarkScheme.matches) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
    }
  ;
  init();
  return {};
})();
