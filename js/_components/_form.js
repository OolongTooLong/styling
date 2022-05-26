'use strict';
(function ($) {

    $(document).ready(function(){
        var e = document.getElementById("subjectId");
        var strUser = e.options[0].innerHTML;
        $('#subject').val(strUser);
    })


    $('#subjectId').change(function() {
        var val = this.value;
        var label = this.options[this.selectedIndex].innerHTML;
        $('#toEmail').val(val);
        $('#subject').val(label);

    })
    function datePicker() {
        $('.datepicker').each(function (index, Element) {
            let $this = $(this);
            $this.datepicker();
        });
    }
    datePicker();
    // DATE PICKER


    // DATE RANGE
    $( function() {
        var dateFormat = "mm/dd/yy",
            from = $( "#from" )
                .datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 3
                })
                .on( "change", function() {
                    to.datepicker( "option", "minDate", getDate( this ) );
                }),
            to = $( "#to" ).datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 3
            })
                .on( "change", function() {
                    from.datepicker( "option", "maxDate", getDate( this ) );
                });

        function getDate( element ) {
            var date;
            try {
                date = $.datepicker.parseDate( dateFormat, element.value );
            } catch( error ) {
                date = null;
            }

            return date;
        }
    } );
    let openForm = $(".open-form-link");
    openForm.magnificPopup({
        type:'inline',
        gallery:{
            enabled:true
        },
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
    openForm.on("click", function (e) {
        datePicker();
    });

})(jQuery); // Fully reference jQuery after this point.
