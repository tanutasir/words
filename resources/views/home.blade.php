@extends('layouts.app')

@section('htmlheader_title')
	Home
@endsection


@section('main-content')
	<div class="container spark-screen">
            <div class="row">
                <div class="col-md-10">
                    <div class="panel panel-primary" id="gridpanel">
                        <div class="panel-heading"><span class="contentheader_title"></span></div>

                        <div class="panel-body">
<!--						{{ trans('adminlte_lang::message.logged') }}-->
                            <button id="newrow">New row</button>
                            <button id="delrow">Delete row</button>
                            <button id="editrow">Edit row</button>
                            <button id="saverow">Save row</button>

                            <button id="start">Start</button>


                            <table id="grid"></table>
                            <div id="nav" ></div>





                        </div>
                    </div>
                    <div class="panel panel-primary" style="display: none" id="startpanel">
                        <div class="panel-heading"><span class="contentheader_title"></span></div>

                        <div class="panel-body" style="height:400px">
                        <button id="back">Back</button>
                        <button id="nextWord">Next word</button>
                        <div id="unc"style="height:150px;background-color: grey; font-size: 26px; padding: 10px; font-weight: bold"></div>
                        <!--<textarea id="cnwn" style="height:150px;width: 100%; font-size: 26px;" ></textarea>-->
                        <div id="cnwn" style="height:150px;width: 100%; font-size: 26px; padding: 10px; font-weight: bold" contenteditable="true"></div>
                        <div id="cnwnHidden" style="display: none"></div>
                        <div id="idHidden" style="display: none"></div>
                        <div id="entries"></div>
                        <button id="btn">btn</button>
                        </div>
                    </div>
                </div>
            </div>
	</div>
@endsection
