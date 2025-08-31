from django.contrib import admin
from product.models import Category, Color, Size, Product, Review

admin.site.register(Category)
admin.site.register(Color)
admin.site.register(Size)
admin.site.register(Product)
admin.site.register(Review)
