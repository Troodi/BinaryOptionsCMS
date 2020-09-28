<?php // Code within app\Helpers\Helper.php
namespace App\Helpers;
use Illuminate\Support\Facades\File;

class Helper
{
  static public function createPathForVerifyPhotos(){
    if(!File::isDirectory(storage_path('app/private'))){
      File::makeDirectory(storage_path('app/private'));
    }
    if(!File::isDirectory(storage_path('app/private/'.date('Y')))){
      File::makeDirectory(storage_path('app/private/'.date('Y')));
    }
    if(!File::isDirectory(storage_path('app/private/'.date('Y/m')))){
      File::makeDirectory(storage_path('app/private/'.date('Y/m')));
    }
    if(!File::isDirectory(storage_path('app/private/'.date('Y/m/d')))){
      File::makeDirectory(storage_path('app/private/'.date('Y/m/d')));
    }
    return 'storage/app/private/'.date('Y/m/d');
  }
}
