let isotopeApp=(()=>{
  let init=()=>{
      $(document).ready(function() {
        IsoInit();
      });
    },
    IsoInit=()=>{
      $('.isotope-wrapper').isotope({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
          // use element for option
          columnWidth: '.grid-sizer'
        }
      })
    }
  ;
  init();
  return {};
})();
