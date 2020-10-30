from django.urls import path
from v1.questions.views import QuestionListUpdateView, QuestionClaimView, QueueListView
from v1.questions.views.question import QuestionUpdateView

urlpatterns = [
    # Queue views
    path('queue/<int:question_id>', QueueListView.as_view(), name='queue'),

    # Question views
    path('questions/<int:pk>/update', QuestionUpdateView.as_view(), name='question-update'),
    path('questions/<int:pk>/claim', QuestionClaimView.as_view(), name='question-claiim'),
    path('questions/<int:pk>', QuestionListUpdateView.as_view(), name='question-details'),
    path('questions', QuestionListUpdateView.as_view(), name='questions'),
]
