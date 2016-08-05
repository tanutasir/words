
    $('#back').click(function(){
        $("#gridpanel").show();   
        $("#startpanel").hide();
    })
    $('#nextWord').click(function(){
        $.get('//words/getrandom', function( data ) {
//            alert((data.known))
            $('#unc').html(data.known)
            $('#cnwn').focus()
           // alert(JSON.stringify(data))
        })
    })
    

