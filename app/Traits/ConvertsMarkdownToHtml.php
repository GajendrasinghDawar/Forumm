<?php

namespace App\Traits;

trait ConvertsMarkdownToHtml
{
    protected static function bootConvertsMarkdownToHtml()
    {
        static::saving(function ($model) {

            $htmlContent = str($model->body)->markdown([
                'html_input' => 'allow',
                'allow_unsafe_links' => false,
                'max_nesting_level' => 5,
            ]);

            $model->body = $htmlContent;
        });
    }
}
