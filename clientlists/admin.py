from django.contrib import admin
from .models import Request, ClientList, Session

# Register your models here.
admin.site.register(Request)
admin.site.register(ClientList)
admin.site.register(Session)
