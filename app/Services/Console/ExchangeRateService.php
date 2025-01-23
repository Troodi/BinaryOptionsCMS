<?php

namespace App\Services\Console;


use App\Models\ExchangeRates;
use Ixudra\Curl\Facades\Curl;

class ExchangeRateService{

    public function exchange()
    {
        $response = Curl::to('https://www.cbr-xml-daily.ru/latest.js')
            ->asJson()
            ->get();
        if(!ExchangeRates::where('symbol', 'USD')->count()){
            $model = new ExchangeRates();
            $model->symbol = 'USD';
            $model->price = $response->rates->USD;
            $model->save();
        } else {
            ExchangeRates::where('symbol', 'USD')->update(['price' => $response->rates->USD]);
        }
        dump("Rate has been exchanged");
        return 0;
    }
}