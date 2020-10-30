from django.contrib.auth import get_user_model
from django.db import models


class Question(models.Model):

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    requester = models.CharField(
        max_length=255
    )

    room = models.IntegerField(
        null=False,
        blank=False
    )

    question_type = models.CharField(
        max_length=255,
        choices=(
            ("assistance", "Assistance"),
            ("room_assignment", "Room Assignment")
        )
    )

    content = models.TextField()

    status = models.CharField(
        max_length=255,
        default="open",
        choices=(
            ("open", "Open"),
            ("student_not_found", "Student not found"),
            ("resolved", "Resolved")
        )
    )

    claimed_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.requester} - {self.question_type}"
