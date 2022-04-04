from django.contrib import admin
from .models import Quote


class QuoteAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'text']
    fields = ['id', 'text', 'author', 'email', 'rating', 'status', 'create_date']
    readonly_fields = ['id', 'create_date']


admin.site.register(Quote, QuoteAdmin)
