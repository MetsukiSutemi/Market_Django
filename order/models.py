from product.models import Product
from django.contrib.auth import get_user_model
from django.db import models


class Status(models.Model):
    class StatusChoices(models.TextChoices):
        NEW = ('new', 'Новый')
        IN_PROGRESS = ('in_progress', 'В процессе')
        COMPLETED = ('completed', 'Выполнен')
        CANCELLED = ('cancelled', 'Отменен')

    name = models.CharField(
        max_length=100,
        choices=StatusChoices.choices,
        primary_key=True
    )


class Order(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    data_create = models.DateTimeField(auto_now_add=True)
    data_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.username} - {self.product.name}'
