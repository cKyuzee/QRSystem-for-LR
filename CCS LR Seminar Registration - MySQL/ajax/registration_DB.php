<?php

include 'database_connection.php';

$db = new Connection();
$db = $db->dbConnect(); #being extremely explicit here just in case.

$func = $_POST['func'];
# $data
if($func == 'getColleges')
{
    # do things
    # get the respective colleges make in the form of JSON
    $query = $db->prepare( 'SELECT * FROM collegename');
    $query->execute();

    $colleges = array();

    if($query->rowcount() != 0)
    {
        while($result = $query->fetch(PDO::FETCH_ASSOC))
        {
            $college = (object)[];
            $college->college = $result['college'];
            $college->collegeCode = $result['collegeCode'];
            array_push($colleges, $college);
        }
        echo json_encode($colleges);
    }
    else
    {
        echo '0 results';
    }

}
else if($func == 'getPrograms')
{
    # do things
    # get the respective colleges make in the form of JSON

    $pquery = $db->prepare( 'SELECT * FROM collegename WHERE college = ?');
    $pquery->bindparam(1, $_POST['collegecode']);
    $pquery->execute();
    $collegeCode = $pquery->fetch()['collegeCode'];

    $query = $db->prepare( 'SELECT * FROM programs WHERE collegeCode = ?');
    $query->bindparam(1, $collegeCode);
    $query->execute();

    $programs = array();

    if($query->rowcount() != 0)
    {
        while($result = $query->fetch(PDO::FETCH_ASSOC))
        {
            $program = (object)[];
            $program->ProgramID = $result['ProgramID'];
            $program->ProgramName = $result['ProgramName'];
            $program->collegeCode = $result['collegeCode'];
            array_push($programs, $program);
        }
        echo json_encode($programs);
    }
    else
    {
        echo '0 results';
    }


}
// inputting content into database
else if($func == 'registerUser')
{
    $newuser = json_decode($_POST['registrant']);

    // select delegate
    if($newuser->type == "NEU Student")
    {
        // $query = $this->db->prepare("INSERT INTO person VALUES(?,NULL,?,?,0,0,NULL)");\
        $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
        echo "Registering Student";
        $query = $db->prepare("INSERT INTO person VALUES(?,?,?,?,?,?,?,?,?,?,NULL,NULL)");
        $query->bindparam(1, $newuser->attended);
        $query->bindparam(2, $newuser->firstName);
        $query->bindparam(3, $newuser->middleName);
        $query->bindparam(4, $newuser->lastName);
        $query->bindparam(5, $newuser->suffix);
        $query->bindparam(6, $newuser->email);
        $query->bindparam(7, $newuser->type);
        $query->bindparam(8, $newuser->QRCode);
        $query->bindparam(9, $newuser->registeredDate);
        $query->bindparam(10, $newuser->registeredTime);
        print_r($query->errorInfo());
        $query->execute(); #fingers crossed x
        print_r($query->errorInfo());
        echo $newuser->email;
        echo "0";
    }
    else if ($newuser->type == "NEU Alumni")
    {
        echo "Registering Alumni";
        $query = $db->prepare("INSERT INTO person VALUES(?,?,?,?,?,?,?,?,?,?,NULL,NULL)");
        $query->bindparam(1, $newuser->attended);
        $query->bindparam(2, $newuser->firstName);
        $query->bindparam(3, $newuser->middleName);
        $query->bindparam(4, $newuser->lastName);
        $query->bindparam(5, $newuser->suffix);
        $query->bindparam(6, $newuser->email);
        $query->bindparam(7, $newuser->type);
        $query->bindparam(8, $newuser->QRCode);
        $query->bindparam(9, $newuser->registeredDate);
        $query->bindparam(10, $newuser->registeredTime);
        $query->execute(); #fingers crossed x

        // delegate things
        $dquery = $db->prepare("INSERT INTO delegate VALUES(?,?,NULL,?)");  // college code is null
        $dquery->bindparam(1, $newuser->type);
        $dquery->bindparam(2, $newuser->email);
        $dquery->bindparam(3, $newuser->batch);
        $dquery->execute();
        echo "0";
    }
    else
    {
        echo "Registering Faculty";
        $query = $db->prepare("INSERT INTO person VALUES(?,?,?,?,?,?,?,?,?,?,NULL,NULL)");
        $query->bindparam(1, $newuser->attended);
        $query->bindparam(2, $newuser->firstName);
        $query->bindparam(3, $newuser->middleName);
        $query->bindparam(4, $newuser->lastName);
        $query->bindparam(5, $newuser->suffix);
        $query->bindparam(6, $newuser->email);
        $query->bindparam(7, $newuser->type);
        $query->bindparam(8, $newuser->QRCode);
        $query->bindparam(9, $newuser->registeredDate);
        $query->bindparam(10, $newuser->registeredTime);
        $query->execute(); #fingers crossed x

        // delegate things
        $dquery = $db->prepare("INSERT INTO delegate VALUES(?,?,?,NULL)");  // batch is null
        $dquery->bindparam(1, $newuser->type);
        $dquery->bindparam(2, $newuser->email);
        $dquery->bindparam(3, $newuser->collegeCode);
        $dquery->execute();
        echo "0";
    }
}
else if($func == 'getQRCode')
{
    $query = $db->prepare( 'SELECT QRCode FROM person WHERE Email = ?');
    $query->bindparam(1, $_POST['email']);
    $query->execute();
    $code = $query->fetch()['QRCode'];
    if($code)
    {
        echo $code;
    }
    else
    {
        echo "0";
    }
}
else if($func == 'checkDupEmail')
{
    $query = $db->prepare( 'SELECT QRCode FROM person WHERE Email = ?');
    $query->bindparam(1, $_POST['email']);
    $query->execute();

    if($query->rowcount() > 0) // it returned with results, not good
    {
        echo "1";
    }
    else  // worst case scenario could mean empty database
    {
      echo "2";
    }
}
