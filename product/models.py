from django.db import models
from django_extensions.db.fields import AutoSlugField
from django.contrib.auth import get_user_model


class Category(models.Model):
    name = models.CharField(max_length=100, primary_key=True)


class Color(models.Model):
    name = models.CharField(max_length=100, primary_key=True)


class Size(models.Model):
    size = models.CharField(max_length=100, primary_key=True)


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    new = models.BooleanField(default=False)
    discount = models.IntegerField(default=0)
    image = models.ImageField(
        upload_to='product_images/',
        null=True,
        blank=True
        )
    count = models.IntegerField(default=0)
    slug = AutoSlugField(
        populate_from='name',
        unique=True,
        max_length=255,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class Review(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)