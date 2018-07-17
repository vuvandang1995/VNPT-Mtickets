from django.shortcuts import render, redirect
from cryptography.fernet import Fernet
from user.models import *

# Create your views here.
def tk_create(request):
    if request.method == 'POST':
        try:
            token = request.POST['auth_token']
            user = Users.objects.get(token=token)
            form = CreateNewTicketForm(request.POST,request.FILES)
            if form.is_valid():
                topicA = Topics.objects.get(id=request.POST['topic'])
                ticket = Tickets()
                ticket.title = form.cleaned_data['title']
                ticket.content = form.cleaned_data['content']
                ticket.sender = user
                ticket.topicid = topicA
                ticket.datestart = timezone.now()
                ticket.dateend = (timezone.now() + timezone.timedelta(days=3))
                if request.FILES.get('attach') is not None:
                    if request.FILES['attach']._size < MAX_UPLOAD_SIZE:
                        ticket.attach = request.FILES['attach']
                        handle_uploaded_file(request.FILES['attach'])
                ticket.save()
        except:
            pass
    return redirect('/')

