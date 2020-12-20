<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNoteRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'created_at' => 'required',
      'text' => 'required|max:500',
    ];
  }

  public function messages()
  {
    return [
      'text.required' => '入力してください。',
      'text.max' => '500文字以内で入力してください',
      'created_at.required' => '選択してください。',
    ];
  }
}
