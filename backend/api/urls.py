from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path('notes/subject/', views.NoteListBySubject.as_view(), name='note-list-by-subject'),
    path('notes/update/<int:pk>/', views.NoteUpdate.as_view(), name='note-update'),

]