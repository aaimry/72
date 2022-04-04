# Generated by Django 4.0.3 on 2022-04-04 07:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=2000, verbose_name='Текст')),
                ('author', models.CharField(max_length=100, verbose_name='Автор')),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('rating', models.IntegerField(default=0, verbose_name='Рейтинг')),
                ('status', models.CharField(choices=[('new', 'Новая'), ('moderated', 'Промодерированная')], default='new', max_length=17, verbose_name='Статус')),
                ('create_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
            ],
            options={
                'verbose_name': 'Цитата',
                'verbose_name_plural': 'Цитаты',
            },
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_key', models.CharField(max_length=40, verbose_name='Ключ сессии')),
                ('rating', models.IntegerField(choices=[(1, 'up'), (-1, 'down')], verbose_name='Рейтинг')),
                ('quote', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='votes', to='webapp.quote', verbose_name='Цитата')),
            ],
            options={
                'verbose_name': 'Рейтинг',
                'verbose_name_plural': 'Рейтинги',
                'ordering': ('quote', 'rating'),
            },
        ),
    ]
