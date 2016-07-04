<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Illuminate\Support\Facades\DB;
use Auth;

use App\libs\at\nestedSets;
use App\libs\at\ext;
use App\Structs;
use App\Data;
use Session;

class GridController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    
    public function data(){

        $page = $_GET['page'];
        $limit = $_GET['rows'];
        $sord = $_GET['sord']; 
        $sidx = $_GET['sidx'];
        
        if (!$sidx) {$sidx = 1;}
        $structid = Session::get('structid');
        $result = DB::select('SELECT COUNT(*) AS count FROM data WHERE tree_struct_id='.$structid);
        $count = $result[0]->count;

        
        if( $count >0 ) {
            $total_pages = ceil($count/$limit);
        } else {
            $total_pages = 0;
        }        
        if ($page > $total_pages) {
            $page = $total_pages;
        }

        $start = $limit*$page - $limit; // do not put $limit*($page - 1)
        if ($start < 0) {
            $start = 0;
        }
        $sql = 'SELECT * FROM data WHERE tree_struct_id='.$structid.' ORDER BY '.$sidx.' '.$sord.' LIMIT '.$start.' , '.$limit;
        $result = DB::select($sql);    
        $responce = (object)array();
        
        $responce->page = $page;
        $responce->total = $total_pages;
        $responce->records = $count;
        $i=0;
        
        foreach($result as $row){
            $responce->rows[$i]=$row;
            $i++;
        }

        echo json_encode($responce);
    }
    
    public function gridsave(){
        $id = $_POST['id'];
 
        $data = Data::find($id);
        if(isset($_POST['known'])){
            $data->known = $_POST['known'];
        }
        if(isset($_POST['unknown'])){
            $data->unknown = $_POST['unknown'];
        }
        if(isset($_POST['accent'])){
            $data->accent = $_POST['accent'];
        }
        $data->save();
    }
    public function gridnew(){
        
        if(Session::has('structid')){
            $data = new Data();
            $data->tree_struct_id = Session::get('structid');
            if($data->save()){
                $ret = $data->id;
            }else{
                $ret = false;
            }
        }else{
            $ret = false;
        }
        
        return $ret;
    }
    
    public function griddel(){
        
        $id = $_POST['id'];
 
        $data = Data::find($id);
        $data->delete();
    }
    
    public function structbyid(){
        $id = $_POST['id'];
        $data = Structs::find($id);
        
        return json_encode($data);
    }
    
    public function setproperties(){
        $id = $_POST['id'];
        $lang = $_POST['lang'];
        $voice = $_POST['voice'];
        $data = Structs::find($id);
        $data->lang = $lang;
        $data->voice = $voice;
        $ret = 0;
        if($data->save()){
            $ret = 1;
        }
        return $ret;
    }
}
