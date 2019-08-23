<?php




class admin
{

    public $id;

    /**
     * @var string
     */
    public $name;


//   form
    public $formname;
    public $surname;
    public $formEmail;

    /**
     * @var Blog[]
     */
    public $blog = [];

    private $admin;

    /**
 * @return mixed
 */
    public function getAdmin()
    {
        return $this->admin;
    }


}