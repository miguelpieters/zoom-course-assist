from rest_framework import serializers
from v1.questions.models import Question
from v1.questions.serializers.user import UserSerializer


class QuestionSerializer(serializers.ModelSerializer):

    claimed_by = UserSerializer(read_only=True)

    class Meta:
        model = Question
        fields = '__all__'


class QuestionUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ("status", "claimed_by", )
