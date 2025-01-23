<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\Models\SameIp;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class CheatService
{
    public function getAllCheatersServ(Request $request){
        $ip_array = array();
        $danger_ips = [];
        $ips = SameIp::select('ip', DB::raw('count(*) as total'))->groupBy('ip')->having('total', '>', '1')->whereNull('banned')->get();
        foreach($ips as $ip) {
            $user_id_array = array();
            $user_rows = SameIp::where('ip', $ip->ip)->whereNull('banned')->distinct()->get();
            foreach($user_rows as $row) {
                $user_id_array[] = $row->user_id;
            }
            $user_id_array = array_unique($user_id_array);
            $users_data_array = array();
            foreach($user_id_array as $user){
                $user = User::where('id', $user)->first();
                $name = $user->name;
                $referer = Referral::where('user_id', $user->id)->first();
                $referer_name = User::where('id', $referer->referer)->first();
                if($referer->referer) {
                    $users_data_array[] = array('user' => $user, 'name' => $name, 'referer' => $referer, 'referer_name' => $referer_name);
                }
            }
            $list_of_users = [];
            $multi_account = false;
            if($users_data_array and sizeof($users_data_array) >= 2){
                foreach($users_data_array as $row){
                    $list_of_users[] = $row['user']->id;
                    $list_of_users[] = $row['referer']->referer;
                }
                foreach(array_count_values($list_of_users) as $key => $value) {
                    if($value >= 2) {
                        $multi_account = true;
                    }
                }
                $list_of_users  = array_map('intval', $list_of_users);
                $full_list_of_users = array_unique($list_of_users);
                $temp_users_list = [];
                foreach(array_count_values($list_of_users) as $key => $value){
                    if($value >= 2){
                        $temp_users_list[] = $key;
                    }
                }
                $list_of_users = $temp_users_list;
                if($multi_account){
                    $danger_ips = array_unique(array_merge($danger_ips, $list_of_users));
                }
                $ip_array[] = array('ip' => $ip, 'user_data' => $users_data_array, 'users_list' => implode(',', $list_of_users), 'full_users_list' => implode(',', $full_list_of_users), 'multi_account' => $multi_account);
            }
        }
        $danger_ips = array_map('intval', $danger_ips);
        $danger_ips = implode(',', $danger_ips);
        return Datatables::of(collect(['ip' => $ip_array, 'danger' => $danger_ips]))->make();
    }
}
