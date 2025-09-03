from django.shortcuts import render
from product.models import Category, Product, Review
from django.core.paginator import Paginator
# Create your views here.


def base(request):
    categories = Category.objects.all()
    products = Product.objects.all()
    return render(request, 'core/base.html', {'categories': categories, 'products': products})


def catalog(request):
    categories = Category.objects.all()
    products = Product.objects.all()
    reviews = Review.objects.all()
    products_qs = Product.objects.all().select_related('category')
    page = request.GET.get('page', 1)
    per_page = 4  # можно 8/12/24/36/48
    paginator = Paginator(products_qs, per_page)
    page_obj = paginator.get_page(page)
    return render(request, 'core/catalog.html',

                {'categories': categories,
                 'products': products,
                 'reviews': reviews,
                 'page_obj': page_obj}
                 )


def cart(request):
    return render(request, 'cart/cart.html')