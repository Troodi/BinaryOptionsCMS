<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

use App\Models\ContestUser;

//Update balance for user
Broadcast::channel('balance.{id}', function ($user, $id) {
  return (int) $user->id === (int) $id;
});

//Update demo balance for user
Broadcast::channel('demo_balance.{id}', function ($user, $id) {
  return (int) $user->id === (int) $id;
});

//Update contest balance for user
Broadcast::channel('contest_balance.{id}.{contest_id}', function ($user, $id, $contest_id) {
  return (int) $user->id === (int) $id and ContestUser::where('user_id', $user->id)->where('contest_id', $contest_id)->count();
});

//Update closed order for user
Broadcast::channel('closed.{id}', function ($user, $id) {
  return (int) $user->id === (int) $id;
});

//Update close demo order for user
Broadcast::channel('closed_demo.{id}', function ($user, $id) {
  return (int) $user->id === (int) $id;
});

//Update close contest order for user
Broadcast::channel('closed_contest.{id}.{contest_id}', function ($user, $id, $contest_id) {
  return (int) $user->id === (int) $id and ContestUser::where('user_id', $user->id)->where('contest_id', $contest_id)->count();
});