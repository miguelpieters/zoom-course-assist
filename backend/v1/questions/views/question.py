from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from v1.questions.models import Question
from v1.questions.serializers import QuestionSerializer, QuestionUpdateSerializer


class QuestionListUpdateView(generics.CreateAPIView, generics.ListAPIView):

    def get_queryset(self):
        return Question.objects.filter(
            status="open"
        ).order_by(
            "created_at"
        )

    permission_classes = []
    serializer_class = QuestionSerializer

    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            raise PermissionDenied()

        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class QuestionUpdateView(generics.UpdateAPIView):

    queryset = Question.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = QuestionUpdateSerializer

    lookup_field = 'id'
    lookup_url_kwarg = 'pk'

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class QuestionClaimView(generics.CreateAPIView):

    def get_queryset(self):
        return get_object_or_404(Question, pk=self.kwargs.get("pk", 0))

    permission_classes = [IsAuthenticated]
    serializer_class = QuestionUpdateSerializer

    def post(self, request, *args, **kwargs):
        question = self.get_queryset()
        question.claimed_by = request.user
        question.save()

        print(question)
        return Response({"status": "ok"})

