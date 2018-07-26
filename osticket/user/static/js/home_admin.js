$(document).ready(function(){
    $('#list_ticket_leader').DataTable({
        "columnDefs": [
            { "width": "5%", "targets": 0 },
            { "width": "15%", "targets": 1 },
            { "width": "15%", "targets": 2 },
            { "width": "15%", "targets": 3 },
            { "width": "12%", "targets": 4 },
            { "width": "10%", "targets": 5 },
            { "width": "13%", "targets": 6 },
            { "width": "13%", "targets": 7 },
        ],
        "ajax": {
            "type": "GET",
            "url": location.href +"data",
            "contentType": "application/json; charset=utf-8",
            "data": function(result){
                return JSON.stringify(result);
            }
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "order": [[ 0, "desc" ]],
        "displayLength": 25,
    });

    function countdowntime(){
        $('body .downtime').each(function(){
            var tkid = $(this).attr('id').split('-')[1];
            var dateend = $('body #dateend'+tkid).html();
            var time = dateend.split(',')[2];
            if (time.includes('p.m.')){
                if (time.includes(':')){
                    var endtime = parseInt(time.split(':')[0]) + 12;
                    if (endtime < 24){
                        var endtime1 = endtime.toString()+':'+time.split(' ')[1].split(':')[1]+':00';
                    }else{
                        var endtime1 = '00:'+time.split(' ')[1].split(':')[1]+':00';
                    }
                }else{
                    var endtime = parseInt(time.split(' ')[1]) + 12;
                    if (endtime < 24){
                        var endtime1 = endtime.toString()+':00:00';
                    }else{
                        var endtime1 = '00:00:00';
                    }
                }
            }else if(time.includes('a.m.')){
                if (time.split(':')[0].includes('12')){
                    var endtime1 = '00:'+time.split(':')[1].split(' ')[0]+':00';
                }else{
                    var endtime1 = time.split(' ')[1]+':00';
                }
            }else if (time.includes('midnight')){
                var endtime1 = '00:00:00';
            }
            var dateend1 = dateend.split(',')[0]+', '+dateend.split(',')[1]+' '+endtime1;
            var countDownDate = new Date(dateend1).getTime();
            var x = setInterval(function() {

                // Get todays date and time
                var now = new Date().getTime();
                
                // Find the distance between now an the count down date
                var distance = countDownDate - now;
                
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Output the result in an element with id="demo"
                
                
                // If the count down is over, write some text 
                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("downtime-"+tkid).innerHTML = "Hết hạn";
                }else{
                    document.getElementById("downtime-"+tkid).innerHTML = days + "ngày " + hours + "giờ "
    + minutes + "phút " + seconds + "giây ";
                    if (distance < 0) {
                        clearInterval(x);
                        document.getElementById("downtime-"+tkid).innerHTML = "Hết hạn";
                    }
                }
            }, 1000);
        });
    }
    setTimeout(function(){
        countdowntime();
    }, 2500);

    
});