function qqq(id){
    var txt = jQuery('#grid').jqGrid('getRowData', id);
    directSpeak(txt.unknown);
}

var path = "words";
$(function() {
    $('#tree').jstree({
        'core' : {
            'data' : {
                'url' : '//' + path + '/tree/data?op=get_node',

//                'url': function (node){
//                    return node.id === "#" ?
//                    '//words/nested/data?op=get_node':null;
//                },
                'data' : function (node) {
                    return { 'id' : node.id };
                },
                'dataType':'json',
            },
            'check_callback' : true,
            'themes' : {
                'responsive' : false
            }
        },
        'types' : {
            '#' : {
//                "valid_children":["folder","file"],
                'icon' : "glyphicon glyphicon-folder-close"
            },
            'default' : {
                "icon" : "glyphicon glyphicon-folder-close"
            },
            "folder" : {
                "valid_children":["folder","file"],
                "icon" : "glyphicon glyphicon-folder-close yellow"
            },
            "file" : {
                "valid_children":null,
                "icon" : "glyphicon glyphicon-file green"
            },
            "ext" : {
                
            }
        },
        
        'force_text' : true,
        'plugins' : ['state','dnd','wholerow','types']//,'contextmenu'
    }).on('create_node.jstree', function (e, data) {
        $.get('//' + path + '/tree/data?op=create_node', { 'id' : data.node.parent, 'position' : data.position, 'type' : data.node.type })
            .done(function (id) {
                    data.instance.set_id(data.node, id);
                    $("#jstree").jstree(true).edit(id);
            })
            .fail(function () {
                    data.instance.refresh();
            });
    }).on('rename_node.jstree', function (e, data) {
        $.get('//' + path + '/tree/data?op=rename_node', { 'id' : data.node.id, 'text' : data.text })
            .fail(function () {
                    data.instance.refresh();
            });
    }).on('delete_node.jstree', function (e, data) {
        $.get('//' + path + '/tree/data?op=delete_node', { 'id' : data.node.id })
            .fail(function () {
                    data.instance.refresh();
            });
    }).on('move_node.jstree', function (e, data) {
        $.get('//' + path + '/tree/data?op=move_node', { 'id' : data.node.id, 'parent' : data.parent, 'position' : data.position })
            .fail(function () {
                    data.instance.refresh();
            });
    }).on('open_node.jstree', function (e, data) { 
       // data.instance.set_icon(data.node, "glyphicon glyphicon-folder-open blue"); 
    }).on('close_node.jstree', function (e, data) { 
       // data.instance.set_icon(data.node, "glyphicon glyphicon-folder-close blue"); 
    }).on('changed.jstree', function (e, data) {
        if(typeof data.node != "undefined"){
            if(data.node.type == "file"){
                $.post( '//' + path + '/session/set', { key: 'structid', value: data.node.id },function(){
                    jQuery('#grid').trigger('reloadGrid');
                        $.post('//' + path + '/tree/structbyid',{id:data.node.id},function(ret){
                            $("#contentheader_title").text(JSON.parse(ret).text)
                        })
                    
                });
                
            }else{
                $.post( '//' + path + '/session/set', { key: 'structid', value: 0 },function(){
                    jQuery('#grid').trigger('reloadGrid');
                    $("#contentheader_title").text('')
                });
            }
            
        }
    }).on("contextmenu", ".jstree-anchor", function (e) {
        e.preventDefault();
        $("#jstree").jstree(true).activate_node(this);
    });
    
    
    
});

