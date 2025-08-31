from django.db import models
from django.contrib.auth import get_user_model


class Profile(models.Model):
    class Gender(models.TextChoices):
        MALE = ('male', 'Мужской')
        FEMALE = ('female', 'Женский')
        OTHER = ('other', 'Другой')

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    telephone = models.TextField(
        max_length=11,
        unique=True,
        null=True,
        blank=True
    )
    city = models.TextField(max_length=100, null=True, blank=True)
    address = models.TextField(max_length=100, null=True, blank=True)
    birth_day = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=Gender.choices,
        default=Gender.OTHER)
    image = models.ImageField(
        upload_to='profile_images/',
        null=True,
        blank=True,
        default='default.png'
        )

    def __str__(self):
        return f'{self.user.username} - {self.user.email}'

