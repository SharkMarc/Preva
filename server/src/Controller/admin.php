<?php

class admin
{

    public $id;

    /**
     * @var string
     */
    public $name;


//   form
    public $firstname;
    public $surname;
    public $formEmail;

    /**
     * @var Blog[]
     */
    public $blogs = [];

    private $admin;

    /**
 * @return mixed
 */
    public function getAdmin()
    {
        return $this->admin;
    }


}