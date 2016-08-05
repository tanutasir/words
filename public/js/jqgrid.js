//function qqq(id){
//    var txt = jQuery('#grid').jqGrid('getRowData', id);
////    directSpeak(txt.unknown);
//}
function qqq(id){
    var txt = jQuery('#grid').jqGrid('getRowData', id);
//    alert(txt.unknown);
//    var su = new SpeechSynthesisUtterance();
//    su.lang = "en";
//    su.text = txt.unknown;
//    speechSynthesis.speak(su);
    
    speak(txt.unknown)
}
$(function() {

    function Cformater(cellvalue, options, rowObject){
        var txt = rowObject.id;

        //return "<input type=\"button\" value=\"S\" onclick='qqq(\"" + txt + "\");'/>";
        return "<button onclick='qqq(\"" + txt + "\");'><span class='glyphicon glyphicon-music'></span>&nbsp;<span class='glyphicon glyphicon-play'></span></button>";
    }   
    var path = "words";
    var lastsel;    
    jQuery("#grid").jqGrid({
        scroll: 1,
        url:'//' + path + '/grid/data',
        datatype: "json",
        colNames:['id', '', 'Unknown', 'Known'],//, 'Accent'
        colModel:[
                {name:'id', width:30},
                {width:30,formatter:Cformater},       
                {name:'unknown', width:200, editable:true,edittype:"textarea"},
                {name:'known', width:200, editable:true,edittype:"textarea"}//,
 //               {name:'accent', width:200, editable:true,edittype:"textarea"}		
        ],
        editurl: '//' + path + '/grid/gridsave',
        rowNum:10,
        rowList:[10,20,30],
        pager: '#nav',
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: "400",
        width:749,
        onSelectRow: function(id){
            if(id && id!==lastsel){
                var saveurl = '//' + path + '/grid/gridsave';
                jQuery('#grid').jqGrid('saveRow', lastsel, saveurl);
                jQuery('#grid').jqGrid('editRow',id,true);
                lastsel = id;
            }
        },
//        afterEditCell: function() {
//           alert('string');
//           //jQuery("#grid").restoreCell(iRow, iCol);
//           //jQuery('#grid').jqGrid('saveRow',iRow);
//        },
        restoreAfterSelect: false,
//        saveAfterSelect: true,
        rownumbers: true,
        cellEdit : false,
//        cellsubmit:'remote',
//        cellurl: '//' + path + '/grid/gridsave',
        hoverrows : true
       // editurl: "//words/nested/gridsave",

    //        caption:"WORDS"
    })
//    .setGridParam({afterEditCell: function(id,name,val,iRow,iCol){
//        //Modify event handler to save on blur.
//    
//        $("#"+iRow+"_"+name).bind('blur',function(){
//          //alert("strada");
//          //jQuery("#grid").saveCell(iRow, iCol);
//        });
//       }
//    });

    jQuery("#grid").jqGrid('navGrid','#nav',{edit:false,add:false,del:false});
    
    $('#newrow').click(function(){
        
        $.post('//' + path + '/grid/gridnew', function(id){
            jQuery('#grid').jqGrid('saveRow',lastsel);
            $("#grid").jqGrid('addRowData',id,{id:id},'last');
            jQuery('#grid').jqGrid('saveRow',id);
            jQuery('#grid').jqGrid('setSelection',id);
            jQuery('#grid').jqGrid('editRow',id);
        })

    })
    
    $('#delrow').click(function(){
        var id = jQuery('#grid').jqGrid('getGridParam','selrow'); 
        if(id){ 
            $.post('//' + path + '/grid/griddel',{id:id}, function(){ 
//                jQuery('#grid').jqGrid('saveRow',id);
                $("#grid").jqGrid('delRowData',id);
                jQuery('#grid').trigger('reloadGrid');
            })
        }
    })
    
    $('#saverow').click(function(){
        var id = jQuery('#grid').jqGrid('getGridParam','selrow');
//        jQuery('#grid').jqGrid('saveRow',id);
        jQuery('#grid').jqGrid('resetSelection');

        var saveurl = '//' + path + '/grid/gridsave';
        jQuery('#grid').jqGrid('saveRow',id, checkedit, saveurl);

    })
    
    $('#start').click(function(){
        $("#gridpanel").hide();   
        $("#startpanel").show();
    })
    

    
    function checkedit(result){
        return false;
    }
});

