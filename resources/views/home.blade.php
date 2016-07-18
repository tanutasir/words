@extends('layouts.app')

@section('htmlheader_title')
	Home
@endsection


@section('main-content')
	<div class="container spark-screen">
		<div class="row">
			<div class="col-md-10">
				<div class="panel panel-primary" id="gridpanel">
					<div class="panel-heading"><span id="contentheader_title"></span></div>

					<div class="panel-body">
<!--						{{ trans('adminlte_lang::message.logged') }}-->
<button id="newrow">New row</button>
<button id="delrow">Delete row</button>
<button id="editrow">Edit row</button>
<button id="saverow">Save row</button>


<table id="grid"></table>
<div id="nav" ></div>





					</div>
				</div>
			</div>
		</div>
	</div>
@endsection
