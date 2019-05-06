$(document).ready(function(){
    //Скрыть PopUp при загрузке страницы    
    PopUpHide();


    $('.edit').on('click', function(e) {
        let id = $(this).parent().children(".id").text();
        let msg = $(this).parent().children(".name").text();
        $('.popup').val(msg);
        $('.popup-form').attr('action', 'edit/' + id);
        console.log(msg)
    });    
    
    // WebSocket
    const socket = io();

    const form = document.querySelector('#send');
    const message = document.querySelector('#message');

    form.addEventListener('submit', e => {
        e.preventDefault();
        socket.send(message.value);
    })

    socket.on('message', function(message) {
        let text ='';
        switch(message.type) {
            case 'info':
                text = message.message;
                break;
            case 'message':
                text = `${message.author} : ${message.message}`;
                break;
            default:
                alert(message.message);
                break;
        }
        const result = document.querySelector('#subscribe');
        const elMsg = document.createElement('div');
        elMsg.textContent = text;
        result.appendChild(elMsg);

    })
});
//Функция отображения PopUp
function PopUpShow(){
    $("#popup1").show();
}
//Функция скрытия PopUp
function PopUpHide(){
    $("#popup1").hide();
}
