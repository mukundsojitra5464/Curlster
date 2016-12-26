<?php

   $email = (isset($_POST['email'])) ? $_POST['email'] : '';
   $firstName = (isset($_POST['firstName'])) ? $_POST['firstName'] : '';
   $lastName = (isset($_POST['lastName'])) ? $_POST['lastName'] : '';

 
if($email!='' && $firstName !='' && $lastName !=''){
 
           // MailChimp API credentials
        $apiKey = 'f210ad7014c8289348ab9f762b21e570-us14';
        $listID = '7a3b482232';
        
        // MailChimp API URL
        $memberID = md5(strtolower($email));
        $dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
        $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listID . '/members/' . $memberID;
        
        // member information
        $json = json_encode([
            'email_address' => $email,
            'status'        => 'subscribed',
            'merge_fields'  => [
                'FNAME'     => $firstName,
                'LNAME'     => $lastName
            ]
        ]);
        
        // send a HTTP POST request with curl
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        // store the status message based on response code
        if ($httpCode == 200) {
            $status = true;
            $code =200;
            $msg = 'You have successfully subscribed to Curlfluence.';
        } else {
            switch ($httpCode) {
                case 214:
                    $code =214;
                    $msg = 'You are already subscribed.';
                    break;
                default:
                    $code =0;
                    $msg = 'Some problem occurred, please try again.';
                    break;
            }
          $status = FALSE;
        }
        $data['code'] = $code;
        $data['success'] = $status;
        $data['message'] = $msg;
        
        echo json_encode($data);

}
?>