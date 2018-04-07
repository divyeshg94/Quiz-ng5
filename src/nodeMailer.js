var CronJob = require('cron').CronJob;
var fs = require("fs");
var bodyParser = require('body-parser');
var repo = 'E:/TFS/Quiz-ng5/Quiz-ng5/src';
var mail = require("nodemailer").mail;
var async = require("async");
var _ = require('underscore');
var maillist = [
 'divyeshgovardhanan@gmail.com', 'divyeshg@cloudassert.com','divyeshg@attunix.com'
];

//var job = new CronJob('00 00 11 * * 1-5', function() {
  var job = new CronJob('* * * * *', function() {
  fs.readFile(repo+'/json/questions.json', "utf8",
		function (err, data) {		
			if (err) {			
				err.key = "file.not.found";
        console.log("Not found");
			//	callback(err);
			} else {		
        var obj;
				var error = null;
				try {					
					obj = JSON.parse(data);					
				} catch (err2) {					
					console.log("Error in parsing JSON of file.."+file);
					error = err2; 
				}
        console.log(obj);
        var currentDate = new Date(new Date().getTime());
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
        var currentDay = year+'-'+month+'-'+day;
        console.log('currentDay');
        console.log(currentDay);
        var response = _.find(obj, function(item) {
          return item.date == currentDay; 
        })
        console.log('response.questionNumber')
         console.log(response.questionNumber)	
         if(response.questionNumber != undefined){
            mailedCount = 0;
            async.each(maillist, function(toMail, callback){
              
              console.log(toMail);
			mail({
							  from: 'divyeshg@cloudassert.com',
							  to: toMail,
							  subject: 'CA Quiz - Question of the Day!!',
							  html: 'Dear Team,</br> </br> </br> Please find the Question of the Day in the below link </br> <a href="http://localhost:4200/LeaFQuiz.html?user='+toMail+'">Click Here</a></br></br> </br>  Regards,</br></br> CloudAssert Team'
             }); 
             console.log('mailedCount '+ mailedCount);
             mailedCount = mailedCount + 1;
			}, function(err){
				if(err){
          console.log("Sending to all emails failed:" + err);
          mail({
            from: 'divyeshg@cloudassert.com',
            to: 'divyeshg@cloudassert.com',
            subject: 'CA Quiz - Mail Trigger Failed!!',
            html: 'Mail Failed for the day<br/>Total Count Sent for the day '+mailedCount+'<br/>'
         }); 
				}

				//Do other stuff or return appropriate value here
			});

         }
      }
    });
   
  }, function () {
    /* This function is executed when the job stops */
  },
  true
);