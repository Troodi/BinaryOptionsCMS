<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

class SettingsService
{
    public function getAllSettingsServ(Request $request)
    {
        $keys = [];
        if(config('custom.demo')){
            foreach(DotenvEditor::getKeys() as $key => $value){
                $value['value'] = __('locale.demo_error');
                $keys[$key] = $value;
            }
        } else {
            $keys = DotenvEditor::getKeys();
        }
        return $keys;
    }

    public function saveServ(Request $request)
    {
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        DotenvEditor::autoBackup(false);
        $result = null;
        parse_str($request->data, $result);
        foreach ($result as $key => $value) {
            DotenvEditor::setKey($key, $value, '', false);
        }
        DotenvEditor::save();
        return (['success' => true, 'message' => __('locale.admin_settings_success')]);
    }
}
