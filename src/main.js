$(document).ready(function(){
    $('.edit').on('click', function(e) {
        let id = $(this).parent().parent().children(".id").text();
        let msg = $(this).parent().parent().children(".name").text();
        $('#modal-msg').val(msg);
        $('#modal-form').attr('action', 'edit/' + id);
    });    
    
    $('#new-post-add').hide();

    $(document).on('click', function(e) {
        var el =  $(e.target).parent()[0].id || e.target.id ;
        // alert(el)
        if(el === 'new-post-temp' || el === 'new-post'|| el === 'new-post-add') {
            $('#new-post-temp').hide();
            $('#new-post-add').show();      
        } else {
            $('#new-post-temp').show();
            $('#new-post-add').hide(); 
        }
    
    });



    // MODALS    
    const buttons = $(`[data-modal-trigger]`);
    for(let button of buttons) {
        modalEvent(button);
    }

    function modalEvent(button) {
        button.addEventListener('click', function() {
            const trigger = button.getAttribute('data-modal-trigger');
            const modal = document.querySelector(`[data-modal=${trigger}]`);
            const modalWrapper = modal.querySelector('.modal-wrapper');
            const close = modal.querySelector('.close');

            close.addEventListener('click', function() {
                modal.classList.remove('open')
            });
            modal.addEventListener('click', function() {
                modal.classList.remove('open');
            });
            modalWrapper.addEventListener('click', function(e) {
                e.stopPropagation();
            });

            modal.classList.toggle('open');
        });
    }
});