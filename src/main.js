$(document).ready(function(){
    //Скрыть PopUp при загрузке страницы    
    PopUpHide();


    $('.edit').on('click', function(e) {
        let id = $(this).parent().parent().children(".id").text();
        let msg = $(this).parent().parent().children(".name").text();
        $('.popup-msg').val(msg);
        $('.popup-form').attr('action', 'edit/' + id);
        // console.log(msg)
    });    
    
    $('#new-post-add').hide();

    $(document).on('click', function(e) {
        var el =  $(e.target).parent()[0].id || e.target.id ;
        // console.log(el)
        if(el === 'new-post-temp' || el === 'new-post'|| el === 'new-post-add') {
            $('#new-post-temp').hide();
            $('#new-post-add').show();      
        } else {
            $('#new-post-temp').show();
            $('#new-post-add').hide(); 
        }
    
    });




    // WebSocket
    // const socket = io();

    // const form = document.querySelector('#send');
    // const message = document.querySelector('#message');

    // form.addEventListener('submit', e => {
    //     e.preventDefault();
    //     socket.send(message.value);
    // })

    // socket.on('message', function(message) {
    //     let text ='';
    //     switch(message.type) {
    //         case 'info':
    //             text = message.message;
    //             break;
    //         case 'message':
    //             // text = `${message.author} : ${message.message}`;
    //             text = `${message.message}`;
    //             break;
    //         default:
    //             // alert(message.message);
    //             break;
    //     }
    //     const result = document.querySelector('#subscribe');
    //     const elMsg = document.createElement('div');
    //     elMsg.textContent = text;
    //     result.appendChild(elMsg);

    // });



    // const buttons = document.querySelectorAll(`button[data-modal-trigger]`);
    
    const buttons = $(`[data-modal-trigger]`);

    console.log(buttons)

    for(let button of buttons) {
        modalEvent(button);
    }

    function modalEvent(button) {
        button.addEventListener('click', () => {
            const trigger = button.getAttribute('data-modal-trigger');
            const modal = document.querySelector(`[data-modal=${trigger}]`);
            const contentWrapper = modal.querySelector('.content-wrapper');
            const close = modal.querySelector('.close');

            close.addEventListener('click', () => modal.classList.remove('open'));
            modal.addEventListener('click', () => modal.classList.remove('open'));
            contentWrapper.addEventListener('click', (e) => e.stopPropagation());

            modal.classList.toggle('open');
        });
    }
});
//Функция отображения PopUp
function PopUpShow(){
    $("#popup1").show();
}
//Функция скрытия PopUp
function PopUpHide(){
    $("#popup1").hide();
}
