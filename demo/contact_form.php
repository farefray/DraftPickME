<?php

session_start();
ob_start();


if(isset($_POST["submitted"]) && !empty($_POST["submitted"]) && $_POST["submitted"] == 1)
{
	
	$to_email          = "YOUREMAIL@GMAIL.COM"; // Replace this email field with your email address or your company email address
	$from_fullname     = isset($_POST['fullname']) ? trim(strip_tags($_POST['fullname'])) : '';
	$from_email        = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
	$email_message     = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';
	
	$message_body = nl2br("Dear Admin,\n
	The user whose detail is shown below has sent this message from ".$_SERVER['HTTP_HOST']." dated ".date('d-m-Y').".\n
	
	Fullname: ".$from_fullname."\n
	Email Address: ".$from_email."\n
	Message: ".$email_message."\n
	
	
	Thank You!\n\n");
	
	//Set up the email headers
    $headers      = "From: $from_fullname <$from_email>\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
    $headers   .= "Content-type: text/html; charset=iso-8859-1\r\n";
    $headers   .= "Message-ID: <".time().rand(1,1000)."@".$_SERVER['SERVER_NAME'].">". "\r\n";   
	
	//More validation for the input fields
	if($from_fullname == "")
	{
		echo '<br clear="all"><div class="form_info" align="left">Please enter your fullname in the required field to proceed. Thanks.</div>';
	}
	elseif($from_email == "")
	{
		echo '<br clear="all"><div class="form_info" align="left">Please enter your email address in the required email field to proceed. Thanks.</div>';
	}
	elseif(!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/", $from_email))
	{
		echo '<br clear="all"><div class="form_info" align="left">Sorry, your email address is invalid. Please enter a valid email address to proceed. Thanks.</div>';
	}
	
	elseif($email_message == "")
	{
		echo '<br clear="all"><div class="form_info" align="left">Please enter your message in the required message field to proceed. Thanks.</div>';
	}

	else
	{
	
			 if(@mail($to_email, $email_subject, $message_body, $headers))
			 {
				//Displays the success message when email message is sent
				  echo "<br clear='all'><div align='left' class='form_success'>Congrats ".$from_fullname.", your email message has been sent successfully!<br>We will get back to you as soon as possible. Thanks.</div>";
			 } 
			 else 
			 {
				 //Displays an error message when email sending fails
				  echo "<br clear='all'><div align='left' class='form_info'>Sorry, your email could not be sent at the moment. <br>Please try again or contact this website admin to report this error message if the problem persist. Thanks.</div>";
			 }
		
	}
}

?>