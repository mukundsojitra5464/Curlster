$(document).ready(function(event) {
            $("form").submit(function(ent){
                        var _check = true;
                        var _email = true;
                        var firstName = $('input[name=firstName]').val(); 
                        var lastName = $('input[name=lastName]').val(); 
                        var email = $('input[name=email]').val();
                        if(firstName==''){
                            $('.site-user-signup__label--firstName').css({'display' : 'block'});
                            _check = false;                
                        }else{
                            $('.site-user-signup__label--firstName').css({'display' : 'none'});
                            _check = true;
                        }
                        if(lastName==''){
                            $('.site-user-signup__label--lastName').css({'display' : 'block'});
                            _check = false;
                        }else{
                            $('.site-user-signup__label--lastName').css({'display' : 'none'});
                            _check = true;
                        }
                        if(email==''){
                            $('.site-user-signup__label--email').css({'display' : 'block'});
                            _check = false;
                        }else{
                            $('.site-user-signup__label--email').css({'display' : 'none'});
                            _check = true;
                        }
                        if(!validateEmail(email) && email!=''){
                            $('.site-user-signup__label--email').css({'display' : 'block'});
                            _email = false;
                            alert('Invalid Email Address');
                            ent.preventDefault();
                        }
                        if(!_check ){
                             alert('Some of fields are invalid. Please check your inforamtion and try again.');
                             ent.preventDefault();            
                        }
                        
                        if(_check && _email){
                             var url = "script.php"; // the script where you handle the form input.
                            $.ajax({
                                type: "POST",
                                url: url,
                                dataType: 'json',
                                data: $("form").serialize(), // serializes the form's elements.
                                success: function(data)
                                {                                        
                                    if(data.code==200){
                                      $('.thanks_text').text('Thanks '+firstName+' for your response!')  
                                      $('.response_default').hide();
                                      $('.click1').hide();
                                      $('.response_div').show();   
                                    }                                    
                                    if(data.code==214){
                                      alert('You are already subscribed.');    
                                    }
                                    
                                    if(data.code==0){
                                      //alert('Invalid Email Address');
                                      alert(data.message);
                                    }
                                    
                                    $('input[name=firstName]').val(''); 
                                    $('input[name=lastName]').val(''); 
                                    $('input[name=email]').val('');
                                
                                    
                                    
                                    //alert(data.message); // show response from the php script.
                                }
                              });
                        }
                ent.preventDefault(); // avoid to execute the actual submit of the form.
            });
   });
   // Function that validates email address through a regular expression.
//    function validateEmail(sEmail) {
//        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
//        if (filter.test(sEmail)) {
//           return true;
//        }
//        else {
//           return false;
//        }
//    }
    
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }