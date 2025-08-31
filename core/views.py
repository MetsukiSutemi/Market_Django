from django.shortcuts import render
from product.models import Category, Product
# Create your views here.


def base(request):
    categories = Category.objects.all()
    return render(request, 'core/base.html', {'categories': categories})


def catalog(request):
    categories = Category.objects.all()
    products = Product.objects.all()
    return render(request, 'core/catalog.html', {'categories': categories, 'products': products})
