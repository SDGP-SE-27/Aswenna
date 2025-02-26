"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path, include
# from rest_framework_simplejwt.views import TokenRefreshView
# from django.conf import settings
# from django.conf.urls.static import static



# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('personalFinanceTracker/', include('personalFinanceTracker.urls')),
#     path('api/users/', include('users.urls')), 


#       # App-specific URLs
# ]

# urlpatterns += [
#     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]


# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Admin panel URL
    path('admin/', admin.site.urls),

    # Include URLs for the `personalFinanceTracker` app
    path('personalFinanceTracker/', include('personalFinanceTracker.urls')),

    # Include URLs for user authentication
    path('api/users/', include('users.urls')),  

    # Token refresh endpoint
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('farmland/', include('farmland.urls')),

    path('api/homepage/', include('homepage.urls')),

    path('WeatherForecast/', include('WeatherForecast.urls')), 

    path('api/disease_detection/', include('disease_detection.urls')),
    path('marketPrice/', include('marketPrice.urls')),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
