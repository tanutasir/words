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
                        $.post('//' + path + '/grid/structbyid',{id:data.node.id},function(ret){
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
        $("#tree").jstree(true).activate_node(this);
    });
    
    $.contextMenu({
        selector: ".jstree-anchor",
        autoHide: true,
        zIndex: 1000,
        items: {
            createFile: {
                name: "New File",
                icon: "add",
                visible: function(){
                        var node = $("#tree").jstree(true).get_selected(true);
                        return (node[0].type == "folder") ? true : false;
                },
                callback: function(key, opt){
                    var node = $("#jstree").jstree(true).get_selected(true);
                    $("#tree").jstree('create_node', node[0].id, { 'text' : 'New file', 'type': 'file'}, 'last');
                }
            },
            createFolder: {
                name: "New Folder",
                icon: "add",
                visible: function(){
                        var node = $("#tree").jstree(true).get_selected(true);
                        return (node[0].type == "folder") ? true : false;
                },
                callback: function(key, opt){
                    var node = $("#tree").jstree(true).get_selected(true);
                    $("#tree").jstree('create_node', node[0].id, { 'text' : 'New folder', 'type': 'folder'}, 'last');
                    
                }
            },
            "sep1": { 
                "type": "cm_seperator",
                visible: function(){
                        var node = $("#tree").jstree(true).get_selected(true);
                        return (node[0].type == "folder") ? true : false;
                },            
            },
            rename: {
                name: "Rename",
                icon: "edit",
                callback: function(key, opt){
                    var node = $("#tree").jstree(true).get_selected(true);
                    $("#tree").jstree(true).edit(node[0].id);
                }
            },
            
            delete: {
                name: "Delete",
                icon: "delete",
                callback: function(key, opt){
                    var node = $("#tree").jstree(true).get_selected(true);
                    $("#tree").jstree(true).delete_node(node[0].id);
                }
            },
            "sep2": { 
                "type": "cm_seperator",
             //   visible: function(){
                      //  var node = $("#jstree").jstree(true).get_selected(true);
                      //  return (node[0].type == "folder") ? true : false;
              //  },            
            },
            options: {
                name: "Properties",
                icon: "edit",
                visible: function(){
                        var node = $("#tree").jstree(true).get_selected(true);
                        return (node[0].type == "file") ? true : false;
                },
                callback: function(key, opt){
                   opendialog(2);
                   // var node = $("#jstree").jstree(true).get_selected(true);
                   // $("#jstree").jstree(true).edit(node[0].id);
                }
            }
            
        }
    });
    
});

