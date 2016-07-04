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
        colNames:['id', '', 'Unknown', 'Known', 'Accent'],
        colModel:[
                {name:'id', width:30},
                {width:50,formatter:Cformater},       
                {name:'unknown', width:200, editable:true,edittype:"textarea"},
                {name:'known', width:200, editable:true,edittype:"textarea"},
                {name:'accent', width:200, editable:true,edittype:"textarea"}		
        ],
        rowNum:10,
        rowList:[10,20,30],
        pager: '#nav',
        sortname: 'id',
        sortorder: "asc",
        viewrecords: true,
        height: "250",
        onSelectRow: function(id){
            if(id && id!==lastsel){
                jQuery('#grid').jqGrid('saveRow',lastsel);
                jQuery('#grid').jqGrid('editRow',id,true);
                lastsel=id;
            }
        },
//        afterEditCell: function() {
//           alert('string');
//           //jQuery("#grid").restoreCell(iRow, iCol);
//           //jQuery('#grid').jqGrid('saveRow',iRow);
//        },
        restoreAfterSelect: false,
        saveAfterSelect: true,
        rownumbers: true,
        cellEdit : true,
        cellsubmit:'remote',
        cellurl: '//' + path + '/grid/save',
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

});