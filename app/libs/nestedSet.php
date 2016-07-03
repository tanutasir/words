<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\libs;

use DB;
use Auth;
use App\Structs;
//use Kalnoy\Nestedset\NestedSet;

/**
 * Description of nestedSet
 *
 * @author andris
 */
class nestedSet {

    public function get_node3($id, $with_children = false, $deep_children = false, $with_path = false) {
        $node = DB::table("tree_struct")
                ->join('tree_data','tree_struct.id','=','tree_data.id')
                ->where('tree_struct.uid',Auth::user()->id)
                ->where('tree_struct.id',(int)$id)
                ->get();
        
        if(!$node){
            throw new Exception('Node does not exist');
        }
        $nodes = Category::get()->toTree();
//        if($with_children) {
//            $node['children']="";
//        }
//        if($with_path) {
//            $node['children']="";
//        }
        
        return $node;

    }
    
    public function get_node($id, $recursive = false) {
        
    }
    
    public function get_children($id, $recursive = false) {
        if($id == "#"){
            $roots = Structs::roots()->uid(Auth::user()->id)->get();
        }else{
            $roots = Structs::where('id', $id)->first()->children()->uid(Auth::user()->id)->get();
        }
        $rslt = array();
        $type = 'folder';
        $types['type'] = $type;        
         foreach($roots as $root){
             $rslt[] = array('id' => $root['id'], 'text' => $root['text'], 'voice' => $root['voice'], 'lang' => $root['lang'], 'type' => $root['type'], 'children' => ($root['rgt'] - $root['lft'] > 1));
         }
         
        return $rslt;
    }
    
    public function mk($parent, $position = 0, $type) {
        if($parent === 0){
            $node = Structs::create(['text' => 'New '.$type, 'type' => $type, 'uid' => Auth::user()->id, 'parent_id' => null]);
        }else{
            $node = Structs::where('id', $parent)
                    ->first()->children()->uid(Auth::user()->id)
                    ->create(['text' => 'New '.$type, 'type' => $type, 'uid' => Auth::user()->id]);
        }
        return $node;
    }
    
    public function rn($id, $text) {
        $node = Structs::where('id', $id)->first();
        $node->text = $text;
        $node->save();
        
        return true;
    }
    
    public function rm($id) {
        $ret = Structs::where('id', $id)->uid(Auth::user()->id)->first()->delete();

        return true;
    }
    
    public function mv($id, $parent, $position = 0) {
        
        $node = Structs::where('id', $id)->uid(Auth::user()->id)->first();
        $parentNode = Structs::where('id', $id)->uid(Auth::user()->id)->first()->parent()->first();
        if($parent === 0){
            $roots = Structs::roots()->withoutNode($node)->get();
            $countRoots = count($roots);
            if($countRoots > $position){
                $target = $roots[$position]['id'];
                $tnode = Structs::where('id', $target)->uid(Auth::user()->id)->first();
                $node->moveToLeftOf($tnode);
            }else{
                $target = $roots[$position - 1]['id'];
                $tnode = Structs::where('id', $target)->uid(Auth::user()->id)->first();
                $node->moveToRightOf($tnode);
            }
        }else{
            $targetParentNode = Structs::where('id', $parent)->uid(Auth::user()->id)->first();
            if(!$targetParentNode->isLeaf()){
                $childs = Structs::where('id', $parent)
                    ->first()->children()->uid(Auth::user()->id)->withoutNode($node)->get();
                $countChilds = count($childs);
                if($countChilds > $position){
                    $target = $childs[$position]['id'];
                    $tnode = Structs::where('id', $target)->uid(Auth::user()->id)->first();
                    $node->moveToLeftOf($tnode);
                }else{
                    $target = $childs[$position - 1]['id'];
                    $tnode = Structs::where('id', $target)->uid(Auth::user()->id)->first();
                    $node->moveToRightOf($tnode);
                }
            }else{
                $tnode = Structs::where('id', $parent)->uid(Auth::user()->id)->first();
                $node->makeFirstChildOf($targetParentNode);                
            }
        }
        
        return true;
    }
    
//    function lout($data) {
//        if(is_array($data) || is_object($data))
//            {
//                    echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
//            } else {
//                    echo("<script>console.log('PHP: ".$data."');</script>");
//            }
//    }

    
}
