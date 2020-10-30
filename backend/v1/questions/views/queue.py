from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from v1.questions.models import Question
from v1.questions.serializers import QuestionSerializer


class QueueListView(generics.GenericAPIView):

    def validate_request(self):
        return get_object_or_404(
            Question,
            id=self.kwargs.get("question_id")
        )

    def get_queryset(self):
        return Question.objects.filter(
            status="open",
            question_type="assistance"
        ).order_by(
            "created_at"
        )

    permission_classes = []

    def get(self, request, *args, **kwargs):
        question = self.validate_request()

        return Response(
            {
                "queue_size": len(self.get_queryset()),
                "position": len(self.get_queryset().filter(created_at__lt=question.created_at)),
                "question": QuestionSerializer(question, many=False).data
            }
        )
