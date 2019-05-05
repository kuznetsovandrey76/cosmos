$(document).ready(function(){
    //Скрыть PopUp при загрузке страницы    
    PopUpHide();


    $('.edit').on('click', function(e) {
        let id = $(this).parent().children(".id").text();
        let msg = $(this).parent().children(".name").text();
        $('.popup').val(msg);
        $('.popup-form').attr('action', 'edit/' + id);
        console.log(msg)
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