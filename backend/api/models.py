from django.db import models
from django.contrib.auth.models import User


class Note(models.Model): 
    title = models.CharField(max_length=100)
    content = models.TextField()
    subject = models.CharField(max_length=50, default='General')
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    image = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return self.title