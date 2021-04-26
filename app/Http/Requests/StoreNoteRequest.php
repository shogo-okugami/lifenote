<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreNoteRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return (int)$this->user_id === Auth::id();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'date' => 'required',
      'text' => 'required|max:500',
    ];
  }

  public function messages()
  {
    return [
      'text.required' => '入力してください。',
      'text.max' => '500文字以内で入力してください',
      'date.required' => '選択してください。',
    ];
  }
}
