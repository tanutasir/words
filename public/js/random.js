
$(function(str1) {
    $('#back').click(function(){
        $("#gridpanel").show();   
        $("#startpanel").hide();
    });
    
    function getRandom(){
        $.get('//words/getrandom', function( data ) {
            $.get('//words/getcount', function( nr ) {
                var id = $('#idHidden').text();
//                alert(id + "  " + data.id)
                if( id == data.id && nr > 1){
//                    alert("kuku");
                    getRandom();
                }else{
                    $('#unc').html(data.known);
                    $('#cnwnHidden').html(data.unknown);
                    $('#idHidden').html(data.id);
                    $('#cnwn').focus();
                }
            });    
        });
    }
    
    $('#start').click(function(){
        $("#gridpanel").hide();   
        $("#startpanel").show();
        $.get('//words/getcount', function( nr ) {
            $("#entries").html("Entries count: " + nr);
        });
        getRandom();
        
    });
    
    $('#nextWord').click(function(){
        $('#cnwn').html("");
        getRandom();
    });
    
    
    
        
    $('#cnwn').keypress(function(e){
        if(e.which == 13){
            var a = $("#cnwn").text();
            var trima = a.trim();
            var caretPos = trima.length;
            colorify(a, $('#cnwnHidden').text());
            
            setCaret()
            return false; //prevent duplicate submission
        }
    });
    
    var colorify = function(str, strHidden) {
        str = str.trim();
        var chars = str.split(''),
//            colors = ['#ff0000', '#00ff00', '#0000ff'],
            spans = '';

        var charsHidden = strHidden.split('')//,
//            colors = ['#ff0000', '#00ff00', '#0000ff'],
//            spans = '';
   
//            alert(chars1.length)
        if(chars.length > charsHidden.length){
            var len = chars.length;
        }else{
            var len = charsHidden.length;
        }    
        
        
        for(var i=0; i < len; i++){
//            if(typeof chars[i] == 'undefined'){
//                chars[i] = "&nbsp;";
//            }
            value = chars[i];
            if(chars[i]!=charsHidden[i]){
                if(typeof chars[i] != 'undefined'){
                    if(i < charsHidden.length){
                        spans += '<span style="background-color:red' +
                        '">'+ value +'</span>';
                    }else{
                        spans += '<span style="background-color:green' +
                        '">'+ value +'</span>';
                    }
                }else{
                    spans += '<span style="background-color:yellow' +
                    '">&nbsp;</span>';
                }
            }else{
                if(typeof chars[i] != 'undefined'){
                    spans += '<span style="background-color:white' +
                    '">'+ value +'</span>';
                }
            }
//            console.log(i)
            
            
//            if(typeof chars[i] == 'undefined'){
//                chars[i] = "&nbsp;";
//            }
//            value = chars[i]
//            if(charsHidden[i].lenght > str.trim()){
//                spans += '<span style="background-color:yellow' +
//                    '">'+ value +'</span>';
//            }else{
//                if(chars[i]!=charsHidden[i]){
//                    spans += '<span style="background-color:red' +
//                    '">'+ value +'</span>';
//                }
//
//            }
            
            
            
            
        }
//        $.each(chars, function(idx, value){
//            
//            spans += '<span style="background-color:' + 
//                colors[Math.floor(Math.random() * colors.length)] +
//                '">'+ value +'</span>';
//        });

        $('#cnwn').empty().append(spans);
    };
    
    function setCaret() {
        var el = document.getElementById("cnwn");
        var range = document.createRange();
        var sel = window.getSelection();
//        range.setStart(el.childNodes[0], 5);
        var aa = $('#cnwn').text().trim().length
        range.setStart(el,aa);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        el.focus();
    }
    
    
    $("#btn").click(function(){
        setCaret()
    })
    function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
    

}
    
    
    
    
});
