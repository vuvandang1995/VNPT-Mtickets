$(document).ready(function(){
    $("#list_topic").on('click', '.btn-danger', function(){
        var id = $(this).attr('id');
        var token = $("input[name=csrfmiddlewaretoken]").val();
        var r = confirm('Bạn có chắc?');
        if (r == true){
            $.ajax({
                type:'POST',
                url:location.href,
                data: {'delete':id, 'csrfmiddlewaretoken':token},
                success: function(){
                    $("#list_topic").load(location.href + " #list_topic");
                }
           });
        }
    });

    $("#addTopic").click(function() {
        var token = $("input[name=csrfmiddlewaretoken]").val();
        var topicid = $("input[name=topicid]").val();
        var leader = $("input[name=username_leader]").val();
        $("#leadererr").html("");
        ag_leader = [];
        if (leader==''){
            $("#leadererr").html("Vui lòng chọn");
        }else{
            $.ajax({
                type:'POST',
                url:location.href,
                data: {'csrfmiddlewaretoken':token, 'topicid': topicid, 'leader': leader},
                success: function(){
                    // window.location.reload();
                    $("#list_topic").load(location.href + " #list_topic");
                    document.getElementById("add_topic_close").click();
                    var date = formatAMPM(new Date());
                    ag_leader.unshift('admin_add_leader');
                    ag_leader.unshift(leader);
                    group_agent_Socket.send(JSON.stringify({
                        'message' : ag_leader,
                        'time' : date
                    }));
                }
            });
        }
    });



    $("#topicModal").on('show.bs.modal', function(event){
        var button = $(event.relatedTarget);
        var title = button.data('title');
        $("input[name=topicid]").val(0);
        $("input[name=search]").val("");
        $("input[name=username_leader]").val("");
    });
    
});