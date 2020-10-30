from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from zoom_course_assist import settings
from rest_framework.authtoken import views

urlpatterns = [

    url(r'^api/v1/', include([
        path('token', views.obtain_auth_token),
        path('', include('v1.questions.urls')),
    ])),
    path('admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
