@extends('layouts.app')

@section('htmlheader_title')
	Home
@endsection


@section('main-content')
	<div class="container spark-screen">
		<div class="row">
			<div class="col-md-10">
				<div class="panel panel-primary">
					<div class="panel-heading"><span id="contentheader_title"></span></div>

					<div class="panel-body">
<!--						{{ trans('adminlte_lang::message.logged') }}-->
<table id="grid"></table>
<div id="nav" ></div>





					</div>
				</div>
			</div>
		</div>
	</div>
@endsection
