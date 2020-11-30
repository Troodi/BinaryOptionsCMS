<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, SoftDeletes;

    protected $dates = ['deleted_at'];

    public function sendPasswordResetNotification($token){
      $mail_data = [
        'headline' => 'Восстановление пароля',
        'subtitle' =>  'Запрошено восстановление пароля от вашего аккаунта',
        'text' => '<p>Hello! You are receiving this email because we received a password reset request for your account. This password reset link will expire in 60 minutes.</p>',
        'image' => 'user-reset-password.png',
        'button_link' => route('password.reset', ['token' => $token, 'email' => $this->email]),
        'button_text' => 'Reset Password'
      ];
      Mail::send('mail.mail', $mail_data, function($message)
      {
        $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
        $message->replyTo(env('MAIL_USERNAME'));
        $message->subject('Восстановление пароля');
        $message->to($this->email);
      });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'token', 'referer_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'referer_id'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

  public function profile()
  {
    return $this->hasOne('App\Models\Profile');
  }

  public function provider()
  {
    return $this->hasMany('App\Models\UserProvider');
  }
}
