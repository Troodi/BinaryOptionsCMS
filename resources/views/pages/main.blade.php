@extends('layouts.contentLayoutMaster')
{{-- title --}}
@section('title','Trading')

{{-- vendor styles --}}
@section('vendor-styles')
<link rel="stylesheet" type="text/css" href="{{asset('vendors/css/vendors.min.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('vendors/css/ui/prism.min.css')}}">
@endsection

@section('content')

@endsection

{{-- vendor scripts --}}
@section('vendor-scripts')
<script src="{{asset('vendors/js/ui/prism.min.js')}}"></script>
@endsection

@section('above-vendor-scripts')
  <script type="text/javascript" src="/charts/charting_library/charting_library.min.js"></script>
@endsection