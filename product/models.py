from django.db import models
from django_extensions.db.fields import AutoSlugField
from django.contrib.auth import get_user_model
from decimal import Decimal
from django.utils import timezone
from datetime import timedelta, datetime


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
    discount = models.IntegerField(default=0)
    new = models.BooleanField(default=True)
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
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    new_until = models.DateTimeField(null=True, blank=True, verbose_name="Новинка до",default=timezone.now() + timedelta(days=30))

    def __str__(self):
        return self.name

    @property
    def reviews_count(self):
        """Возвращает количество отзывов для данного продукта"""
        return self.review_set.count()

    @property
    def average_rating(self):
        """Возвращает средний рейтинг продукта на основе отзывов"""
        reviews = self.review_set.all()
        if reviews.exists():
            total_rating = sum(review.rating for review in reviews)
            return round(total_rating / reviews.count(), 1)
        return 0

    @property
    def rating_stars_range(self):
        """Возвращает список для отображения звезд рейтинга"""
        rating = self.average_rating
        stars = []
        for i in range(1, 6):  # 1 to 5 stars
            if i <= rating:
                stars.append('full')
            elif i - 0.5 <= rating:
                stars.append('half')
            else:
                stars.append('empty')
        return stars

    @property
    def get_price_without_discount(self):
        discount_decimal = Decimal(str(self.discount))
        if self.discount == 0:
            return self.price
        if self.discount == 100:
            return 0
        old_price = self.price / (Decimal('1') - discount_decimal / Decimal('100'))
        return old_price.quantize(Decimal('1'))

    @property
    def is_new(self):
        """Динамически определяем, является ли товар новинкой"""
        if not self.new:
            return False
        # Если есть дата окончания новизны, проверяем её
        if self.new_until:
            return datetime.now() < self.new_until.replace(tzinfo=None)
        # Если даты нет, используем старую логику
        return self.new

    @property
    def days_left_as_new(self):
        """Сколько дней осталось до окончания новизны"""
        if not self.is_new or not self.new_until:
            return 0

        remaining = self.new_until.replace(tzinfo=None) - datetime.now()
        return max(0, remaining.days)


class Review(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)