let textTest=(()=>{
  let init=()=>{
      $(function() {
        if ($('body.text-test').length) {
          modText();
        }
      })
    },
    modText=()=>{
      $('#title').html(function(i,v){
        v=v.replace(/Gilded Age/g,'<span class="no-break">Gilded Age</span>');
        return v;
      });
    }
  ;
  init();
  return {};
})();




