@extends('layouts.contentLayoutMaster')
{{-- title --}}
@section('title','Trading')

{{-- vendor styles --}}
@section('vendor-styles')
<link rel="stylesheet" type="text/css" href="{{asset('vendors/css/vendors.min.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('vendors/css/ui/prism.min.css')}}">
@endsection

@section('content')
<section id="trading" class="card">
  <div class="card-content">
    <div class="card-body p-0">
      <div class="card-text">
        <div id="tv_chart_container">
          <!-- This div will contain the Charting Library widget. -->
        </div>
      </div>
    </div>
  </div>
</section>
@endsection

{{-- vendor scripts --}}
@section('vendor-scripts')
<script src="{{asset('vendors/js/ui/prism.min.js')}}"></script>
@endsection

@section('page-scripts')
  <script type="text/javascript" src="/charts/charting_library/charting_library.min.js"></script>
  <script type="module" src="/charts/main.js"></script>
@endsection