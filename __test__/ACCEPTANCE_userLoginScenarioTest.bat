touch password_files/passwordTest.txt `sm.cho@hello.com:123456john.deacon@good.com:bestpassword
alan.may@best.com:mypassword
henry.taylor@edu.com:educatorbest`

echo "Acceptance Test Start"
node app.js -t "sm.cho@hello.com 123456" 
node app.js -t "john.deacon@good.com bestpassword"
node app.js -t "alan.may@best.com mypassword" 
node app.js -t "henry.taylor@edu.com educatorbest" 
node app.js -t "sm.cho@hello.com 1234567" 
node app.js -t "henry.taylor@edu.com educatorbests" 
node app.js -t "noname@hello.come 1234" 
node app.js -t "alan.may@best.com  " 

pause